import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import otpGenerator from "otp-generator";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  const data = await prisma.user.findFirst({
    where: { email },
  });

  if (data) {
    const otp = otpGenerator.generate(5, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Update OTP for user
    await prisma.user.update({
      where: { id: data.id },
      data: { otp },
    });

    // Send Email OTP
    return NextResponse.json({ status: true, data });
  } else {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
}
