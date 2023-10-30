import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const data = await prisma.transaction.findMany();
  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function POST(request) {
  const {
    address,
    latitude,
    longitude,
    amount,
    discount,
    total,
    note,
    serviceDate,
    promo,
    user,
    servicePrice,
    serviceSpecialist,
  } = await request.json();
  const data = await prisma.transaction.create({
    data: {
      address,
      latitude,
      longitude,
      amount,
      discount,
      total,
      note,
      serviceDate,
      promo,
      user,
      servicePrice,
      serviceSpecialist,
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
    await prisma.transaction.delete({
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