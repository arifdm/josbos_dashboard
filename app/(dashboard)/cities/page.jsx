"use client";

import Search from "@/components/UI/Search";
import Pagination from "@/libs/Pagination";
import { useEffect, useMemo, useState } from "react";
const indonesia = require("indonesia-cities-regencies");

export default function Users() {
  const kota = indonesia.getAll();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return kota.slice(firstPageIndex, lastPageIndex);
  }, [kota, currentPage, pageSize]);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7">Kota/Kabupaten Indonesia</div>
      <div className="w-full grid grid-cols-2 gap-3">
        <Search placeholder="Cari kota/kabupaten..." />
        <div className="flex justify-end">
          <select
            onChange={(e) => setPageSize(e.target.value)}
            className="border border-neutral-300 rounded-lg text-sm px-3 py-1.5 bg-white focus:outline-none"
          >
            <option disabled selected>
              Jum Baris
            </option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">250</option>
            <option value="500">500</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-200">
                  <tr>
                    <th scope="col" className="px-2 py-4">
                      #
                    </th>
                    <th scope="col" className="py-4">
                      Pulau
                    </th>
                    <th scope="col" className="py-4">
                      Provinsi
                    </th>
                    <th scope="col" className="py-4">
                      Kota/Kabupaten
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                    >
                      <td className="whitespace-nowrap px-1 py-4">
                        {pageSize * (currentPage - 1) + index + 1}
                      </td>
                      <td className="whitespace-nowrap py-4">{item.island}</td>
                      <td className="whitespace-nowrap py-4">
                        {item.province}
                      </td>
                      <td className="whitespace-nowrap py-4 font-bold">
                        {item?.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalCount={kota.length}
                  pageSize={pageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
