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
      size: true,
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
                      Vehicle
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Model
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Size
                    </th>
                    <th scope="col" className="px-1 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-200 dark:hover:bg-neutral-100"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.brands.types.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.brands.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.size}
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
