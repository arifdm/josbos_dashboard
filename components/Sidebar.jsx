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
    <div className="w-1/6 bg-slate-200 hidden lg:block px-4 py-8 text-sm max-h-full min-h-screen">
      <div className="font-bold mt-2 mx-1">
        <Link href="/mainboard">Dashboard</Link>
      </div>
      <div className="font-bold mt-6 mx-1">Pesanan</div>
      <ul className="mt-2 leading-8">
        <li>
          <Link href="/pesananMasuk">
            <div
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/pesananMasuk"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/pesananDibatalkan"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/pesananSelesai"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/users"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/mitra"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/articles"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/promos"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/cities"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/vehicles"
                  ? "bg-slate-400 text-white"
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
              className={`text-slate-500 px-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white ${
                pathname === "/services"
                  ? "bg-slate-400 text-white"
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
