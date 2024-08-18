import CardApp from "@/components/CardApp";
import { approveFreelancer } from "@/lib/NexusProgram/escrow/approveFreelancer";
import { Stack } from "@mui/material";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import React from "react";
import Card from "./Card";

export default function CardAccordion({
  children,
  data,
  title,
  type,
  link,
  startProject,
}: any) {
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const approve = async (escrow: any, apply: any) => {
    try {
      console.log(escrow.toBase58());

      const tx = await approveFreelancer(
        anchorWallet,
        connection,
        wallet,
        apply,
        escrow
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Card className="rounded-b-none border-b-2 py-4">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="text-base sm:text-[20px] text-[#696969] font-[500]">
            {title}
          </div>
          <Stack flexDirection="row" gap={1}>
            {children}
          </Stack>
        </Stack>
      </Card>
      <Card className="rounded-t-none min-h-24 w-[98%] mx-auto h-[360px] escrow overflow-y-scroll">
        <Stack spacing={2}>
          {data.map((el: any, i: number) => (
            <CardApp
              key={i}
              title={el.userName}
              role={el.role}
              type={type}
              approve={approve}
              escrow={el.escrow}
              apply={el.pubkey}
              link={link}
              type2="Start Contract"
              startProject={startProject}
            />
          ))}
        </Stack>
      </Card>
    </div>
  );
}
