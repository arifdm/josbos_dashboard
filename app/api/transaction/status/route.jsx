import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const user = searchParams.get("user");

  const data = await prisma.transaction.findFirst({
    where: {
      user,
      status:
        status === "process"
          ? {
              in: ["pending", "taken", "ontheway", "process", "unpaid"],
            }
          : status === "completed"
          ? {
              in: ["paid", "completed"],
            }
          : status === "all"
          ? {
              in: [
                "pending",
                "taken",
                "ontheway",
                "process",
                "unpaid",
                "paid",
                // "completed",
                // "canceled",
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
        },
      },
      servicePricings: true,
      serviceSpecialists: {
        select: {
          price: true,
          services: {
            select: {
              name: true,
              categories: true,
            },
          },
          specialists: {
            select: {
              name: true,
              photo: true,
              phone: true,
              latitude: true,
              longitude: true,
              rating: true,
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
