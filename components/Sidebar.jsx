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

  return (
    <div className="w-1/6 bg-slate-100 hidden lg:block px-4 py-8 text-sm max-h-full min-h-screen">
      <div
        className={`font-bold mt-2 mx-1 hover:text-primary ${
          pathname === "/mainboard"
            ? "text-primary"
            : "transition-color duration-400 delay-100 ease-in-out"
        }`}
      >
        <Link href="/mainboard">Dashboard</Link>
      </div>
      <div className="font-bold mt-6 mx-1">Pesanan</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/pesananMasuk">
            <div
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/pesananMasuk"
                  ? "text-amber-500"
                  : "transition-color duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/pesananDibatalkan"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/pesananSelesai"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/users"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/mitra"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/articles"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/promos"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/cities"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/vehicles"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
              className={`text-slate-500 px-2 rounded-sm cursor-pointer hover:text-amber-500 ${
                pathname === "/services"
                  ? "text-amber-500"
                  : "transition-all duration-400 delay-100 ease-in-out"
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
