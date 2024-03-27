import Search from "@/components/UI/Search";
import prisma from "@/prisma/prisma";
import moment from "moment";
import { LiaUserCircle } from "react-icons/lia";
import { Rupiah, Truncate } from "@/libs/utils";
import { CheckIcon } from "@heroicons/react/24/outline";
import ApprovePage from "./approve";

const getSaldo = async () => {
  const res = await prisma.saldoSpecialist.findMany({
    select: {
      id: true,
      createdAt: true,
      type: true,
      amount: true,
      saldo: true,
      note: true,
      status: true,
      transaction: true,
      specialists: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
    },
  });
  return res;
};

export const revalidate = 1;

export default async function SaldoMitra() {
  const data = await getSaldo();
  // console.log("RES: ", data);
  const dataApprove = data?.filter((item) => item.status === false);

  return (
    <div className="bg-white">
      {dataApprove.length > 0 && (
        <section id="listSaldo">
          <div className="flex flex-row justify-between items-center">
            <div className="text-xl font-semibold text-primary">
              Topup/Withdraw
            </div>
            <div className="text-sm font-light bg-orange-100 py-0.5 px-4 rounded-sm text-orange-400">
              Silakan proses data di bawah ini...!
            </div>
          </div>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 mb-2">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-200">
                    <tr>
                      <th width="5%" className="px-2 py-4 text-center">
                        #
                      </th>
                      <th width="15%" className="py-4">
                        Tgl Pengajuan
                      </th>
                      <th width="20%" className="py-4">
                        Nama Mitra
                      </th>
                      <th width="30%" className="py-4">
                        Keterangan
                      </th>
                      <th width="10%" className="py-4 text-right">
                        Kategori
                      </th>
                      <th width="10%" className="py-4 text-right">
                        Nilai
                      </th>
                      <th width="10%" className="py-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataApprove.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                      >
                        <td className="py-4 text-center">{index + 1}</td>
                        <td className="py-4 px-2">
                          {moment(item.createdAt).format("DD/MM/YYYY hh:mm")}
                        </td>
                        <td className="py-4">
                          <LiaUserCircle size={30} className="inline" />{" "}
                          <span className="font-bold">
                            {item.specialists?.name}
                          </span>
                        </td>
                        <td className="py-4">{item.note}</td>
                        <td className="py-4 text-right">
                          {item?.type === "increase"
                            ? "Penambahan"
                            : "Penarikan"}
                        </td>
                        <td className="py-4 text-right font-bold text-md">
                          {Rupiah(item?.amount)}
                        </td>
                        <td className="py-4 px-4">
                          <ApprovePage data={item} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="listSaldo" className="mt-8">
        <div className="text-xl mb-7 font-semibold text-primary">
          Saldo Mitra
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 -mt-6">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-200">
                  <tr>
                    <th width="5%" className="px-2 py-4 text-center">
                      #
                    </th>
                    <th width="15%" className="py-4">
                      Tgl Transaksi
                    </th>
                    <th width="20%" className="py-4">
                      Nama Mitra
                    </th>
                    <th width="30%" className="py-4">
                      Keterangan
                    </th>
                    <th width="10%" className="py-4 text-right">
                      Nilai
                    </th>
                    <th width="10%" className="py-4 text-right">
                      Saldo
                    </th>
                    <th width="10%" className="py-4 text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ?.filter((item) => item.status === true)
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-150 dark:hover:bg-neutral-150"
                      >
                        <td className="py-4 text-center">{index + 1}</td>
                        <td className="py-4 px-2">
                          {moment(item.createdAt).format("DD/MM/YYYY hh:mm")}
                        </td>
                        <td className="py-4">
                          <LiaUserCircle size={30} className="inline" />{" "}
                          <span className="font-bold">
                            {item.specialists?.name}
                          </span>
                        </td>
                        <td className="py-4">{item.note}</td>
                        <td className="py-4 text-right">
                          {Rupiah(item?.amount)}
                        </td>
                        <td className="py-4 text-right font-bold text-md">
                          {Rupiah(item?.saldo)}
                        </td>
                        <td className="py-4">
                          <div className="flex justify-center">
                            {item.status ? <CheckIcon width={20} /> : ""}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
