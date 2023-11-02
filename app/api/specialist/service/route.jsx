import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const city = searchParams.get("city");
  const service = searchParams.get("service");
  const vehicleSize = searchParams.get("vehicleSize");
  console.log("VEHICLE_SIZE: ", vehicleSize);

  const where_vehicleSize = {
    city,
    service,
    vehicleSize,
  };

  const where = {
    city,
    service,
  };

  const data = await prisma.specialist.findMany({
    select: {
      name: true,
      serviceSpecialist: {
        where: vehicleSize ? where_vehicleSize : where,
        // select: {
        //   id: true,
        //   price: true,
        //   city: true,
        //   service: true,
        //   vehicleSize: true,
        //   cities: {
        //     select: {
        //       id: true,
        //       name: true,
        //     },
        //   },
        // },
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