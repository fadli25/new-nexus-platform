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
  { name: "Freelance Contracts", path: "/escrow/ongoing" },
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
              !path.startsWith(navigation[1].path) &&
              !path.startsWith(navigation[2].path) &&
              el.name === "Home" &&
              "!border-black !border-b-4"
            } 
            ${
              path.startsWith(el.path) &&
              el.name !== "Home" &&
              "!border-black !border-b-4"
            }
            !flex-1 text-center `}
            key={i}
          >
            <Button
              variant="text"
              onClick={() => router.push(el.path)}
              className={`!py-4 !text-second !normal-case !tracking-[0.8px] !text-sm sm:!text-base !font-[600] !w-full`}
            >
              <div className="line-clamp-1">{el.name}</div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
