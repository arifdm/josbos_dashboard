"use client";

import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

const navigation = {
  pages: [
    { name: "Dashboard", href: "/mainboard" },
    { name: "Pesanan Masuk", href: "/pesananMasuk" },
    { name: "Pesanan Dibatalkan", href: "/pesananDibatalkan" },
    { name: "Pesanan Selesai", href: "/pesananSelesai" },
    { name: "User Pemesan", href: "/users" },
    { name: "Mitra Spesialis", href: "/mitra" },
    { name: "Artikel", href: "/articles" },
    { name: "Promo", href: "/promos" },
    { name: "Kota", href: "/cities" },
    { name: "Kendaraan", href: "/vehicles" },
    { name: "Layanan & Tarif", href: "/services" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavDashboard() {
  const [open, setOpen] = useState(false);
  const { status, data: session } = useSession();
  // console.log("SESSION: ", session?.user, status);

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-[#FCB92D]">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md p-2 text-white lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/mainboard">
                  <Image
                    className="h-8 w-auto rounded max-w-full align-middle border-none"
                    width={80}
                    height={80}
                    src="/logoDashboard.png"
                    alt="Logo"
                    priority
                  />
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="#" className="group -m-2 flex items-center p-2">
                    {status === "authenticated" ? (
                      <Image
                        className="h-8 w-auto rounded-full max-w-full align-middle border-none"
                        width={70}
                        height={70}
                        src={session?.user?.image}
                        alt="Logo"
                      />
                    ) : (
                      <UserCircleIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-200 group-hover:text-white"
                        aria-hidden="true"
                      />
                    )}
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                      {session?.user?.name}
                    </span>
                  </Link>
                </div>
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    onClick={async () => await signOut()}
                    className="text-gray-700 text-sm font-normal border border-slate-700 rounded-full px-4 py-0.5 hover:bg-slate-500 hover:text-slate-100 hover:border-slate-500 transition-color duration-400 delay-100 ease-in-out"
                  >
                    Sign Out
                  </button>
                  {/* <div class="dropdown inline-block">
                    <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                      <span class="mr-1">Dropdown</span>
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                      </svg>
                    </button>
                    <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                      <li class="">
                        <a
                          class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                          href="#"
                        >
                          One
                        </a>
                      </li>
                      <li class="">
                        <a
                          class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                          href="#"
                        >
                          Two
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
