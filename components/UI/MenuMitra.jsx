"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  MdAssignmentLate,
  MdAssignmentReturned,
  MdAssignmentTurnedIn,
} from "react-icons/md";

export default function MenuMitra() {
  const pathname = usePathname();
  const [active, setActive] = useState("/mitra");

  const menuMitra = [
    {
      name: "Data Mitra",
      link: "/mitra",
    },
    {
      name: "Saldo",
      link: "/mitra/saldo-mitra",
    },
    {
      name: "Transaksi",
      link: "/mitra/transaksi-mitra",
    },
  ];

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  // const path = pathname.split("/")[2];
  // console.log("ACTIVE: ", active);

  return (
    <div class="container mx-auto mb-8">
      <div class="flex flex-wrap gap-2">
        {menuMitra.map((item, index) => (
          <>
            <Link key={index} href={item.link} class="md:w-1/6 w-1/4">
              <div
                class={`cursor-pointer py-1.5 px-3 text-sm ${
                  active === item.link
                    ? "bg-slate-300 text-slate-500"
                    : "bg-slate-200 text-slate-400"
                } rounded-sm`}
              >
                {/* <MdAssignmentLate className="w-5 h-5 inline-block mr-2" /> */}
                {item.name}
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}
