import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("selected");
  const user = searchParams.get("user");

  const data = await prisma.transaction.findFirst({
    where: {
      user,
      status:
        status === "process"
          ? {
              in: ["pending", "taken", "process", "unpaid", "paid"],
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
          name: true,
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
