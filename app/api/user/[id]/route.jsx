import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
// import { authOptions } from "./../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  // const accessToken = request.headers.get("Authorization");

  // if (!accessToken) {
  //   return NextResponse.json({
  //     status: false,
  //     error: "Authentication token required!",
  //   });
  // }

  // const session = await getServerSession(request, authOptions);
  // const session = await getServerSession(request, authOptions);
  // console.log("SESSION: ", session);

  const data = await prisma.user.findFirst({
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
    const data = await prisma.user.update({
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
