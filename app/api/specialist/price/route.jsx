import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const getCity = searchParams.get("city");
  const getService = searchParams.get("service");
  const getVehicleSize = searchParams.get("vehicleSize");

  const data = await prisma.ServicePriceOnSpecialist.findMany({
    where: {
      city: getCity ? getCity : {},
      service: getService ? getService : {},
      vehicleSize: getVehicleSize ? getVehicleSize : {},
    },
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
      specialists: {
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
          phone: true,
          photo: true,
          rating: true,
          status: true,
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
