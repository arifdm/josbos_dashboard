import { generateToken } from "@/libs/utils";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const data = await prisma.vehicleModel.findMany({
    select: {
      id: true,
      name: true,
      vehicleSizes: {
        select: {
          name: true,
        },
      },
      brands: {
        select: {
          name: true,
          types: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: [
      {
        brands: {
          name: "asc",
        },
      },
      {
        name: "asc",
      },
    ],
    // skip: 2,
    // take: 4,
  });

  const count = await prisma.vehicleModel.count();

  if (data.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, count, data });
}
