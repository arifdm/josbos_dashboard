import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const data = await prisma.specialist.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      address: true,
      latitude: true,
      longitude: true,
      cities: {
        select: {
          id: true,
          name: true,
        },
      },
      servicePriceOnSpecialist: {
        select: {
          id: true,
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
