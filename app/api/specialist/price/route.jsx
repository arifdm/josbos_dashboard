import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const city = searchParams.get("city");
  const service = searchParams.get("service");
  const vehicleSize = searchParams.get("vehicleSize");
  console.log("VEHICLE_SIZE: ", vehicleSize);

  const data = await prisma.ServicePriceOnSpecialist.findMany({
    where: {
      city,
      service,
    },
    select: {
      id: true,
      price: true,
      city: true,
      service: true,
      vehicleSize: true,
      cities: {
        select: {
          id: true,
          name: true,
        },
      },
      specialists: true,
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
