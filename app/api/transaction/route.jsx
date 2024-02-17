import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";

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

      revalidatePath(data);
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
