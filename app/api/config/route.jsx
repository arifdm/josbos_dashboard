import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const pilih = searchParams.get("data");

  const data = {
    office: {
      alamat: "Jl. Deresan III No. 1",
      hp: "081 234 555 777",
      email: "office_josbos@gmail.com",
    },
    workshop: {
      alamat: "Jl. Deresan III No. 2",
      hp: "081 234 555 888",
      email: "workshop_josbos@gmail.com",
    },
  };

  const newData = data[pilih];
  return NextResponse.json(newData);
}
