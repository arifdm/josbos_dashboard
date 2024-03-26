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
import {
  MdAssignmentLate,
  MdAssignmentReturned,
  MdAssignmentTurnedIn,
} from "react-icons/md";

export default function Menu() {
  const pathname = usePathname();
  console.log("PATHNAME: ", pathname);

  return (
    <div className="w-1/6 bg-slate-100 hidden lg:block px-4 py-8 text-sm max-h-full min-h-screen">
      <Link href="/mainboard">
        <div
          className={`font-bold mt-2 mx-1 hover:text-primary ${
            pathname === "/mainboard" && "text-primary"
          }`}
        >
          Dashboard
        </div>
      </Link>
      <div className="font-bold mt-6 mx-1">Pesanan</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/pesananMasuk">
            <div
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/pesananMasuk"
                  ? "text-amber-500"
                  : "text-slate-500"
              }`}
            >
              <MdAssignmentReturned className="w-5 h-5 inline-block mr-2" />
              Masuk & Diambil
            </div>
          </Link>
        </li>
        <li>
          <Link href="/pesananDibatalkan">
            <div
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/pesananDibatalkan"
                  ? "text-amber-500"
                  : "text-slate-500"
              }`}
            >
              <MdAssignmentLate className="w-5 h-5 inline-block mr-2" />
              Dibatalkan
            </div>
          </Link>
        </li>
        <li>
          <Link href="/pesananSelesai">
            <div
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/pesananSelesai"
                  ? "text-amber-500"
                  : "text-slate-500"
              }`}
            >
              <MdAssignmentTurnedIn className="w-5 h-5 inline-block mr-2" />
              Selesai
            </div>
          </Link>
        </li>
      </ul>
      <div className="font-bold mt-6 mx-1">Member</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/users">
            <div
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/users" ? "text-amber-500" : "text-slate-500"
              }`}
            >
              <UsersIcon className="w-5 h-5 inline-block mr-2" />
              User Pemesan
            </div>
          </Link>
        </li>
        <li>
          <Link href="/mitra">
            <div
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/mitra" ? "text-amber-500" : "text-slate-500"
              }`}
            >
              <UserGroupIcon className="w-5 h-5 inline-block mr-2" />
              Mitra Spesialis
            </div>
          </Link>
        </li>
      </ul>
      <div className="font-bold mt-6 mx-1">Publikasi</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/articles">
            <div
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/articles" ? "text-amber-500" : "text-slate-500"
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
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/promos" ? "text-amber-500" : "text-slate-500"
              }`}
            >
              <BookmarkIcon className="w-5 h-5 inline-block mr-2" />
              Promo
            </div>
          </Link>
        </li>
      </ul>
      <div className="font-bold mt-6 mx-1">Master</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/cities">
            <div
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/cities" ? "text-amber-500" : "text-slate-500"
              }`}
            >
              <BuildingOffice2Icon className="w-5 h-5 inline-block mr-2" />
              Kota
            </div>
          </Link>
        </li>
        <li>
          <Link href="/vehicles">
            <div
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/vehicles" ? "text-amber-500" : "text-slate-500"
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
              className={`px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/services" ? "text-amber-500" : "text-slate-500"
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
