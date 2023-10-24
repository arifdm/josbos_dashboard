import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   console.log("USER_ID: ", params?.user);
//   const data = await prisma.event.findFirst({
//     where: { authorId: params?.user },
//   });
//   if (!data) {
//     return NextResponse.json({
//       status: false,
//       error: "Data events not found",
//     });
//   }
//   return NextResponse.json({ status: true, data });
// }

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const authorId = searchParams.get("id");

  const data = await prisma.event.findMany({
    where: { authorId },
  });

  if (!data) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }

  return NextResponse.json({
    status: true,
    data,
  });
}
