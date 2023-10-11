import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  const { otp } = await request.json();

  try {
    const data = await prisma.user.findFirst({
      where: { email, otp },
      data: { status: "active" },
    });
    return NextResponse.json({ status: true, data });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
}
