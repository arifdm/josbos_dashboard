import Link from "next/link";
import prisma from "@/prisma/prisma";
import Image from "next/image";
import AddArticle from "./addArticle";
import UpdateArticle from "./updateArticle";
import DeleteArticle from "./deleteArticle";
// import { useSession } from "next-auth/react";

const getArticles = async () => {
  const res = await prisma.article.findMany();
  return res;
};

export const revalidate = 1;

const Articles = async () => {
  const articles = await getArticles();
  // console.log("RES_ARTICLE: ", articles);

  return (
    <div className="bg-white">
      <div className=" w-full grid grid-cols-2">
        <div className="mb-2">
          <AddArticle />
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
                    <th scope="col" className="px-6 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {articles?.map((item, index) => (
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
                      <td>
                        <div className="full flex justify-evenly align-middle">
                          <UpdateArticle article={item} />
                          <DeleteArticle article={item} />
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

export default Articles;
