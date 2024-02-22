"use client";

import { useEffect, useState } from "react";
const indonesia = require("indonesia-cities-regencies");

export default function Users() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(20);

  useEffect(() => {
    const kota = indonesia.getAll();
    setPosts(kota);
  }, []);
  // console.log("KOTA: ", indonesia.getAll());

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
      <div className="flex gap-1">
        {paginationNumber.map((data) => (
          <button
            key={data}
            onClick={() => handlePagination(data)}
            className={`${
              currentPage === data ? "active" : ""
            } px-2 py-1 bg-slate-200 rounded-sm`}
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
                id="default-search"
                className="block w-full px-3 py-1.5 ps-10 text-sm text-neutral-500 border border-neutral-300 rounded-lg bg-white focus:bg-neutral-100 focus:outline-none"
                placeholder="Cari Kota/Kabupaten..."
                required
              />
            </div>
          </form>
        </div>
        <div className="flex justify-end">{/* <AddPage /> */}</div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-200">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Pulau
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Privinsi
                    </th>
                    <th scope="col" className="px-6 py-4">
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
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {postsPerPge * (currentPage - 1) + index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.island}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.province}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium">{item?.name}</div>
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
