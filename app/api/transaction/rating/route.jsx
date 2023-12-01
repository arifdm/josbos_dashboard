import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(request, { params }) {
  const accessToken = request.headers.get("Authorization");

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const { rating, comment } = await request.json();

  console.log("TRANSACTION: ", id);
  console.log("BODY: ", rating, comment);

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

    if (decoded.role !== "user") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    const transactionID = await prisma.takeOnTransaction.findFirst({
      where: { transaction: id },
    });

    if (!transactionID) {
      return NextResponse.json({
        status: false,
        error: "Transaction ID not found",
      });
    }

    try {
      const data = await prisma.takeOnTransaction.update({
        where: { id: transactionID.id },
        data: {
          rating: parseInt(rating),
          ratingComment: comment,
        },
      });

      if (data) {
        const data = await prisma.transaction.update({
          where: { id },
          data: {
            status: "completed",
          },
        });
      }

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
