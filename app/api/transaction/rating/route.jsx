import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const { rating, comment } = await request.json();

  console.log("TRANSACTION: ", id);
  console.log("BODY: ", rating, comment);

  const getID = await prisma.takeOnTransaction.findFirst({
    where: { transaction: id },
  });

  if (!getID) {
    return NextResponse.json({
      status: false,
      error: "ID not found",
    });
  }

  try {
    const data = await prisma.takeOnTransaction.update({
      where: { id: getID.id },
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
