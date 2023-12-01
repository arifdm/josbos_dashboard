import { generateToken } from "@/libs/utils";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { phone, password } = await request.json();
  // console.log("BODY: ", name, email);

  const dataUser = await prisma.user.findFirst({
    where: { phone },
  });
  // console.log("DATA_USER: ", dataUser);

  if (!dataUser) {
    return NextResponse.json({
      status: false,
      error: "Data login tidak valid...!",
    });
  }

  if (data?.password) {
    bcrypt.compare(password, dataUser?.password).then((match) => {
      if (!match) {
        return NextResponse.json({
          status: false,
          error: "Data login tidak valid...!",
        });
      }
    });
  }

  const tokenAccess = generateToken({
    data: {
      id: dataUser.id,
      phone: dataUser.phone,
      role: "user",
    },
  });

  return NextResponse.json({
    status: true,
    message: "Login successfully",
    data: dataUser,
    tokenAccess,
  });
}
