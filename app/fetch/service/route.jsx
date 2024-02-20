import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const data = await prisma.servicePriceOnSpecialist.findMany({
    select: {
      id: true,
      price: true,
      priceDescription: true,
      service: true,
      vehicleSize: true,
      maxDistance: true,
      cities: {
        select: {
          id: true,
          name: true,
        },
      },
      specialists: {
        select: {
          id: true,
          name: true,
        },
      },
      services: {
        select: {
          id: true,
          name: true,
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
}
