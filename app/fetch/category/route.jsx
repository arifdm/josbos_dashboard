import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const data = await prisma.category.findMany({
    include: {
      services: true,
    },
    orderBy: {
      createdAt: "asc",
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
  const { category, newService } = await request.json();

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
