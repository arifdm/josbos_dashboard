import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const data = await prisma.specialist.findFirst({
    where: { id },
  });
  console.log("ID: ", id);

  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }

  try {
    const { tokenFCM } = await request.json();

    const resData = await prisma.specialist.update({
      where: { id },
      data: { tokenFCM },
    });
    console.log("DATA: ", resData);

    return NextResponse.json({
      status: true,
      message: "Update token FCM successfully",
      data: resData,
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: "Update token failed",
    });
  }
}
