import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request, { params }) {
  const data = await prisma.servicePricing.findMany({
    where: { service: params?.id },
    select: {
      id: true,
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
      cities: {
        select: {
          id: true,
          name: true,
          status: true,
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

  if (data.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }

  return NextResponse.json({ status: true, data });
}

export async function POST(request, { params }) {
  const { city, distance, service, vehicleSize, price, priceDescription } =
    await request.json();

  if (
    !city ||
    !distance ||
    !service ||
    !vehicleSize ||
    !price ||
    !priceDescription
  ) {
    return NextResponse.json({
      status: false,
      error: "Silakan lengkapi data",
    });
  }

  // const dataArray = city.map((item) => ({
  //   city: item,
  //   specialist: decoded?.id,
  //   service,
  //   vehicleSize,
  //   price: Number(price),
  //   priceDescription,
  // }));

  try {
    const data = await prisma.servicePriceOnSpecialist.create({
      data: {
        specialist: params.id.toString(),
        city,
        maxDistance: Number(distance),
        service,
        vehicleSize,
        price: Number(price),
        priceDescription,
      },
    });

    revalidatePath(data);
    if (data) {
      return NextResponse.json({
        status: true,
        message: "Created successfully",
        data,
      });
    }
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({
      status: false,
      error: "Create failed...!",
    });
  }
}
