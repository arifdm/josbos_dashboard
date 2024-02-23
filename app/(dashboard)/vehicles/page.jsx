import Link from "next/link";
import prisma from "@/prisma/prisma";
import Image from "next/image";
import AddPage from "./addPage";
import UpdatePage from "./updatePage";
import DeletePage from "./deletePage";

const getData = async () => {
  const res = await prisma.vehicleModel.findMany({
    select: {
      id: true,
      name: true,
      vehicleSizes: {
        select: {
          name: true,
        },
      },
      brands: {
        select: {
          name: true,
          types: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return res;
};
export const revalidate = 1;

const Vehicles = async () => {
  const data = await getData();
  // console.log("RES_: ", data);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7">Vehicles</div>
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
                placeholder="Cari Kategori/Layanan..."
                required
              />
            </div>
          </form>
        </div>
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
                      Vehicle
                    </th>
                    <th scope="col" className="py-4">
                      Brand
                    </th>
                    <th scope="col" className="py-4">
                      Model
                    </th>
                    <th scope="col" className="py-4">
                      Size
                    </th>
                    <th scope="col" className="py-4 text-center">
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
                      <td className="whitespace-nowrap px-2 py-4">
                        {index + 1}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
