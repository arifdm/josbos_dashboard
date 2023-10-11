import { generateToken } from "@/libs/utils";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const data = await prisma.user.findMany();
  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function POST(request) {
  const { name, email } = await request.json();
  // console.log("BODY: ", name, email);

  const dataUser = await prisma.user.create({
    data: { name, email },
  });

  // GENERATE TOKEN ACCESS
  const tokenAccess = generateToken({
    user: { id: dataUser.id, email: dataUser.email },
  });

  return NextResponse.json({
    status: true,
    message: "Entry successfully created",
    data: dataUser,
    tokenAccess,
  });
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({
      status: true,
      message: "Delete successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: "Delete failed",
    });
  }
}
