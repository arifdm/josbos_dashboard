import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  const data = await prisma.vehicleBrand.findMany({
    where: { type },
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
  const { type, name } = await request.json();

  try {
    const data = await prisma.vehicleBrand.create({
      data: { type, name },
    });

    return NextResponse.json({
      status: true,
      message: "Entry successfully created",
      data: data,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({
      status: false,
      error: "Entry failed",
    });
  }
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await prisma.vehicleBrand.delete({
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
