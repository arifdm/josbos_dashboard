import { generateToken } from "@/libs/utils";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const data = await prisma.transaction.findMany({
    where: {
      status: {
        in: ["pending", "taken", "process"],
      },
    },
    select: {
      id: true,
      createdAt: true,
      address: true,
      latitude: true,
      longitude: true,
      total: true,
      users: {
        select: {
          name: true,
          phone: true,
          email: true,
        },
      },
      vehicleModels: {
        select: {
          name: true,
        },
      },
      bankAccounts: {
        select: {
          category: true,
          brandName: true,
        },
      },
      servicePricings: {
        select: {
          services: {
            select: {
              name: true,
              icon: true,
              categories: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      // takeOnTransactions: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  const count = await prisma.transaction.count();

  if (data.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, count, data });
}
