import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET(request) {
  console.log("RESPONSE: ", NextRequest);

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
  const { name, phone, password, email, referral } = await request.json();
  // console.log("BODY: ", name, email);

  if (!name || !phone || !password) {
    return NextResponse.json({
      status: false,
      error: "Silakan masukkan data yang diminta...!",
    });
  }

  const userPhone = await prisma.user.findFirst({
    where: { phone },
  });
  if (userPhone) {
    return NextResponse.json({
      status: false,
      error: "No HP sudah terdaftar...!",
    });
  }

  const userEmail = await prisma.user.findFirst({
    where: { email },
  });
  if (userEmail) {
    return NextResponse.json({
      status: false,
      error: "Email sudah terdaftar...!",
    });
  }

  // GENERATE HASH
  let salt, hash;
  salt = await bcrypt.genSalt(10);
  hash = await bcrypt.hash(password, salt);

  const dataUser = await prisma.user.create({
    data: { name, phone, email, password: hash, referral },
  });

  return NextResponse.json({
    status: true,
    message: "Entry successfully created",
    data: dataUser,
  });
}

export async function PUT(request, { params }) {
  const accessToken = request.headers.get("Authorization");
  const { name, email, address, ktp, otp, tokenFCM } = await request.json();

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

    try {
      const data = await prisma.user.update({
        where: { id: decoded.id },
        data: { name, email, address, ktp, otp, tokenFCM },
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
