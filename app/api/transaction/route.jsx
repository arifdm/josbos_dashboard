import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { SendFCM } from "@/libs/utils";

export async function GET(request) {
  const data = await prisma.transaction.findMany();
  if (data.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function POST(request) {
  const accessToken = request.headers.get("Authorization");
  const {
    address,
    amount,
    discount,
    latitude,
    longitude,
    note,
    orderMethod, // TakeOnTransaction
    promo,
    servicePrice,
    servicePriceOnSpecialist, // TakeOnTransaction
    total,
    user,
    orderDate,
    vehicleModel,
    payment,
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

    if (decoded.role !== "user") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    // let diskon = 0;
    // if (promo) {
    //   const dataPromo = await prisma.promo.findFirst({
    //     where: { id: promo },
    //   });
    //   diskon = dataPromo.discount;
    // }

    // let newAmount = 0;
    // if (orderMethod === "Random Mitra" || orderMethod === "Lakukan Penawaran") {
    //   const dataService = await prisma.servicePricing.findFirst({
    //     where: { id: servicePrice },
    //   });
    //   newAmount = dataService.price;
    // } else if (orderMethod === "Pilih Mitra Langsung") {
    //   const dataService = await prisma.servicePriceOnSpecialist.findFirst({
    //     where: { id: servicePriceOnSpecialist },
    //   });
    //   newAmount = dataService.price;
    // }

    try {
      const data = await prisma.transaction.create({
        data: {
          address,
          amount,
          discount,
          latitude,
          longitude,
          note,
          promo,
          servicePrice,
          total,
          user,
          orderDate,
          vehicleModel,
          payment,
          status: servicePriceOnSpecialist ? "taken" : "pending",
          takeOnTransactions: {
            create: {
              orderMethod,
              servicePriceOnSpecialist,
              selected: servicePriceOnSpecialist ? true : false,
              specialist: null,
            },
          },
        },
        include: {
          takeOnTransactions: true,
        },
      });
      // revalidatePath(data);
      console.log("CREATED: ", data);

      const msg = {
        title: "PESANAN MASUK UNTUK MITRA JOSBOS",
        body: "Pesanan telah masuk sesuai layanan dan jarak Kamu dengan pemesan. Silakan buka aplikasi Josbos sekarang juga...!",
        data: {
          page: "Home",
          id: data?.id,
        },
      };

      if (
        data?.takeOnTransactions?.[0]?.orderMethod === "Random Mitra" ||
        data?.takeOnTransactions?.[0]?.orderMethod === "Lakukan Penawaran"
      ) {
        try {
          const specialists =
            await prisma.$queryRaw`SELECT *, 6371 * acos(cos(RADIANS(CAST (${latitude} AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (latitude AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (${longitude} AS DOUBLE PRECISION )) - RADIANS(CAST (longitude AS DOUBLE PRECISION ))) + sin(RADIANS(CAST (${latitude} AS DOUBLE PRECISION ))) * sin(RADIANS(CAST (latitude AS DOUBLE PRECISION )))) as distance FROM "public"."Specialist" WHERE (6371 * acos(cos(RADIANS(CAST (${latitude} AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (latitude AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (${longitude} AS DOUBLE PRECISION )) - RADIANS(CAST (longitude AS DOUBLE PRECISION ))) + sin(RADIANS(CAST (${latitude} AS DOUBLE PRECISION ))) * sin(RADIANS(CAST (latitude AS DOUBLE PRECISION ))))) <= 10 AND status = 'online'`;

          console.log("LIST_SPECIALIST: ", specialists);
          const specialistFCM = specialists
            ?.map((item) => item?.tokenFCM)
            .filter((tokenFCM) => tokenFCM != "" && tokenFCM != null);

          console.log("LIST_TOKEN: ", specialistFCM);
          specialistFCM?.map((token) => {
            if (token) {
              SendFCM("SPECIALIST", token, msg.title, msg.body, msg.data)
                .then((res) => console.log("RES_SEND_FCM: ", res))
                .catch((err) => console.log("ERROR_SEND_FCM: ", err));
            }
          });
        } catch (error) {
          console.log("ERROR: ", error);
        }
      } else {
        const getSpecialistFCM =
          await prisma.servicePriceOnSpecialist.findFirst({
            where: {
              id: data?.takeOnTransactions?.[0]?.servicePriceOnSpecialist,
            },
            select: {
              specialists: { select: { tokenFCM: true } },
            },
          });

        const token = getSpecialistFCM.specialists?.tokenFCM;
        // console.log("Pilih Mitra Langsung: ", token);
        if (token) {
          const resSendFCM = await SendFCM(
            "SPECIALIST",
            token,
            msg.title,
            msg.body,
            msg.data
          );
          console.log("RES_SEND_FCM: ", resSendFCM);
        }
      }

      return NextResponse.json({
        status: true,
        message: "Create successfully",
        data: data,
      });
    } catch (error) {
      return NextResponse.json({
        status: false,
        error: "Create failed",
      });
    }
  }
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await prisma.transaction.delete({
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
