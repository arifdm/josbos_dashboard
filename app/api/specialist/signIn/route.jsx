import { generateToken } from "@/libs/utils";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { phone, password } = await request.json();
  // console.log("BODY: ", name, email);

  const data = await prisma.specialist.findFirst({
    where: { phone },
  });
  console.log("DATA: ", data);

  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data login tidak valid...!",
    });
  }

  if (!bcrypt.compare(password, data.password)) {
    return NextResponse.json({
      status: false,
      error: "Data login tidak valid...!",
    });
  }

  // GENERATE TOKEN ACCESS
  const tokenAccess = generateToken({
    user: { id: data.id, phone: data.phone },
  });

  return NextResponse.json({
    status: true,
    message: "Login successfully",
    data: data,
    tokenAccess,
  });
}
