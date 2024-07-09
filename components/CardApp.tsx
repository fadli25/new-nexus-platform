"use client";

import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import DragonImg from "@/public/dragon.jpg";
import { useRouter } from "next/navigation";

export default function CardApp({ title, role, type }: any) {
  const router = useRouter();
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Image
          src={DragonImg}
          alt="dragon"
          className="w-20 h-14 rounded-lg object-cover object-center"
        />
        <Stack spacing={0.4}>
          <div
            className="text-base cursor-pointer font-[400] line-clamp-1"
            onClick={() => router.push("/escrow/myescrow/name/name")}
          >
            {title ? title : "Manay"}
          </div>
          <div className="text-xs text-textColor font-[300] line-clamp-1">
            {role ? role : "Community Manager"}
          </div>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        className="!normal-case !text-xs !text-white !bg-second !px-5 !py-2 !h-fit"
      >
        {type}
      </Button>
    </Stack>
  );
}
