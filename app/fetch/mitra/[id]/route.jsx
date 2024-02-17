import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const data = await prisma.servicePriceOnSpecialist.findMany({
    where: { specialist: params?.id },
    select: {
      id: true,
      price: true,
      priceDescription: true,
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
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      vehicleSizes: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  console.log("DATA: ", data);
  if (data.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }

  return NextResponse.json({ status: true, data });
}
