import { Stack } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

export default function Log() {
  return (
    <Stack mt={8} alignItems="center">
      <WalletMultiButton />
    </Stack>
  );
}
