import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
// import { authOptions } from "./../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  const data = await prisma.admin.findFirst({
    where: { id: params.id },
  });
  if (!data) {
    return NextResponse.json({
      status: false,
      message: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function PUT(request, { params }) {
  const { name, email } = await request.json();
  try {
    const data = await prisma.admin.update({
      where: { id: params.id },
      data: { name, email },
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

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await prisma.admin.delete({
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
