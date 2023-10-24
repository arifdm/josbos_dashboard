import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const service = searchParams.get("service");
  const name = searchParams.get("cityName");

  const data = await prisma.ServicePricing.findMany({
    where: {
      cities: {
        name: {
          endsWith: name,
          mode: "insensitive",
        },
      },
      service,
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

export async function POST(request) {
  const { price, service, city, vehicleModel } = await request.json();

  const data = await prisma.event.create({
    data: {
      price,
      service,
      city,
      vehicleModel,
      status: true,
    },
  });
  revalidatePath(data);
  return NextResponse.json({
    status: true,
    message: "Entry successfully created",
    data: data,
  });
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await prisma.event.delete({
      where: { id },
    });
    return NextResponse.json({
      status: true,
      message: "Delete successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: "Delete failed",
    });
  }
}
