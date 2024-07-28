import CardAppAccept from "@/components/CardAppAccept";
import { approvePayment } from "@/lib/NexusProgram/escrow/ApprovePayment";
import { rejectFreelancer } from "@/lib/NexusProgram/escrow/rejectFreelancer";
import { Stack } from "@mui/material";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import Card from "./Card";


export default function CardAccordionAccept({ children, data, title, type, escrowInfo }: any) {

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const approveSubmit = async () => {
    try {

      console.log(escrowInfo);
      console.log(data);
      console.log(escrowInfo.escrow.toBase58());
      console.log(escrowInfo.freelancerInfo.address.toBase58());

      const tx = await approvePayment(
        anchorWallet,
        connection,
        wallet,
        escrowInfo.escrow,
        escrowInfo.freelancerInfo.address
      )

    } catch (e) {
      console.log(e);
    }
  }

  const RejectSubmit = async () => {
    try {

      const tx = await rejectFreelancer(anchorWallet, connection, wallet, escrowInfo.escrow, data[0].pubkey);

    } catch (e) {
      console.log(e);
    }
  }

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
      <Card className="rounded-t-none min-h-24 w-[98%] mx-auto">
        <Stack spacing={2}>
          {data.map((el: any, i: number) => (
            <CardAppAccept key={i} title={el.userName} role={el.role} type={type} reject={RejectSubmit} approve={approveSubmit} escrow={el.escrow} apply={el.pubkey} escrowInfo={escrowInfo} />
          ))}
        </Stack>
      </Card>
    </div>
  );
}
