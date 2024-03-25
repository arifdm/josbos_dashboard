import { SendFCM } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const { server, token, title, body, data } = await request.json();

  try {
    const res = await SendFCM(server, token, title, body, data);
    return NextResponse.json({
      status: true,
      message: "Send FCM successfully",
      data: res,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({
      status: false,
      error,
    });
  }
}
