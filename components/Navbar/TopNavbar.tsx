"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Profile from "@/public/profile.png";
import { Button, Stack } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ReactNode, useEffect } from "react";

interface NavigationType {
  name: ReactNode | string;
  href: string;
  current: boolean;
}

let navigation: NavigationType[] = [
  { name: "Nexus Explore", href: "/", current: false },
  { name: "Documents", href: "/documents", current: false },
  {
    name: (
      <Stack direction="row" gap={0.4} alignItems="center">
        <HelpOutlineIcon className="text-[16px]" />
        <div>Support</div>
      </Stack>
    ),
    href: "/support",
    current: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

// useEffect(() => {
//   navigation["Domcuments"].current = true;
// }, []);

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-second">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image className="h-11 w-auto" src={Logo} alt="logo" />
                </div>
                <div className="hidden sm:block sm:absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-55%] z-30">
                  <div className="flex space-x-4">
                    {navigation.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <div className="flex items-center gap-1 line-clamp-1">
                          {item.name}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Button
                  className="!text-second !bg-main !capitalize !font-[600] !hidden sm:!block"
                  variant="contained"
                >
                  Connect Wallet
                </Button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm ring-2 ring-main">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full object-cover object-center"
                        src={Profile}
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <div className="flex items-center gap-3 px-3 py-2">
                            <Image
                              className="h-9 w-9 object-cover object-center rounded-full"
                              src={Profile}
                              alt=""
                            />
                            <div className="text-2xl text-second font-semibold">
                              Zetsu
                            </div>
                          </div>
                        )}
                      </MenuItem>

                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 mt-2"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item, i) => (
                <DisclosureButton
                  key={i}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}

              <Button
                className="!text-second !bg-main !capitalize !font-[600] "
                variant="contained"
              >
                Connect Wallet
              </Button>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
