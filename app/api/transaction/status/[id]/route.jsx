import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { status } = await request.json();

  try {
    const data = await prisma.transaction.update({
      where: {
        id: params?.id,
      },
      data: {
        status,
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
