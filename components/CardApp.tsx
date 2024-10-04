"use client";

import DragonImg from "@/public/dragon.jpg";
import { Button, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { escape } from "querystring";
import React from "react";

export default function CardApp({
  title,
  role,
  type,
  approve,
  escrow,
  apply,
  link,
  type2 = false,
  startProject,
}: any) {
  const links = (_link: string) => {
    window.open(_link, "_blank");
  };

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
            {title}
          </div>
          <div className="text-xs text-textColor font-[300] line-clamp-1">
            {role}
          </div>
        </Stack>
      </Stack>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            if (title == "Chat") {
              links(link);
            } else {
              approve(escrow, apply);
            }
          }}
          variant="contained"
          className="!normal-case !text-[11px] !text-white  !bg-second !px-4  !pt-2"
        >
          {type}
        </Button>

        {type2 && (
          <Button
            variant="outlined"
            onClick={() => links(link)}
            className="!normal-case !text-[11px] !border !border-black !text-second !px-4 !pt-2"
          >
            {type2}
          </Button>
        )}
      </div>
    </Stack>
  );
}
