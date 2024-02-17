import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const getService = searchParams.get("service");
  const getVehicleSize = searchParams.get("vehicleSize");

  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  // const specialists =
  // await prisma.$queryRaw`SELECT id, 6371 * acos(cos(RADIANS(CAST (${latitude} AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (latitude AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (${longitude} AS DOUBLE PRECISION )) - RADIANS(CAST (longitude AS DOUBLE PRECISION ))) + sin(RADIANS(CAST (${latitude} AS DOUBLE PRECISION ))) * sin(RADIANS(CAST (latitude AS DOUBLE PRECISION )))) as distance FROM "public"."Specialist" where (6371 * acos(cos(RADIANS(CAST (${latitude} AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (latitude AS DOUBLE PRECISION ))) * cos(RADIANS(CAST (${longitude} AS DOUBLE PRECISION )) - RADIANS(CAST (longitude AS DOUBLE PRECISION ))) + sin(RADIANS(CAST (${latitude} AS DOUBLE PRECISION ))) * sin(RADIANS(CAST (latitude AS DOUBLE PRECISION ))))) < 10 AND status = 'online'`;

  // console.log("DISTANCE_SPECIALIST: ", specialists);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const xprisma = prisma.$extends({
    result: {
      specialist: {
        radius: {
          // the dependencies
          needs: { latitude: true, longitude: true },
          compute(specialist) {
            // the computation logic
            return getDistanceFromLatLonInKm(
              latitude,
              longitude,
              specialist.latitude,
              specialist.longitude
            );
          },
        },
      },
    },
  });

  const data = await xprisma.$transaction([
    xprisma.ServicePriceOnSpecialist.findMany({
      where: {
        service: getService ? getService : {},
        vehicleSize: getVehicleSize ? getVehicleSize : {},
      },
      select: {
        id: true,
        price: true,
        priceDescription: true,
        city: true,
        service: true,
        vehicleSize: true,
        maxDistance: true,
        cities: {
          select: {
            id: true,
            name: true,
          },
        },
        specialists: {
          select: {
            id: true,
            name: true,
            latitude: true,
            longitude: true,
            phone: true,
            photo: true,
            rating: true,
            status: true,
            radius: true,
          },
        },
      },
    }),
  ]);

  const newData = data
    .shift()
    .filter((item) => item.maxDistance >= item.specialists?.radius);
  // console.log("DATA: ", newData);

  if (newData.length === 0) {
    return NextResponse.json({
      status: false,
      error: "Data not found",
    });
  }
  return NextResponse.json({ status: true, data: newData });
}
