import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
// const indonesia = require("indonesia-cities-regencies");

export async function GET(request) {
  // const kota = indonesia.getAll();

  try {
    const url = new URL(request.url);
    const take = url.searchParams.get("take");
    const lastCursor = url.searchParams.get("lastCursor");

    let result = await prisma.vehicleModel.findMany({
      take: take ? parseInt(take) : 20,
      ...(lastCursor && {
        skip: 1,
        cursor: { id: lastCursor },
      }),
      orderBy: { createdAt: "desc" },
    });
    // console.log("RESULT: ", result);

    if (result.length == 0) {
      return NextResponse.json({
        data: [],
        metaData: {
          lastCursor: null,
          hasNextPage: false,
        },
      });
    }

    const lastPostInResults = result[result.length - 1];
    const cursor = lastPostInResults.id;

    const nextPage = await prisma.vehicleModel.findMany({
      take: take ? parseInt(take) : 7,
      skip: 1,
      cursor: { id: cursor },
    });

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };
    return NextResponse.json({ status: true, data });
  } catch (error) {
    return NextResponse.json({ status: false });
  }
}
