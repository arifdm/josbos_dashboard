"use client";

import Link from "next/link";
import prisma from "@/prisma/prisma";
import Image from "next/image";
import AddPage from "./addPage";
import UpdatePage from "./updatePage";
import DeletePage from "./deletePage";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import Search from "@/components/UI/Search";

// const getData = async () => {
//   // https://jsonplaceholder.typicode.com/albums?_page=&_limit=&q=
//   const res = await prisma.vehicleModel.findMany({
//     select: {
//       id: true,
//       name: true,
//       vehicleSizes: {
//         select: {
//           name: true,
//         },
//       },
//       brands: {
//         select: {
//           name: true,
//           types: {
//             select: {
//               name: true,
//             },
//           },
//         },
//       },
//     },
//     orderBy: [
//       {
//         brands: {
//           name: "asc",
//         },
//       },
//       {
//         name: "asc",
//       },
//     ],
//   });
//   return res;
// };
// export const revalidate = 1;
const getVehicles = async () => {
  const { data } = await axios.get(`/fetch/vehicle`);
  return data.data;
};

export default function Vehicles() {
  // const data = await getData();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(20);

  const { data: posts, isPending } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehicles(),
  });
  // console.log("RES: ", posts);

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Pagination = ({
    postsPerPage,
    length,
    handlePagination,
    currentPage,
  }) => {
    let paginationNumber = [];
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
      paginationNumber.push(i);
    }
    return (
      <div className="flex gap-1.5 text-sm">
        {paginationNumber.map((data) => (
          <button
            key={data}
            onClick={() => handlePagination(data)}
            className={`${
              currentPage === data ? "bg-slate-500" : ""
            } w-7 py-2 bg-slate-200 rounded-sm`}
          >
            {data}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7">Vehicles</div>
      <div className="w-full grid grid-cols-2 gap-3">
        <Search value="" placeholder="Cari kendaraan..." />
        <div className="flex justify-end">
          <AddPage />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            {isPending && <LoadingSpinner />}
            {currentPosts?.length > 0 && (
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-200">
                    <tr>
                      <th scope="col" className="px-2 py-4">
                        #
                      </th>
                      <th scope="col" className="py-4">
                        Kendaraan
                      </th>
                      <th scope="col" className="py-4">
                        Merk
                      </th>
                      <th scope="col" className="py-4">
                        Type
                      </th>
                      <th scope="col" className="py-4">
                        Kategori
                      </th>
                      <th scope="col" className="py-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts?.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                      >
                        <td className="whitespace-nowrap px-2 py-4">
                          {postsPerPge * (currentPage - 1) + index + 1}
                        </td>
                        <td className="whitespace-nowrap py-4">
                          {item.brands.types.name}
                        </td>
                        <td className="whitespace-nowrap py-4">
                          {item.brands.name}
                        </td>
                        <td className="whitespace-nowrap py-4 font-bold">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap py-4">
                          {item?.vehicleSizes?.name}
                        </td>
                        <td>
                          <div className="full flex justify-center gap-2 align-middle">
                            <UpdatePage article={item} />
                            <DeletePage article={item} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-8">
                  <Pagination
                    length={posts?.length}
                    postsPerPage={postsPerPge}
                    handlePagination={handlePagination}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
