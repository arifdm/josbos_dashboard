import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { generateToken } from "@/libs/utils";

export async function PUT(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const data = await prisma.user.findFirst({
    where: { id },
  });

  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }

  try {
    const { tokenFCM } = await request.json();

    const resData = await prisma.user.update({
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
