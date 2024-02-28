"use client";

import Search from "@/components/UI/Search";
import { useEffect, useState } from "react";
const indonesia = require("indonesia-cities-regencies");

export default function Users() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(20);

  useEffect(() => {
    const kota = indonesia.getAll();
    setPosts(kota);
  }, []);
  // console.log("KOTA: ", indonesia.getAll());
  // console.log("CURRENT_PAGE: ", currentPage);
  // console.log("PER_PAGE: ", postsPerPge);

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
      <div className="text-xl font-semibold mb-7">Kota/Kabupaten Indonesia</div>
      <div className="w-full grid grid-cols-2 gap-3">
        <Search placeholder="Cari kota/kabupaten..." />
        <div className="flex justify-end">
          <select
            onChange={(e) => SetPostsPerPage(e.target.value)}
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
                  {currentPosts?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                    >
                      <td className="whitespace-nowrap px-1 py-4">
                        {postsPerPge * (currentPage - 1) + index + 1}
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
                  length={posts.length}
                  postsPerPage={postsPerPge}
                  handlePagination={handlePagination}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
