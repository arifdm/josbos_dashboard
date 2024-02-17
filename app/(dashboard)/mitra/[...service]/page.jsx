"use client";

import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

export default function Service() {
  // const params = useParams();

  const pathname = usePathname();
  const router = useRouter();
  // console.log("PATHNAME: ", pathname);
  // console.log("PATHNAME: ", pathname.split("/").pop());
  // console.log("ROUTER: ", router);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("ID: ", id);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios.get(`/fetch/mitra/${id}`);
      setData(data.data);
    };
    getData().then(() => setLoading(false));
  }, [id]);

  console.log("DATA: ", data);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-5 inline-flex items-center">
        <Link href="/mitra">
          <ArrowLeftIcon className="h-4 w-4 text-grey-500" />
        </Link>
        <span className="ml-3">Layanan Mitra</span>
      </div>
      {/* <div className="w-full grid grid-cols-2 gap-3">
        <div>Kiri</div>
        <div className="flex justify-end">
          <Link href={`/mitra/${id}/edit`}>
            <div className="px-4 py-1.5 bg-gradient-to-b from-indigo-400 to-indigo-500 text-white rounded-md cursor-pointer text-center w-38 text-sm hover:from-indigo-300 hover:to-indigo-400">
              Tambah Layanan
            </div>
          </Link>
        </div>
      </div> */}
      <div className="px-4 py-1.5 bg-gradient-to-b from-emerald-400 to-emerald-500 text-white rounded-md cursor-pointer text-center w-40 text-sm hover:from-emerald-300 hover:to-emerald-400">
        Tambah Layanan
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            {loading && <div className="mt-5">Loading...</div>}
            {data.length > 0 && (
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
                      <th scope="col" className="px-6 py-4">
                        Tarif
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
                          {item.services.categories.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.services.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.cities.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.price}
                        </td>
                        <td className="full flex justify-center py-4">
                          <Link href={`/mitra/service?id=${item.id}`}>
                            <CheckIcon className="h-4 w-4 text-grey-500" />
                          </Link>
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
