import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  const accessToken = request.headers.get("Authorization");

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

    const data = await prisma.user.findFirst({
      where: { id: params?.id },
    });

    if (!data) {
      return NextResponse.json({
        status: false,
        error: "Data not found",
      });
    }

    delete data.password;
    return NextResponse.json({ status: true, data });
  }
}
