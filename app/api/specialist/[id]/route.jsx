import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  // const accessToken = request.headers.get("Authorization");

  const data = await prisma.specialist.findUnique({
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
