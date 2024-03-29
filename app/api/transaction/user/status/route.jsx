import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const accessToken = request.headers.get("Authorization");

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("selected");
  // const user = searchParams.get("user");

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

    const data = await prisma.transaction.findFirst({
      orderBy: { createdAt: "desc" },
      where: {
        user: decoded.id,
        status:
          status === "process"
            ? {
                in: ["pending", "taken", "process", "unpaid", "paid"],
              }
            : status === "completed"
            ? {
                in: ["completed"],
              }
            : status,
      },
      select: {
        id: true,
        user: true,
        address: true,
        amount: true,
        discount: true,
        latitude: true,
        longitude: true,
        note: true,
        promos: true,
        total: true,
        orderDate: true,
        status: true,
        vehicleModels: {
          select: {
            name: true,
            brands: {
              select: {
                name: true,
              },
            },
          },
        },
        servicePricings: {
          select: {
            city: true,
            price: true,
            services: {
              select: {
                id: true,
                name: true,
                description: true,
                categories: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        bankAccounts: {
          select: {
            id: true,
            category: true,
            isOnline: true,
            accountName: true,
            brandName: true,
            number: true,
          },
        },
        takeOnTransactions: {
          select: {
            id: true,
            orderMethod: true,
            amountBids: true,
            selected: true,
            serviceDate: true,
            specialists: {
              select: {
                id: true,
                name: true,
                latitude: true,
                longitude: true,
                photo: true,
                rating: true,
              },
            },
            servicePriceOnSpecialists: {
              select: {
                id: true,
                price: true,
                specialists: {
                  select: {
                    id: true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    photo: true,
                    rating: true,
                  },
                },
                services: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    categories: {
                      select: {
                        id: true,
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

    if (!data) {
      return NextResponse.json({
        status: false,
        error: "Data not found",
      });
    }
    return NextResponse.json({ status: true, data });
  }
}

export async function PUT(request, { params }) {
  const accessToken = request.headers.get("Authorization");

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const { status, alasanBatal } = await request.json();

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

    try {
      const data = await prisma.transaction.update({
        where: { id },
        data: {
          status,
          alasanBatal,
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
