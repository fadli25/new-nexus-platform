"use client";

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
            key={i}
            onClick={() => router.push(el.path)}
            className={`${
              path === el.path && "border-black border-b-[4px] font-semibold"
            } py-4 flex-1 text-center hover:bg-textColor/10 transition-all duration-200 cursor-pointer`}
          >
            {el.name}
          </div>
        ))}
      </div>
    </div>
  );
}
