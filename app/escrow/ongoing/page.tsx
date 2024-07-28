"use client";

import Card from "@/components/Card";
import CardContract from "@/components/CardContract";
import { getApplyFreelancer } from "@/lib/NexusProgram/escrow/utils.ts/getApplyFreelancer";
import { getFreeLacerEscrow } from "@/lib/NexusProgram/escrow/utils.ts/getFreelacerEscrow";
import { fakeData } from "@/lib/fakedata/Data";
import { Stack } from "@mui/material";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";

export default function page() {

  const [pendingEscrow, setPendingEscrow] = useState<any[]>()
  const [ongoingEscrow, setOngoingEscrow] = useState<any[]>()

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();


  const getPendingEscrow = async () => {
    try {

      const pending = await getApplyFreelancer(anchorWallet, connection, "confirmed");
      console.log("pending");
      console.log(pending);
      setPendingEscrow(pending.filter((p) => p.status != "Success"));
    } catch (e) {
      console.log(e);
    }
  }

  const getOngoingEscrow = async () => {
    try {

      const ongoing = await getFreeLacerEscrow(anchorWallet, connection, "confirmed");
      console.log("ongoing");
      console.log(ongoing);
      setOngoingEscrow(ongoing);
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    if (!anchorWallet) return;
    getOngoingEscrow()
    getPendingEscrow()
  }, [anchorWallet])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center-center w-full py-10 max-w-7xl mx-auto">
        <Card className="pb-10">
          <div className="text-sm text-textColor">Ongoing Projects</div>

          <Stack mt={4} spacing={2.8}>
            {ongoingEscrow && ongoingEscrow.map((el, i) => (
              <CardContract key={i} contractName={el.contractName} amount={Number(el.amount)} deadline={Number(el.deadline)} escrow={el.pubkey.toBase58()} type={3} />
            ))}
          </Stack>
        </Card>

        <Card className="pb-10">
          <div className="text-sm text-textColor">Pending Applications</div>

          <Stack mt={4} spacing={2.8}>
            {pendingEscrow && pendingEscrow.map((el, i) => (
              <CardContract key={i} {...el} type={3} />
            ))}
          </Stack>
        </Card>
      </div>
    </div>
  );
}
