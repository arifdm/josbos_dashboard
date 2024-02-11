import Loading from "@/app/loading";
import { Suspense } from "react";

export default function Menu() {
  return (
    <div>
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
  );
}
