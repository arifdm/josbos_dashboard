import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(request, { params }) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const { specialist, serviceDate, selected } = await request.json();

  try {
    const data = await prisma.takeOnTransaction.update({
      where: { id },
      data: { specialist, serviceDate, selected },
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
