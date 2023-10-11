import { generateToken } from "@/libs/utils";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const usersId = searchParams.get("id");

  const data = await prisma.participant.findMany({
    include: {
      users: true,
      events: {
        include: {
          author: true,
        },
      },
    },
    where: { usersId },
  });
  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}
