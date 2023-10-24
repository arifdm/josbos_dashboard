import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const data = await prisma.service.findFirst({
    select: {
      id: true,
      name: true,
      categories: {
        select: {
          name: true,
        },
      },
    },
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
  const { title, content, image } = await request.json();
  try {
    const data = await prisma.event.update({
      where: { id: params?.id },
      data: { title, content, image },
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
