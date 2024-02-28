import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
// import { authOptions } from "./../../auth/[...nextauth]/route";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  const data = await prisma.admin.findFirst({
    where: { email },
  });
  // console.log("DATA: ", data);

  if (!data) {
    return NextResponse.json({
      status: false,
      message: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data });
}
