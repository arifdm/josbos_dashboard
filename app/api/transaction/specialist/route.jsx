import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  const accessToken = request.headers.get("Authorization");

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  // console.log("TOKEN: ", accessToken);

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
        error: "Access Token tidak valid...!",
      });
    }

    if (decoded.role !== "specialist") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    // const specialist = await prisma.specialist.findUnique({
    //   where: { id: decoded.id },
    //   select: { id: true },
    // });
    // console.log("SPECIALIST: ", specialist);

    const data = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        takeOnTransactions: {
          some: {
            specialists: {
              id: decoded?.id,
            },
          },
        },
        takeOnTransactions: {
          some: {
            servicePriceOnSpecialists: {
              specialist: decoded?.id,
            },
          },
        },
        status:
          status === "process"
            ? { in: ["taken", "process", "unpaid"] }
            : status === "completed"
            ? { in: ["paid", "completed"] }
            : status,
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
    if (!data) {
      return NextResponse.json({
        status: false,
        error: "Data not found",
      });
    }
    return NextResponse.json({ status: true, data });
  }
}
