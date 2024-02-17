import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  const data = await prisma.bankAccount.findFirst({
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
  const accessToken = request.headers.get("Authorization");

  const searchParams = request.nextUrl.searchParams;
  const user = searchParams.get("user");

  const { brandName, accountName, number } = await request.json();
  // console.log("ID: ", params?.id);
  // console.log("BODY: ", brandName, accountName, number);

  if (!accessToken) {
    return NextResponse.json({
      status: false,
      error: "Silakan masukkan token...!",
    });
  } else {
    let decoded;
    try {
      const bearer = accessToken.replace("Bearer ", "");
      decoded = await jwt.verify(bearer, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({
        status: false,
        error: "Access Token tidak valid...!",
      });
    }

    if (decoded.role !== user) {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    try {
      const data = await prisma.bankAccount.update({
        where: { id: params?.id },
        data: {
          brandName,
          accountName,
          number,
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
}
