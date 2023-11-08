import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const data = await prisma.admin.findMany();
  if (!data) {
    return NextResponse.json({
      status: false,
      message: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function POST(request) {
  const { name, email, status } = await request.json();
  // console.log("BODY: ", name, email);
  const dataUser = await prisma.admin.create({
    data: { name, email, status },
  });

  return NextResponse.json({
    status: true,
    message: "Entry successfully created",
    data: dataUser,
  });
}
