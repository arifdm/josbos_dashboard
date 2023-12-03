import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const data = await prisma.ServicePriceOnSpecialist.findMany({
    select: {
      id: true,
      price: true,
      priceDescription: true,
      city: true,
      service: true,
      vehicleSize: true,
      maxDistance: true,
      cities: {
        select: {
          id: true,
          name: true,
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
