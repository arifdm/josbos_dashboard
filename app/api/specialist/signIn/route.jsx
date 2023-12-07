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
  // console.log("DATA: ", data);

  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data login tidak valid...!",
    });
  }

  try {
    const match = await bcrypt.compare(password, data?.password);
    console.log("RES_COMPARE: ", match);

    if (match) {
      const tokenAccess = generateToken({
        data: {
          id: data.id,
          phone: data.phone,
          role: "specialist",
        },
      });

      delete data.password;

      return NextResponse.json({
        status: true,
        message: "Login successfully",
        data,
        tokenAccess,
      });
    } else {
      return NextResponse.json({
        status: false,
        error: "Data login tidak valid...!",
      });
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
}
