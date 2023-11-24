import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";
import { generateToken } from "@/libs/utils";
import bcrypt from "bcrypt";

export async function GET(request) {
  const data = await prisma.specialist.findMany();
  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function POST(request) {
  const { name, phone, password, email } = await request.json();
  // console.log("BODY: ", name, email);

  if (!name || !phone || !password) {
    return NextResponse.json({
      status: false,
      error: "Silakan masukkan data yang diminta...!",
    });
  }

  const userPhone = await prisma.specialist.findFirst({
    where: { phone },
  });
  if (userPhone) {
    return NextResponse.json({
      status: false,
      error: "No HP sudah terdaftar...!",
    });
  }

  if (email) {
    const userEmail = await prisma.specialist.findFirst({
      where: { email },
    });
    if (userEmail) {
      return NextResponse.json({
        status: false,
        error: "Email sudah terdaftar...!",
      });
    }
  }

  // GENERATE HASH
  let salt, hash;
  salt = await bcrypt.genSalt(10);
  hash = await bcrypt.hash(password, salt);

  const dataUser = await prisma.specialist.create({
    data: { name, phone, email, password: hash },
  });

  return NextResponse.json({
    status: true,
    message: "Entry successfully created",
    data: dataUser,
  });
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await prisma.specialist.delete({
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
