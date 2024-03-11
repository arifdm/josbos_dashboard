"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import Search from "@/components/UI/Search";
import moment from "moment";
import StatusTransaction from "@/components/UI/StatusTransaction";
import DataNotFound from "@/components/DataNotFound";
import PaginationSimple from "@/libs/PaginationSimple";
import { Rupiah, Truncate } from "@/libs/utils";

const getPesanan = async () => {
  const { data } = await axios.get(`/fetch/pesanan/dibatalkan`);
  return data.data;
};

export default function PesananDibatalkan() {
  // const data = await getData();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["pesanan-dibatalkan"],
    queryFn: () => getPesanan(),
    refetchOnWindowFocus: true,
  });
  // console.log("DIBATALKAN: ", posts);

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setFilteredUsers(currentPosts);
  }, [posts]);

  // console.log("DATA: ", currentPosts);
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    const filteredItems = currentPosts.filter(
      (item) =>
        item.users?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.users?.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7 text-primary">
        Pesanan Dibatalkan
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="w-full grid grid-cols-2 gap-3">
            {posts?.length > 0 && (
              <>
                <Search
                  value={search}
                  onChange={handleSearch}
                  placeholder="Cari Nama, No HP..."
                />
                <div className="flex justify-end"></div>
              </>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                {filteredUsers?.length > 0 ? (
                  <div className="overflow-hidden">
                    <table className="min-w-full table-auto text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-200">
                        <tr>
                          <th
                            scope="col"
                            width="4%"
                            className="px-2 py-4 text-center"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            width="10%"
                            className="px-2 py-4 text-center"
                          >
                            Tgl Pesan
                          </th>
                          <th scope="col" width="15%" className="px-2 py-4">
                            Nama Pemesan
                          </th>
                          <th scope="col" width="23%" className="px-2 py-4">
                            Lokasi & Alamat
                          </th>
                          <th scope="col" width="15%" className="px-2 py-4">
                            Kategori & Layanan
                          </th>
                          <th scope="col" width="13%" className="px-2 py-4">
                            Pembayaran
                          </th>
                          <th scope="col" width="20%" className="px-2 py-4">
                            Alasan Pembatalan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers?.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                          >
                            <td className="px-2 py-4 text-center">
                              {postsPerPge * (currentPage - 1) + index + 1}.
                            </td>
                            <td className="px-2 py-4 text-center">
                              {moment(item.createdAt).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </td>
                            <td className="px-2 py-4">
                              <span className="font-bold">
                                {item.users?.name}
                              </span>
                              <br />
                              {item.users?.phone}
                            </td>
                            <td className="px-2 py-4">
                              {Truncate(item.address, 70, 70)}
                            </td>
                            <td className="px-2 py-4">
                              {
                                item?.servicePricings?.services?.categories
                                  ?.name
                              }
                              ,<br />{" "}
                              <span className="font-bold">
                                {item?.servicePricings?.services?.name}
                              </span>
                            </td>
                            <td className="px-2 py-4">
                              <span className="capitalize">
                                {item.bankAccounts?.category.toString()}
                              </span>
                              ,
                              <br />
                              {item.bankAccounts?.brandName}
                              <br />
                              Total: {Rupiah(item.total)}
                            </td>
                            <td className="px-2 py-4">{item?.alasanBatal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-8 flex items-center justify-center text-sm">
                      <PaginationSimple
                        length={posts?.length}
                        postsPerPage={postsPerPge}
                        handlePagination={handlePagination}
                        currentPage={currentPage}
                      />
                    </div>
                  </div>
                ) : (
                  <DataNotFound />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
