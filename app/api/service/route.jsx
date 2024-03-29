import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const data = await prisma.service.findMany();
  if (data.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function POST(request) {
  const {
    title,
    content,
    image,
    lat,
    long,
    address,
    price,
    eventDate,
    presenceMethod,
    openTime,
    closeTime,
    authorId,
  } = await request.json();

  const data = await prisma.service.create({
    data: {
      title,
      content,
      image,
      lat,
      long,
      address,
      price,
      eventDate: new Date(eventDate).toISOString(),
      presenceMethod,
      openTime: new Date(openTime).toISOString(),
      closeTime: new Date(closeTime).toISOString(),
      authorId,
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
    await prisma.service.delete({
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
