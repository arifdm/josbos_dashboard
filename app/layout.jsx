// import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/libs/NextAuthProvider";
import { Suspense } from "react";
import Loading from "./loading";
import ReactQueryProvider from "@/libs/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Josbos",
  description: "Rawat mobil sendiri merepotkan? Gunakan Josbos sekarang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextAuthProvider>
            <main className="h-screen justify-center items-center bg-white">
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <ToastContainer />
            </main>
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
