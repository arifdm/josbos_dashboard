import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(request, { params }) {
  const accessToken = request.headers.get("Authorization");

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const { status } = await request.json();

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

    try {
      const dataTrans = await prisma.transaction.update({
        where: { id },
        data: { status },
      });

      if (status === "paid") {
        const takenID = await prisma.takeOnTransaction.findFirst({
          where: { transaction: id },
        });

        const totalRevenue = dataTrans.amount - (dataTrans.amount * 20) / 100;

        await prisma.takeOnTransaction.update({
          where: { id: takenID.id },
          data: {
            partnerRevenue: totalRevenue,
            feeOrder: (dataTrans.amount * 20) / 100 - dataTrans.discount,
          },
        });

        const lastSaldo = await prisma.saldoSpecialist.findFirst({
          where: { specialist: decoded.id },
          orderBy: { createdAt: "desc" },
          select: { saldo: true },
          take: 1,
        });
        // console.log("RES_CREATE_SALDO: ", item);
        const totalSaldo = lastSaldo ? lastSaldo?.saldo : 0;

        await prisma.saldoSpecialist.create({
          data: {
            note: "Penghasilan Pesanan",
            type: "decrease", // saldo berkurang
            amount: totalRevenue,
            saldo: totalSaldo - totalRevenue ? totalSaldo - totalRevenue : 0,
            status: true,
            specialist: decoded.id,
            transaction: id,
          },
        });
      }

      return NextResponse.json({
        status: true,
        message: "Update transaction successfully",
        data: dataTrans,
      });
    } catch (error) {
      return NextResponse.json({
        status: false,
        error: "Update failed",
      });
    }
  }
}
