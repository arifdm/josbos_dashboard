import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const city = searchParams.get("city");
  const service = searchParams.get("service");
  const vehicleModel = searchParams.get("vehicleModel");

  const data = await prisma.ServiceSpecialist.findMany({
    where: {
      city,
      service,
      vehicleModel,
    },
    select: {
      id: true,
      price: true,
      city: true,
      service: true,
      vehicleModel: true,
      cities: {
        select: {
          id: true,
          name: true,
        },
      },
      specialists: true,
      // services: {
      //   select: {
      //     id: true,
      //     name: true,
      //   },
      // },
      // vehicleModels: {
      //   select: {
      //     id: true,
      //     name: true,
      //   },
      // },
    },
    // include: {
    //   specialists: true,
    //   cities: true,
    //   vehicleModels: true,
    // },
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
  const { title, content, image } = await request.json();
  const data = await prisma.ServiceSpecialist.create({
    data: { title, content, image },
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
    await prisma.ServiceSpecialist.delete({
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
