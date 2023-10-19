import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
// import { authOptions } from "./../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  const data = await prisma.vehicleModel.findFirst({
    where: { id: params.id },
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
  const { name, email, phone, ktp, otp, tokenFcm } = await request.json();
  try {
    const data = await prisma.participant.update({
      where: { id: params.id },
      data: { name, email, phone, ktp, otp, tokenFcm },
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
