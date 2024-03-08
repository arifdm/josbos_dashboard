export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/mainboard",
    "/articles/:path*",
    "/promos/:path*",
    "/pesananMasuk/:path*",
    "/pesananDibatalkan/:path*",
    "/pesananSelesai/:path*",
    "/users/:path*",
    "/mitra/:path*",
    "/cities/:path*",
    "/vehicles/:path*",
    "/services/:path*",
    "/fetch/:path*",
  ],
};
