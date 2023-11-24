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

    const specialist = await prisma.specialist.findUnique({
      where: { id: decoded.id },
      select: { id: true },
    });
    // console.log("SPECIALIST: ", specialist);

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
        status: "pending",
      },
      select: {
        id: true,
        user: true,
        address: true,
        amount: true,
        discount: true,
        latitude: true,
        longitude: true,
        note: true,
        promos: true,
        total: true,
        orderDate: true,
        status: true,
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
        bankAccounts: {
          select: {
            id: true,
            category: true,
            isOnline: true,
            accountName: true,
            brandName: true,
            number: true,
          },
        },
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
