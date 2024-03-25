import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SendFCM } from "@/libs/utils";
import moment from "moment";

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
        select: {
          amount: true,
          discount: true,
          user: true,
          servicePricings: {
            select: {
              services: {
                select: {
                  name: true,
                  categories: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          vehicleModels: {
            select: {
              name: true,
              brands: {
                select: { name: true },
              },
            },
          },
          takeOnTransactions: {
            select: {
              servicePriceOnSpecialists: {
                select: {
                  services: {
                    select: {
                      name: true,
                      categories: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      // NOTIF TO USER
      const userFCM = await prisma.user.findFirst({
        where: { id: resTransaction.user },
      });

      const msg = {
        title: "UPDATE STATUS PESANAN",
        body: `Pesanan Kamu tanggal: ${moment(dataTrans.createdAt).format(
          "DD MMM YYYY - HH:mm"
        )} (JB-${moment(
          dataTrans.createdAt
        ).unix()}) telah diupdate menjadi ${status}. Silakan cek aplikasi Josbos.`,
        data: {
          page: "Home",
          id: null,
        },
      };

      SendFCM(userFCM?.tokenFCM, msg.title, msg.body, msg.data)
        .then((res) => console.log("SEND_FCM_SUCCESS: ", res))
        .catch((err) => console.log("SEND_FCM_ERROR: ", err));

      const description = dataTrans.servicePricings
        ? `${dataTrans.servicePricings.services.categories.name}, ${dataTrans.servicePricings.services.name} (${dataTrans.vehicleModels.brands.name} ${dataTrans.vehicleModels.name})`
        : `${dataTrans.takeOnTransactions[0].servicePriceOnSpecialists.services.categories.name}, ${dataTrans.takeOnTransactions[0].servicePriceOnSpecialists.services.name} (${dataTrans.vehicleModels.brands.name} ${dataTrans.vehicleModels.name})`;

      console.log("DESC_TRANS: ", description);

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
            note: description,
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
