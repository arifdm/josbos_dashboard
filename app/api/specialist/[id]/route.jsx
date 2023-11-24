import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  // const accessToken = request.headers.get("Authorization");

  const data = await prisma.specialist.findUnique({
    where: { id: params?.id },
  });
  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function PUT(request, { params }) {
  const { name, email, address, photo, latitude, longitude, status, rating } =
    await request.json();

  const data = await prisma.specialist.findUnique({
    where: { id: params?.id },
  });
  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }

  try {
    const data = await prisma.specialist.update({
      where: { id: params?.id },
      data: {
        name,
        email,
        address,
        photo,
        latitude,
        longitude,
        status,
        rating,
      },
    });
    return NextResponse.json({
      status: true,
      message: "Update successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: "Update failed",
    });
  }
}
