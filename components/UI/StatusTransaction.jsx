import React from "react";

export default function StatusTransaction({ data }) {
  return (
    <div>
      <div
        className={`full flex justify-center hover:bg-white p-2 rounded-md text-[12px] leading-[14px] font-medium ${
          data.status === "pending"
            ? "text-orange-400 bg-orange-100"
            : data.status === "taken"
            ? "text-emerald-400 bg-emerald-100"
            : data.status === "process"
            ? "text-cyan-400 bg-cyan-100"
            : data.status === "unpaid"
            ? "text-rose-400 bg-rose-100"
            : "text-indigo-400 bg-indigo-100"
        }`}
      >
        {data.status === "pending"
          ? "Belum diambil"
          : data.status === "taken"
          ? "Sudah diambil"
          : data.status === "process"
          ? "Sedang dikerjakan"
          : data.status === "unpaid"
          ? "Sudah selesai, belum dibayar"
          : "Sudah dibayar"}
      </div>
    </div>
  );
}
