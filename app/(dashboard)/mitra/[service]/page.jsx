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

const getGetLayanan = async (id) => {
  const { data } = await axios.get(`/fetch/service/${id}`);
  return data.data;
};

// export const revalidate = 1;
export default function Service({ params }) {
  // const searchParams = useSearchParams();
  const id = params.service;

  console.log("PARAMS: ", params.service);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["service-mitra"],
    queryFn: () => getGetLayanan(id),
  });

  // console.log("DATA: ", data);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7 inline-flex items-center">
        <Link href="/mitra">
          <ArrowLeftIcon className="h-4 w-4 text-grey-500" />
        </Link>
        <span className="ml-3">Layanan Mitra</span>
      </div>

      {data?.length > 0 && <AddPage id={id} />}

      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            {loading && <LoadingSpinner />}
            {data?.length > 0 && (
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-200">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Categori
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Service
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
                    {data?.map((item, index) => (
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
                          <CheckIcon className="h-4 w-4 text-grey-500" />
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
