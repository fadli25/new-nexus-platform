"use client";

import { Stack } from "@mui/material";
import React from "react";
import coin from "@/public/coin.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CardContractType {
  title: string;
  price: number;
  time: number;
}

export default function CardContract({ title, price, time }: CardContractType) {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => router.push(`/escrow/${title}`)}
    >
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        className="p-5 border border-gray-300 rounded-md shadow-md w-full"
      >
        <div className="text-base sm:text-lg line-clamp-1 font-[500]">
          {title ? title : "No Title"}
        </div>

        <Stack spacing={2}>
          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            <div>
              <Image src={coin} alt="coin" className="w-4" />
            </div>
            <div className="font-[600] text-base sm:text-lg">
              {price ? price : "N/A"}
            </div>
          </Stack>

          <div className="text-[11px] text-textColor">
            <span>{time ? time : "N/A"}</span>
            <span> min ago</span>
          </div>
        </Stack>
      </Stack>
    </motion.button>
  );
}
