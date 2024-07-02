"use client";

import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import DragonImg from "@/public/dragon.jpg";
import { useRouter } from "next/navigation";

export default function CardApp({ title, role }: any) {
  const router = useRouter();
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Image
          src={DragonImg}
          onClick={() => router.push("/escrow/myescrow/name/name")}
          alt="dragon"
          className="w-24 h-16 rounded-lg object-cover object-center cursor-pointer"
        />
        <Stack spacing={1}>
          <div className="text-lg line-clamp-1">{title ? title : "Manay"}</div>
          <div className="text-xs text-textColor line-clamp-1">
            {role ? role : "Community Manager"}
          </div>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        className="!normal-case !text-white !font-[400] !bg-second !px-10 !py-2"
      >
        Chat
      </Button>
    </Stack>
  );
}
