import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { generateToken } from "@/libs/utils";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const data = await prisma.user.findFirst({
    where: { id },
  });
  // console.log("RES_DATA: ", data);

  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  } else {
    const tokenAccess = generateToken({
      data: {
        id: data.id,
        phone: data?.phone,
        email: data?.email,
        role: "user",
      },
    });
    // console.log("TOKEN: ", tokenAccess);

    delete data.password;

    // TOKEN TIDAK PERLU DI SIMPAN DI TABLE USER
    return NextResponse.json({
      status: true,
      message: "Generated token access successfully",
      tokenAccess,
      data: data,
    });
  }

  // try {
  //   const resData = await prisma.user.update({
  //     where: { id },
  //     data: { tokenAccess: token.toString() },
  //   });
  //   console.log("DATA: ", resData);

  //   return NextResponse.json({
  //     status: true,
  //     message: "Update token successfully",
  //     resData,
  //   });
  // } catch (error) {
  //   return NextResponse.json({
  //     status: false,
  //     error: "Update token failed",
  //   });
  // }
}
