import Link from "next/link";
import prisma from "@/prisma/prisma";
import AddPage from "./addPage";
import UpdatePage from "./updatePage";
import DeletePage from "./deletePage";
import Search from "@/components/UI/Search";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const getData = async () => {
  const res = await prisma.service.findMany({
    orderBy: {
      categories: {
        name: "asc",
      },
    },
    select: {
      id: true,
      name: true,
      categories: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          servicePricings: true,
        },
      },
    },
  });
  return res;
};
export const revalidate = 1;

const Services = async () => {
  const data = await getData();
  // console.log("RES_: ", data);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7">Services</div>
      <div className="w-full grid grid-cols-2 gap-3">
        <Search value="" placeholder="Cari kategori/layanan..." />
        <div className="flex justify-end">
          <AddPage />
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
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
                        Kategori
                      </th>
                      <th scope="col" className="py-4">
                        Layanan
                      </th>
                      <th scope="col" className="py-4 text-center">
                        Kota
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
                          {item.categories.name}
                        </td>
                        <td className="whitespace-nowrap py-4 font-bold">
                          {item.name}
                        </td>
                        <td>
                          <div className="full flex justify-center gap-2 align-middle">
                            <div
                              className={
                                "btn btn-sm " +
                                (item._count.servicePricings
                                  ? "btn-warning"
                                  : "btn-outline btn-warning")
                              }
                            >
                              <Link href={`/services/price?id=${item.id}`}>
                                {item._count.servicePricings}
                              </Link>
                            </div>
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
      </Suspense>
    </div>
  );
};

export default Services;
