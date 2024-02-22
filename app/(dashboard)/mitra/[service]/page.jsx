"use client";

import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
// import {
//   useParams,
//   useSearchParams,
//   usePathname,
//   useRouter,
// } from "next/navigation";
import AddPage from "./addPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const getGetLayanan = async (id) => {
  const { data } = await axios.get(`/fetch/service/${id}`);
  return data.data;
};
// export const revalidate = 1;

export default function Service({ params }) {
  // const searchParams = useSearchParams();
  // console.log("PARAMS: ", params.service);
  const id = params.service;
  const [searchItem, setSearchItem] = useState("");
  const [filterData, setFilterData] = useState([]);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["service-mitra"],
    queryFn: () => getGetLayanan(id),
  });

  // console.log("DATA: ", data);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = data.filter(
      (item) =>
        item.services.categories?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.services?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("SEARCH: ", filteredItems);
    setFilterData(filteredItems);
  };

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7 inline-flex items-center">
        <Link href="/mitra">
          <ArrowLeftIcon className="h-4 w-4 text-grey-500" />
        </Link>
        <span className="ml-3">Layanan Mitra</span>
      </div>

      {filterData?.length > 0 && (
        <div className="w-full grid grid-cols-2 gap-3">
          <div>
            <form className="max-w-sm">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchItem}
                  onChange={handleSearch}
                  id="default-search"
                  className="block w-full px-3 py-1.5 ps-10 text-sm text-neutral-500 border border-neutral-300 rounded-lg bg-white focus:bg-neutral-100 focus:outline-none"
                  placeholder="Cari Kategori/Layanan..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex justify-end">
            <AddPage id={id} />
          </div>
        </div>
      )}

      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            {loading && <LoadingSpinner />}
            {filterData?.length > 0 && (
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-200">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Kategori
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Layanan
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Kota
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Ukuran
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Tarif
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Jarak
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData?.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.services.categories?.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.services.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.cities.name}
                        </td>
                        <td className="text-center py-4">
                          {item.vehicleSizes?.name}
                        </td>
                        <td className="text-right py-4 pr-5">{item.price}</td>
                        <td className="text-center py-4">
                          {item.maxDistance} Km
                        </td>
                        <td className="full flex justify-center py-4">
                          <div
                            className="p-1.5 bg-slate-100 rounded-sm"
                            onClick={() =>
                              toast.info("Layanan telah ditambahkan")
                            }
                          >
                            <CheckIcon className="h-4 w-4 text-teal-500" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
