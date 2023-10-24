import NavDashboard from "@/components/NavDashboard";

export const metadata = {
  title: "Articles",
};

export const dynamic = "force-dynamic";

export default function Layout({ children }) {
  return (
    <div className="w-full bg-white">
      <NavDashboard />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-10">{children}</div>
    </div>
  );
}
