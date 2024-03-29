import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const data = await prisma.specialist.findMany();
  if (data.length === 0) {
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

export async function PUT(request, { params }) {
  const accessToken = request.headers.get("Authorization");

  const {
    name,
    email,
    address,
    photo,
    latitude,
    longitude,
    status,
    rating,
    ktp,
    tokenFCM,
  } = await request.json();

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

    if (decoded.role !== "specialist") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    // const data = await prisma.specialist.findUnique({
    //   where: { id: params?.id },
    // });

    // if (!data) {
    //   return NextResponse.json({
    //     status: false,
    //     error: "Data not found",
    //   });
    // }

    try {
      const data = await prisma.specialist.update({
        where: { id: decoded.id },
        data: {
          name,
          email,
          address,
          photo,
          latitude: latitude?.toString(),
          longitude: longitude?.toString(),
          status,
          rating,
          ktp,
          tokenFCM,
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
