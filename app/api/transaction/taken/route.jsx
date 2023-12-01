import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(request, { params }) {
  const accessToken = request.headers.get("Authorization");

  const searchParams = request.nextUrl.searchParams;
  const transaction = searchParams.get("id");
  const { serviceDate, selected } = await request.json();

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
        error: "AccessToken tidak valid...!",
      });
    }

    if (decoded.role !== "specialist") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    const takeID = await prisma.takeOnTransaction.findFirst({
      where: { transaction },
    });
    console.log("TAKE: ", takeID);

    if (!takeID) {
      return NextResponse.json({
        status: false,
        error: "ID transaction not found",
      });
    }

    try {
      const resTransaction = await prisma.transaction.update({
        where: { id: transaction },
        data: { status: "taken" },
      });
      console.log("RES_TRANSACTION: ", resTransaction);

      const resTake = await prisma.takeOnTransaction.update({
        where: { id: takeID.id },
        data: {
          specialist: decoded.id,
          serviceDate,
          selected,
        },
      });
      console.log("RES_TAKE: ", resTake);

      return NextResponse.json({
        status: true,
        message: "Update successfully",
      });
    } catch (error) {
      return NextResponse.json({
        status: false,
        error: "Update failed",
      });
    }
  }
}
