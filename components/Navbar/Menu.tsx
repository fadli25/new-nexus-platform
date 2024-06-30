"use client";

import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface NavigationType {
  name: string;
  path: string;
}

const navigation: NavigationType[] = [
  { name: "Home", path: "/escrow" },
  { name: "My Escrows", path: "/escrow/myescrow" },
  { name: "Ongoing Escrows", path: "/escrow/ongoing" },
];

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();

  console.log(path.slice(0, 7));

  return (
    <div className="relative px-4 bg-white text-black text-sm sm:text-lg font-[500]">
      <div className="flex justify-center gap-6 items-center mx-auto max-w-3xl">
        {navigation.map((el, i) => (
          <div
            className={`${
              path === el.path && "!border-black !border-b-4 !font-semibold "
            } !flex-1 text-center`}
            key={i}
          >
            <Button
              variant="text"
              onClick={() => router.push(el.path)}
              className={`!py-4  !text-second !normal-case !text-base !w-full`}
            >
              {el.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
