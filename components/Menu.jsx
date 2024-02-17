import Loading from "@/app/loading";
import { Suspense } from "react";

export default function Menu() {
  return (
    <div>
      <div className="font-bold mt-2">
        <a href="/mainboard">Dashboard</a>
      </div>
      <div className="font-bold mt-6">Publikasi</div>
      <ul className="mt-2 leading-8">
        <li>
          <a href="/articles">Articles</a>
        </li>
        <li>
          <a href="/promos">Promos</a>
        </li>
      </ul>
      <div className="font-bold mt-6">Member</div>
      <ul className="mt-2 leading-8">
        <li>
          <a href="/users">Users</a>
        </li>
        <li>
          <a href="/mitra">Mitra Spesialis</a>
        </li>
      </ul>
      <div className="font-bold mt-6">Master</div>
      <ul className="mt-2 leading-8">
        <li>
          <a href="/cities">City</a>
        </li>
        <li>
          <a href="/vehicles">Vehicles</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/prices">Pricing</a>
        </li>
      </ul>
    </div>
  );
}
