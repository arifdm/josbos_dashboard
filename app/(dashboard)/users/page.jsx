import Link from "next/link";
import prisma from "@/prisma/prisma";
import Image from "next/image";
import AddPage from "./addPage";
import UpdatePage from "./updatePage";
import DeletePage from "./deletePage";
import moment from "moment";
import Search from "@/components/UI/Search";

const getUser = async () => {
  const res = await prisma.user.findMany();
  return res;
};

export const revalidate = 1;

export default async function Users() {
  const users = await getUser();
  // console.log("RES: ", users);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7">Pemesan</div>
      <div className="w-full grid grid-cols-2 gap-3">
        <Search value="" placeholder="Cari pemesan..." />
        <div className="flex justify-end">
          <AddPage />
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
                    <th scope="col" className="py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                    >
                      <td className="whitespace-nowrap px-1 py-4">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap py-4">
                        {moment(item.createdAt).format("DD/MM/YYYY hh:mm")}
                      </td>
                      <td className="whitespace-nowrap py-4 font-bold">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap py-4">{item.email}</td>
                      <td className="whitespace-nowrap py-4">{item?.phone}</td>
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
          </div>
        </div>
      </div>
    </div>
  );
}
