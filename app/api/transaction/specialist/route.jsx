import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
const bcrypt = require("bcrypt");

export async function GET(request, { params }) {
  const accessToken = request.headers.get("Authorization");
  // console.log("TOKEN: ", accessToken);

  if (!accessToken) {
    return NextResponse.json({
      status: false,
      error: "AccessToken tidak valid",
    });
  } else {
    const bearer = accessToken.replace("Bearer ", "");
    console.log("BEARER: ", bearer);

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const service = searchParams.get("service");

    const serviceSpecialist = await prisma.servicePriceOnSpecialist.findMany({
      where: {
        specialist: "725c54e6-4776-40c6-8445-ccd8548c3dd5",
      },
      select: {
        service: true,
      },
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
        status:
          status === "open"
            ? {
                in: ["pending"],
              }
            : status === "process"
            ? {
                in: ["taken", "process", "unpaid", "paid"],
              }
            : status === "completed"
            ? {
                in: ["completed"],
              }
            : status === "all"
            ? {
                in: [
                  "pending",
                  "taken",
                  "process",
                  "unpaid",
                  "paid",
                  "completed",
                  "canceled",
                ],
              }
            : status,
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
              select: {
                name: true,
              },
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
