"use client";

import {
  BookmarkIcon,
  BuildingOffice2Icon,
  NewspaperIcon,
  RectangleGroupIcon,
  TruckIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();
  return (
    <div className="w-1/6 bg-slate-200 hidden lg:block h-screen px-4 py-8 text-sm">
      <div className="font-bold mt-2 mx-1">
        <Link href="/mainboard">Dashboard</Link>
      </div>
      <div className="font-bold mt-6 mx-1">Publikasi</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/articles">
            <div
              className={`text-slate-400 px-2 rounded-md cursor-pointer hover:bg-slate-300 ${
                pathname === "/articles" ? "bg-slate-300" : ""
              }`}
            >
              <NewspaperIcon className="w-5 h-5 inline-block mr-2" />
              Artikel
            </div>
          </Link>
        </li>
        <li>
          <Link href="/promos">
            <div
              className={`text-slate-400 px-2 rounded-md cursor-pointer hover:bg-slate-300 ${
                pathname === "/promos" ? "bg-slate-300" : ""
              }`}
            >
              <BookmarkIcon className="w-5 h-5 inline-block mr-2" />
              Promo
            </div>
          </Link>
        </li>
      </ul>
      <div className="font-bold mt-6 mx-1">Member</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/users">
            <div
              className={`text-slate-400 px-2 rounded-md cursor-pointer hover:bg-slate-300 ${
                pathname === "/users" ? "bg-slate-300" : ""
              }`}
            >
              <UsersIcon className="w-5 h-5 inline-block mr-2" />
              Pemesan
            </div>
          </Link>
        </li>
        <li>
          <Link href="/mitra">
            <div
              className={`text-slate-400 px-2 rounded-md cursor-pointer hover:bg-slate-300 ${
                pathname === "/mitra" ? "bg-slate-300" : ""
              }`}
            >
              <UserGroupIcon className="w-5 h-5 inline-block mr-2" />
              Mitra Spesialis
            </div>
          </Link>
        </li>
      </ul>
      <div className="font-bold mt-6 mx-1">Master</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/cities">
            <div
              className={`text-slate-400 px-2 rounded-md cursor-pointer hover:bg-slate-300 ${
                pathname === "/cities" ? "bg-slate-300" : ""
              }`}
            >
              <BuildingOffice2Icon className="w-5 h-5 inline-block mr-2" />
              City
            </div>
          </Link>
        </li>
        <li>
          <Link href="/vehicles">
            <div
              className={`text-slate-400 px-2 rounded-md cursor-pointer hover:bg-slate-300 ${
                pathname === "/vehicles" ? "bg-slate-300" : ""
              }`}
            >
              <TruckIcon className="w-5 h-5 inline-block mr-2" />
              Kendaraan
            </div>
          </Link>
        </li>
        <li>
          <Link href="/services">
            <div
              className={`text-slate-400 px-2 rounded-md cursor-pointer hover:bg-slate-300 ${
                pathname === "/services" ? "bg-slate-300" : ""
              }`}
            >
              <RectangleGroupIcon className="w-5 h-5 inline-block mr-2" />
              Layanan & Tarif
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
