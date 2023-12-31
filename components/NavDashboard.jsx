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
    { name: "Articles", href: "/articles" },
    { name: "Promos", href: "/promos" },
    { name: "Vehicles", href: "/vehicles" },
    { name: "Services & Prices", href: "/services" },
    { name: "Pemesan", href: "/users" },
    { name: "Mitra", href: "/mitra" },
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
                className="relative rounded-md bg-yellow-400 p-2 text-white lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="./">
                  <Image
                    className="h-8 w-auto rounded max-w-full align-middle border-none"
                    width={80}
                    height={80}
                    src="/logoDashboard.png"
                    alt="Logo"
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-700"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

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
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    onClick={async () => await signOut()}
                    className="text-red-500 hover:text-gray-700 text-sm font-bold"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
