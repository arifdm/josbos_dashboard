import { Suspense } from "react";
import NavDashboard from "@/components/NavDashboard";
import Loading from "@/app/loading";

export const metadata = {
  title: "Maindboard",
};

export const dynamic = "force-dynamic";

export default function MainboardLayout({ children }) {
  return (
    <div className="w-full bg-white">
      <NavDashboard />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-10">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
