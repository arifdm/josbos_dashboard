import Loading from "@/app/loading";
import Sidebar from "@/components/Sidebar";
import NavDashboard from "@/components/NavDashboard";
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
          {children}
        </div>
      </div>
    </div>
  );
}
