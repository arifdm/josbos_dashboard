import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  const accessToken = request.headers.get("Authorization");
  // console.log("TOKEN: ", accessToken);

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
        error: "Access Token tidak valid...!",
      });
    }

    if (decoded.role !== "specialist") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    const data = await prisma.saldoSpecialist.findMany({
      where: {
        specialist: decoded.id,
        status: true,
      },
      orderBy: { createdAt: "asc" },
    });

    if (!data) {
      return NextResponse.json({
        status: false,
        error: "Data not found",
      });
    }
    return NextResponse.json({ status: true, data });
  }
}

export async function POST(request) {
  const accessToken = request.headers.get("Authorization");

  const { note, amount, type } = await request.json();

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
        error: "Access Token tidak valid...!",
      });
    }

    if (decoded.role !== "specialist") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    // AKAN DIPINDAHKAN KE DASHBOARD, MENU APPROVE DEPOSIT

    const lastSaldo = await prisma.saldoSpecialist.findFirst({
      where: { specialist: decoded.id },
      orderBy: { createdAt: "desc" },
      select: { saldo: true },
      take: 1,
    });

    const totalSaldo = lastSaldo ? lastSaldo?.saldo : 0;

    try {
      const data = await prisma.saldoSpecialist.create({
        data: {
          note,
          type, // increase or decrease
          amount,
          saldo:
            type === "increase" ? totalSaldo + amount : totalSaldo - amount,
          specialist: decoded.id,
          transaction: null,
          status: false,
        },
      });
      return NextResponse.json({
        status: true,
        message: "Entry successfully created",
        data,
      });
    } catch (error) {
      return NextResponse.json({
        status: false,
        error,
      });
    }
  }
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
