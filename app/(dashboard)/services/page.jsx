import Search from "@/components/UI/Search";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import DeletePage from "./deletePage";
import UpdatePage from "./updatePage";

const getService = async () => {
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

const getCategory = async () => {
  const res = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return res;
};
export const revalidate = 1;

const Services = async () => {
  const data = await getService();
  const category = await getCategory();
  // console.log("DATA: ", data);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-4 text-primary">
        Layanan & Tarif
      </div>
      <div className="w-full flex flex-row border-t border-gray-200">
        <div className="w-1/5 border-r border-gray-200 pt-8 hidden lg:block">
          <h2 className="font-medium mb-3">Kategori</h2>
          <ul>
            <li className="text-sm py-2">All</li>
            {category?.map((item) => (
              <li key={item.id} className="text-sm py-2 font-normal">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full pt-1.5 lg:pl-6">
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
                          Tarif Kota
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
                          <td className="full flex justify-center py-4 px-2">
                            <Link
                              href={`/services/${item.id}`}
                              className="flex justify-center align-middle w-[28px] h-[28px] bg-slate-100 rounded-md hover:bg-sky-200 cursor-pointer font-medium items-center"
                            >
                              {item._count.servicePricings}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
