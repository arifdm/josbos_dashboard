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
      // console.log("DATA_TRANS: ", dataTrans);

      if (status === "paid") {
        const takenID = await prisma.takeOnTransaction.findFirst({
          where: { transaction: id },
        });
        // console.log("DATA_TAKEN: ", takenID);
        // const partnerRevenue = dataTrans.amount - (dataTrans.amount * 20) / 100;
        const feeOrder = (dataTrans.amount * 20) / 100 - dataTrans.discount;

        await prisma.takeOnTransaction.update({
          where: { id: takenID.id },
          data: {
            partnerRevenue: dataTrans.amount,
            feeOrder,
          },
        });

        const lastSaldo = await prisma.saldoSpecialist.findFirst({
          where: { specialist: decoded.id },
          orderBy: { createdAt: "desc" },
          select: { saldo: true },
          take: 1,
        });
        // console.log("SALDO_AKHIR: ", lastSaldo?.saldo);

        const totalSaldo = lastSaldo ? lastSaldo?.saldo : 0;

        await prisma.saldoSpecialist.create({
          data: {
            note: "Transaksi",
            type: "decrease", // saldo berkurang
            amount: feeOrder,
            saldo: totalSaldo - feeOrder,
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
