import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const data = await prisma.saldoSpecialist.findFirst({
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
  const { status } = await request.json();
  try {
    const data = await prisma.saldoSpecialist.update({
      where: { id: params?.id },
      data: { status },
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
