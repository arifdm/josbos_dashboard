import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
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
        error: "Access Token tidak valid...!",
      });
    }

    if (decoded.role !== "specialist") {
      return NextResponse.json({
        status: false,
        error: "Anda tidak memiliki akses...!",
      });
    }

    const data = await prisma.ServicePriceOnSpecialist.findMany({
      where: {
        specialist: decoded.id,
      },
      select: {
        id: true,
        price: true,
        priceDescription: true,
        city: true,
        service: true,
        vehicleSize: true,
        maxDistance: true,
        cities: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (data.length === 0) {
      return NextResponse.json({
        status: false,
        error: "Data not found",
      });
    }
    return NextResponse.json({ status: true, data });
  }
}
