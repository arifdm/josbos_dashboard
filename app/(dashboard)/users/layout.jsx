import NavDashboard from "@/components/NavDashboard";
// import { Suspense } from "react";

export const metadata = {
  title: "Users",
};

export const dynamic = "force-dynamic";

export default function EventLayout({ children }) {
  return (
    <div className="w-full bg-white">
      <NavDashboard />
      {/* <Suspense fallback={<p>Loading...</p>}></Suspense> */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-10">{children}</div>
    </div>
  );
}
