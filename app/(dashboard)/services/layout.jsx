import Loading from "@/app/loading";
import Menu from "@/components/Menu";
import NavDashboard from "@/components/NavDashboard";
import { Suspense } from "react";

export const metadata = {
  title: "Services",
};

export const dynamic = "force-dynamic";

export default function Layout({ children }) {
  return (
    <div className="w-full bg-white">
      <NavDashboard />
      <div className="mx-auto max-w-7xl flex flex-row">
        <Menu />
        <div className="w-full px-6 py-8 lg:w-5/6">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
