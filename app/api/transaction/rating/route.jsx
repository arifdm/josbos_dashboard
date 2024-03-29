import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SendFCM } from "@/libs/utils";

export async function PUT(request, { params }) {
  const accessToken = request.headers.get("Authorization");

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const { rating, comment } = await request.json();

  console.log("TRANSACTION: ", id);
  console.log("BODY: ", rating, comment);

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

    if (decoded.role !== "user") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    const transactionID = await prisma.takeOnTransaction.findFirst({
      where: { transaction: id },
    });

    if (!transactionID) {
      return NextResponse.json({
        status: false,
        error: "Transaction ID not found",
      });
    }

    try {
      const resTake = await prisma.takeOnTransaction.update({
        where: { id: transactionID.id },
        data: {
          rating: parseInt(rating),
          ratingComment: comment,
        },
      });

      const resTrans = await prisma.transaction.update({
        where: { id },
        data: {
          status: "completed",
        },
      });

      // NOTIF TO USER
      const userFCM = await prisma.user.findFirst({
        where: { id: resTrans.user },
      });

      const msg = {
        title: "TERIMA KASIH TELAH PESAN DI JOSBOS",
        body: "Apabila Kamu puas dengan layanan kami, silakan beritahu teman atau saudara yang lain. Terima kasih.",
        data: {
          page: "Home",
          id: null,
        },
      };

      SendFCM("USER", userFCM?.tokenFCM, msg.title, msg.body, msg.data)
        .then((res) => console.log("SEND_FCM_SUCCESS: ", res))
        .catch((err) => console.log("SEND_FCM_ERROR: ", err));

      // NOTIF TO SPECIALIST
      const specialistFCM = await prisma.specialist.findFirst({
        where: { id: resTake.specialist },
      });

      const msg2 = {
        title: "RATING LAYANAN YANG KAMU SELESAIKAN",
        body: "Pemesan telah menilai layanan Kamu, silakan buka aplikasi Josbos.",
        data: {
          page: "Home",
          id: null,
        },
      };

      SendFCM(
        "SPECIALIST",
        specialistFCM?.tokenFCM,
        msg2.title,
        msg2.body,
        msg2.data
      )
        .then((res) => console.log("SEND_FCM_SUCCESS: ", res))
        .catch((err) => console.log("SEND_FCM_ERROR: ", err));

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
