"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Search from "@/components/UI/Search";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeletePage from "./deletePage";
import UpdatePage from "./updatePage";

const getMitra = async () => {
  const { data } = await axios.get(`/fetch/specialist`);
  return data.data;
};

export default function Users() {
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["mitra"],
    queryFn: () => getMitra(),
  });

  useEffect(() => {
    setFilteredUsers(data);
  }, [data]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };
  // console.log("DATA: ", data);
  // console.log("FILTER: ", filteredUsers);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7 text-primary">
        Mitra Spesialis
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="w-full grid grid-cols-2 gap-3">
            {filteredUsers?.length > 0 && (
              <Search
                value={searchItem}
                placeholder="Cari mitra spesialis..."
                onChange={handleSearch}
              />
            )}
            <div className="flex justify-end"></div>
          </div>
          <div className="flex flex-col mt-2">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                {filteredUsers?.length > 0 && (
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-200">
                        <tr>
                          <th scope="col" className="px-2 py-4">
                            #
                          </th>
                          <th scope="col" className="py-4">
                            Tgl Daftar
                          </th>
                          <th scope="col" className="py-4">
                            Nama
                          </th>
                          <th scope="col" className="py-4">
                            Email
                          </th>
                          <th scope="col" className="py-4">
                            HP
                          </th>
                          <th scope="col" className="py-4">
                            Kota
                          </th>
                          <th
                            scope="col"
                            className="full flex justify-center py-4"
                          >
                            Layanan
                          </th>
                          <th scope="col" className="py-4 text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers?.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                          >
                            <td className="whitespace-nowrap px-2 py-4">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap py-4">
                              {moment(item.createdAt).format(
                                "DD/MM/YYYY hh:mm"
                              )}
                            </td>
                            <td className="whitespace-nowrap py-4 font-bold">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap py-4">
                              {item.email}
                            </td>
                            <td className="whitespace-nowrap py-4">
                              {item?.phone}
                            </td>
                            <td className="whitespace-nowrap py-4">
                              {item?.cities?.name}
                            </td>
                            <td className="full flex justify-center py-4 px-2">
                              <Link
                                href={`/mitra/${item.id}`}
                                className="flex justify-center align-middle w-[28px] h-[28px] bg-slate-100 rounded-md hover:bg-sky-200 cursor-pointer font-medium items-center"
                              >
                                {item._count.servicePriceOnSpecialist}
                              </Link>
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
