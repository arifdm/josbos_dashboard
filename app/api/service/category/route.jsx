import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const data = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      categories: {
        select: {
          name: true,
        },
      },
      servicePricing: {
        select: {
          price: true,
          city: true,
          // cities: {
          //   select: {
          //     name: true,
          //   },
          //   where: {
          //     name: "Jakarta",
          //   },
          // },
          // vehicleModels: {
          //   select: {
          //     name: true,
          //   },
          // },
        },
        where: {
          city: "334",
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
