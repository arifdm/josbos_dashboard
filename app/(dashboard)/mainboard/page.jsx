"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Mainboard = () => {
  const { status, data: session } = useSession();
  const email = session?.user?.email.toString();

  const { data: admin } = useQuery({
    queryKey: ["admin"],
    queryFn: () => axios.get(`/api/auth/admin/check?email=${email}`),
    refetchOnWindowFocus: "always",
  });

  useEffect(() => {
    // console.log("DATA_MAIN_BOARD: ", admin?.data?.data);
    if (admin?.data?.data?.status === "inactive") {
      toast.error(
        "Akun belum aktif sehingga tidak dapat mengakses dashboard...!"
      );
      // router.push("/");
      signOut({ callbackUrl: "/" });
    }
  }, [admin?.data?.data]);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-5 text-primary">Dashboard</div>
      <div className="grid grid-flow-col gap-4">
        <div className="h-28 bg-slate-100 col-span-1 rounded-md p-4 flex flex-col justify-between">
          <h3 className="text-sm">Total Pemesan</h3>
          <p className="text-[35px] leading-none text-slate-400">210</p>
        </div>
        <div className="h-28 bg-slate-100 col-span-1 rounded-md p-4 flex flex-col justify-between">
          <h3 className="text-sm">Total Mitra Spesialis</h3>
          <p className="text-[35px] leading-none text-slate-400">89</p>
        </div>
        <div className="h-28 bg-slate-100 col-span-1 rounded-md p-4 flex flex-col justify-between">
          <h3 className="text-sm">Jumlah Tipe Kendaraan</h3>
          <p className="text-[35px] leading-none text-slate-400">89</p>
        </div>
        <div className="h-28 bg-slate-100 col-span-1 rounded-md p-4 flex flex-col justify-between">
          <h3 className="text-sm">Jumlah Layanan</h3>
          <p className="text-[35px] leading-none text-slate-400">89</p>
        </div>
      </div>
      <div className="grid grid-flow-col gap-4 mt-6 border-t-4 border-slate-100 pt-6">
        <div className="h-60 bg-slate-100 col-span-1 rounded-md p-4">
          <h3 className="text-sm">Pesanan</h3>
        </div>
        <div className="h-60 bg-slate-100 col-span-2 rounded-md p-4">
          <h3 className="text-sm">Pendapatan</h3>
        </div>
      </div>
      {/* <div className="grid grid-flow-col gap-4 mt-4">
        <div className="h-40 bg-slate-100 col-span-1 rounded-md"></div>
        <div className="h-40 bg-slate-100 col-span-1 rounded-md"></div>
      </div> */}
      {/* <div class="flex flex-wrap mt-8">
        <div class="h-28 bg-slate-200 w-[70%]"> 70% </div>
        <div class="h-28 bg-slate-300 w-[30%]"> 30% </div>
      </div> */}
    </div>
  );
};

export default Mainboard;
