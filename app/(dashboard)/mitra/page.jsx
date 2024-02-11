import Link from "next/link";
import prisma from "@/prisma/prisma";
import Image from "next/image";
import AddPage from "./addPage";
import UpdatePage from "./updatePage";
import DeletePage from "./deletePage";

const getUser = async () => {
  const res = await prisma.specialist.findMany();
  return res;
};

export const revalidate = 1;

export default async function Users() {
  const users = await getUser();
  // console.log("RES: ", users);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-5">
        Mitra Bengkel (Spesialis)
      </div>
      <div className=" w-full grid grid-cols-2">
        <div className="mb-2">
          <AddPage />
        </div>
      </div>
      <div className="flex flex-col">
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
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Layanan
                    </th>
                    <th scope="col" className="px-6 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-200 dark:hover:bg-neutral-200"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.phone}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div
                          className={"btn btn-sm " + "btn-outline btn-warning"}
                        >
                          <Link href={`/services/price?id=${item.id}`}>
                            Open
                          </Link>
                        </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
