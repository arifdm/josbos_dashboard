"use client";

import NavHome from "@/components/NavHome";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DeleteAccount() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleDelete = () => {
    router.push("/");
  };

  return (
    <div className="bg-white">
      {/* <NavHome /> */}

      <div className="mx-auto max-w-4xl py-9 px-8">
        <Link href="/">
          <Image
            className="h-8 w-auto"
            width={135}
            height={32}
            src="/Logo.png"
            alt="Logo"
          />
        </Link>
        <div className="mx-auto max-w-4xl mt-10 py-6">
          <h2 className="text-base text-2xl font-semibold leading-7 text-gray-600">
            Delete Account Confirmation
          </h2>
          <p className="mt-6 leading-6 text-gray-400">
            Apakah Anda yakin ingin menghapus akun Anda? Anda tidak akan dapat
            mengakses akun ini kembali.
          </p>
          <br />
          <br />
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-primary-default" : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-default"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-400">
              Dengan memilih ini, Kamu menyetujui penghapusan akun.
            </Switch.Label>
          </Switch.Group>
          <div className="mt-5">
            {agreed ? (
              <button
                type="submit"
                onClick={handleDelete()}
                className="block w-full rounded-md bg-yellow-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                Hapus Sekarang
              </button>
            ) : (
              <button
                className="block w-full rounded-md bg-gray-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                disabled
              >
                Hapus Sekarang
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
