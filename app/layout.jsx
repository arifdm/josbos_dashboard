// import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/libs/NextAuthProvider";
// import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Josbos",
  description: "Rawat mobil sendiri merepotkan? Gunakan Josbos sekarang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <main className="h-screen justify-center items-center bg-white">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
