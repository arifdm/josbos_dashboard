import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const brand = searchParams.get("brand");

  const data = await prisma.vehicleModel.findMany({
    where: { brand },
  });
  if (data.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function POST(request) {
  const { type, brand, newBrand, vehicleSize, name } = await request.json();

  let idNewBrand = null;
  if (newBrand) {
    const dataNewBrand = await prisma.vehicleBrand.create({
      data: { type, name: newBrand },
    });
    idNewBrand = dataNewBrand?.id;
  }

  const data = await prisma.vehicleModel.create({
    data: {
      brand: idNewBrand ? idNewBrand : brand,
      vehicleSize,
      name,
    },
  });

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
    await prisma.vehicleModel.delete({
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
