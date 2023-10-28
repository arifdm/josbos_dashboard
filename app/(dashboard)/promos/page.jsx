import Link from "next/link";
import prisma from "@/prisma/prisma";
import Image from "next/image";
import AddPage from "./addPage";
import UpdatePage from "./updatePage";
import DeletePage from "./deletePage";
// import { useSession } from "next-auth/react";

const getData = async () => {
  const res = await prisma.promo?.findMany();
  return res;
};

export const revalidate = 1;

const Promos = async () => {
  const promos = await getData();
  // console.log("RES_ARTICLE: ", promos);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-5">Promos</div>
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
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Diskon
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Kode Promo
                    </th>
                    <th scope="col" className="px-6 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {promos?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-200 dark:hover:bg-neutral-200"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Image
                          className="rounded-lg overflow-hidden"
                          src={item.image}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="font-medium text-xl">
                          {item.type === "percent"
                            ? item.discount + "%"
                            : item.discount}
                        </span>
                        {item.maxDiscount && (
                          <span>
                            <br />
                            Maksimal {item.maxDiscount}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.code}
                      </td>
                      <td>
                        <div className="full flex justify-center gap-2 align-middle">
                          <UpdatePage data={item} />
                          <DeletePage data={item} />
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

export default Promos;
