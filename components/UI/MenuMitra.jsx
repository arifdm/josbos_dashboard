"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function MenuMitra() {
  const [active, setActive] = useState(0);
  const menuMitra = [
    {
      name: "Data Mitra",
      link: "/mitra",
    },
    {
      name: "Saldo",
      link: "/mitra-saldo",
    },
    {
      name: "Transaksi",
      link: "/mitra-transaksi",
    },
  ];

  return (
    <div class="container mx-auto mb-8">
      <div class="flex flex-wrap gap-2">
        {menuMitra.map((item, index) => (
          <div key={index} class="md:w-1/6 w-1/4">
            <div
              onClick={() => setActive(index)}
              class={`cursor-pointer py-1.5 px-3 text-sm ${
                active === index
                  ? "bg-primary text-white"
                  : "bg-slate-200 text-slate-500"
              } rounded-sm`}
            >
              <Link href={item.link}>{item.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
