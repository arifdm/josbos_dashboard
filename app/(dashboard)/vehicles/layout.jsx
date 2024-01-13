import Loading from "@/app/loading";
import NavDashboard from "@/components/NavDashboard";
import { Suspense } from "react";

export const metadata = {
  title: "Vehicles",
};

export const dynamic = "force-dynamic";

export default function Layout({ children }) {
  return (
    <div className="w-full bg-white">
      <NavDashboard />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-10">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
