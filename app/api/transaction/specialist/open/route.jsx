import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  const accessToken = request.headers.get("Authorization");

  if (!accessToken) {
    return NextResponse.json({
      status: false,
      error: "Silakan masukkan token...!",
    });
  } else {
    let decoded;
    try {
      const bearer = accessToken.replace("Bearer ", "");
      decoded = await jwt.verify(bearer, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({
        status: false,
        error: "AccessToken tidak valid...!",
      });
    }

    if (decoded.role !== "specialist") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    const specialist = await prisma.specialist.findUnique({
      where: { id: decoded.id },
      select: { id: true, status: true, latitude: true, longitude: true },
    });
    // console.log("SPECIALIST: ", specialist);

    if (specialist.status === "offline") {
      return NextResponse.json({
        status: false,
        error:
          "Status Anda tidak aktif sehingga tidak mendapatkan pesanan masuk...!",
      });
    }

    try {
      const rad =
        await prisma.$queryRaw`SELECT id, 6371 * acos(cos(RADIANS(CAST (${specialist.latitude} AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (latitude AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (${specialist.longitude} AS DOUBLE PRECISION )) - RADIANS(CAST (longitude AS DOUBLE PRECISION ))) + sin(RADIANS(CAST (${specialist.latitude} AS DOUBLE PRECISION ))) * sin(RADIANS(CAST (latitude AS DOUBLE PRECISION )))) as distance FROM "public"."Transaction" WHERE status = 'pending' AND (6371 * acos(cos(RADIANS(CAST (${specialist.latitude} AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (latitude AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (${specialist.longitude} AS DOUBLE PRECISION )) - RADIANS(CAST (longitude AS DOUBLE PRECISION ))) + sin(RADIANS(CAST (${specialist.latitude} AS DOUBLE PRECISION ))) * sin(RADIANS(CAST (latitude AS DOUBLE PRECISION ))))) <= 10`;

      // console.log("RADIUS: ", rad);

      const serviceSpecialist = await prisma.servicePriceOnSpecialist.findMany({
        where: { specialist: specialist.id },
        select: { service: true },
      });
      // console.log("SERVICE_SPECIALIST: ", serviceSpecialist);

      const data = await prisma.transaction.findMany({
        where: {
          servicePricings: {
            services: {
              id: {
                in: serviceSpecialist.map((item) => item.service),
              },
            },
          },
          id: { in: rad.map((item) => item.id) },
          status: "pending",
        },
        select: {
          id: true,
          address: true,
          amount: true,
          discount: true,
          latitude: true,
          longitude: true,
          note: true,
          // promos: true,
          total: true,
          orderDate: true,
          status: true,
          users: {
            select: {
              name: true,
              phone: true,
            },
          },
          vehicleModels: {
            select: {
              name: true,
              brands: {
                select: { name: true },
              },
            },
          },
          servicePricings: {
            select: {
              city: true,
              price: true,
              services: {
                select: {
                  id: true,
                  name: true,
                  categories: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
          // bankAccounts: {
          //   select: {
          //     id: true,
          //     category: true,
          //     isOnline: true,
          //     accountName: true,
          //     brandName: true,
          //     number: true,
          //   },
          // },
          takeOnTransactions: {
            select: {
              id: true,
              orderMethod: true,
              amountBids: true,
              selected: true,
              serviceDate: true,
              specialists: {
                select: {
                  id: true,
                  name: true,
                  latitude: true,
                  longitude: true,
                  photo: true,
                  rating: true,
                },
              },
              servicePriceOnSpecialists: {
                select: {
                  id: true,
                  price: true,
                  specialists: {
                    select: {
                      id: true,
                      name: true,
                      latitude: true,
                      longitude: true,
                      photo: true,
                      rating: true,
                    },
                  },
                  services: {
                    select: {
                      id: true,
                      name: true,
                      categories: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (data.length === 0) {
        return NextResponse.json({
          status: false,
          error: "Data not found",
        });
      }
      return NextResponse.json({ status: true, data });
    } catch (error) {
      console.log("ERROR_RAD: ", error);
    }
  }
}
