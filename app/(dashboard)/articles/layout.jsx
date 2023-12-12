import NavDashboard from "@/components/NavDashboard";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Articles",
};

export const dynamic = "force-dynamic";

export default function Layout({ children }) {
  return (
    <div className="w-full bg-white">
      <NavDashboard />
      <div className="mx-auto max-w-7xl flex flex-row">
        <div className="w-1/6 bg-slate-200 hidden lg:block h-screen px-6 py-8 text-sm">
          <div className="font-bold mt-2">Dashboard</div>
          <ul className="mt-2 leading-8">
            <li>Articles</li>
            <li>Promos</li>
          </ul>
          <div className="font-bold mt-6">Member</div>
          <ul className="mt-2 leading-8">
            <li>Pemesan</li>
            <li>Mitra</li>
          </ul>
          <div className="font-bold mt-6">Master</div>
          <ul className="mt-2 leading-8">
            <li>City</li>
            <li>Vehicles</li>
            <li>Service</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div className="w-full px-6 py-8 lg:w-5/6">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
