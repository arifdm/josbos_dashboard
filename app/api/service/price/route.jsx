import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const data = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      categories: {
        select: {
          name: true,
        },
      },
      // servicePricings: {
      //   select: {
      //     city: true,
      //     price: true,
      //   },
      // },
      _count: {
        select: {
          servicePricings: true,
        },
      },
    },
  });
  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}

export async function POST(request) {
  const accessToken = request.headers.get("Authorization");
  const { service, city, vehicleSize, price, priceDescription } =
    await request.json();

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

    const dataArray = city.map((item) => ({
      city: item,
      specialist: decoded?.id,
      service,
      vehicleSize,
      price: Number(price),
      priceDescription,
    }));
    console.log("DATA_ARRAY: ", dataArray);

    try {
      const data = await prisma.servicePriceOnSpecialist.createMany({
        data: dataArray,
      });

      if (data) {
        return NextResponse.json({
          status: true,
          message: "Created successfully",
          data,
        });
      }
    } catch (error) {
      console.log("ERROR: ", error);
      return NextResponse.json({
        status: false,
        error: "Create failed...!",
      });
    }
  }
}
