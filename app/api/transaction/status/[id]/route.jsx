import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { specialist, status } = await request.json();

  const check = await prisma.takeOnTransaction.findFirst({
    where: {
      transaction: params?.id,
      // servicePriceOnSpecialists: {
      //   specialists: {
      //     id: specialist,
      //   },
      // },
    },
    select: {
      orderMethod: true,
      servicePriceOnSpecialists: {
        select: {
          specialists: true,
        },
      },
      specialist: true,
    },
  });
  console.log("CHECK: ", check);

  try {
    const data = await prisma.transaction.update({
      where: {
        id: params?.id,
      },
      data: {
        status,
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
