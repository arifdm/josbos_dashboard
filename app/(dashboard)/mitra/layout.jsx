import Loading from "@/app/loading";
import Sidebar from "@/components/Sidebar";
import NavDashboard from "@/components/NavDashboard";
import MenuMitra from "@/components/UI/MenuMitra";
// import { Suspense } from "react";

export const metadata = {
  title: "Users",
};

export const dynamic = "force-dynamic";
// export const revalidate = 3600;

export default function Layout({ children }) {
  return (
    <div className="w-full bg-white">
      <NavDashboard />
      <div className="mx-auto max-w-7xl flex flex-row">
        <Sidebar />
        <div className="w-full px-6 py-8 lg:w-5/6">
          {/* <Suspense fallback={<Loading />}></Suspense> */}
          <div className="text-xl font-semibold mb-7 text-primary">
            Mitra Spesialis
          </div>
          <MenuMitra />
          {children}
        </div>
      </div>
    </div>
  );
}
