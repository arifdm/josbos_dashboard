import Link from "next/link";
import prisma from "@/prisma/prisma";
import Image from "next/image";
import UpdatePage from "./updatePage";
import DeletePage from "./deletePage";
import AddPage from "./addPage";
import Search from "@/components/UI/Search";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
// import { useSession } from "next-auth/react";

const getData = async () => {
  const res = await prisma.article.findMany();
  return res;
};

export const revalidate = 1;

const Articles = async () => {
  const articles = await getData();
  // console.log("RES_ARTICLE: ", articles);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-7 text-primary">Articles</div>
      <div className="w-full grid grid-cols-2 gap-3">
        <Search placeholder="Cari artikel..." />
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
                        Image
                      </th>
                      <th scope="col" className="py-4">
                        Title
                      </th>
                      <th scope="col" className="py-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles?.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                      >
                        <td className="whitespace-nowrap px-2 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap py-4">
                          <Image
                            className="rounded-lg overflow-hidden"
                            src={item.image}
                            alt=""
                            width={100}
                            height={100}
                          />
                        </td>
                        <td className="whitespace-nowrap py-4">{item.title}</td>
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
      </Suspense>
    </div>
  );
};

export default Articles;
