import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const data = await prisma.category.findMany({
    include: {
      services: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (data.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}
