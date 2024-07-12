"use client";

import Log from "@/components/Log";
import { Stack } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const { publicKey } = useWallet();
  useEffect(() => {
    if (publicKey) {
      router.push("/");
    }
  }, [publicKey]);

  return (
    <div>
      <Log />
    </div>
  );
}
