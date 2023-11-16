import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(request, { params }) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const { specialist, serviceDate, selected } = await request.json();

  const getID = await prisma.takeOnTransaction.findFirst({
    where: { transaction: id },
  });

  if (!getID) {
    return NextResponse.json({
      status: false,
      error: "ID transaction not found",
    });
  }

  try {
    await prisma.transaction.update({
      where: { id: id },
      data: { status: "taken" },
    });

    await prisma.takeOnTransaction.update({
      where: { id: getID.id },
      data: { specialist, serviceDate, selected },
    });

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
