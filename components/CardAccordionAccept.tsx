import CardAppAccept from "@/components/CardAppAccept";
import { approvePayment } from "@/lib/NexusProgram/escrow/ApprovePayment";
import { rejectFreelancer } from "@/lib/NexusProgram/escrow/rejectFreelancer";
import { Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import React from "react";
import Card from "./Card";
import { FaLock, FaUnlock } from "react-icons/fa6";
import CardAnimation from "./CardAnimation";

export default function CardAccordionAccept({
  children,
  data,
  title,
  type,
  escrowInfo,
  showTerminate,
  cancel,
  showApprove,
  reject,
  showReject,
  closeReject,
}: any) {
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
      );
    } catch (e) {
      console.log(e);
    }
  };

  const RejectSubmit = async () => {
    try {
      const tx = await rejectFreelancer(
        anchorWallet,
        connection,
        wallet,
        escrowInfo.escrow,
        data[0].pubkey
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Card className="rounded-b-none border-b-2 !py-4 !pb-2">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="text-base sm:text-lg font-myanmar text-[#696969] font-semibold">
            {title}
          </div>
          <Stack flexDirection="row" gap={1}>
            {children}
          </Stack>
        </Stack>
      </Card>
      <Card className="rounded-t-none min-h-24 w-[98%] mx-auto !px-0 h-[360px]">
        <Stack spacing={2} className="h-[130px] escrow overflow-y-scroll px-5">
          {data.map((el: any, i: number) => (
            <CardAppAccept
              key={i}
              title={el.userName}
              role={el.role}
              type={type}
              reject={RejectSubmit}
              approve={approveSubmit}
              escrow={el.escrow}
              apply={el.pubkey}
              escrowInfo={escrowInfo}
            />
          ))}
        </Stack>

        <div className="px-5">
          <div className="w-full p-4 text-center rounded-lg border border-black/30 mt-9 text-xs ">
            Contract has started <span className="font-semibold">Manay</span>{" "}
            will make submission when done
          </div>

          <motion.button
            disabled={!showTerminate}
            className="w-full cursor-default mt-2 py-2 relative text-center text-base font-[500] rounded-lg text-black shadow-sm border border-black disabled:opacity-25"
          >
            View Submission
            <div className="absolute right-3 top-[11px] text-xl">
              {!showTerminate ? <FaLock /> : <FaUnlock />}
            </div>
          </motion.button>

          {showTerminate && (
            <CardAnimation className="grid grid-cols-2 mt-4 gap-2">
              <Button
                variant="contained"
                onClick={showApprove}
                className="!normal-case !text-sm !py-3 !text-black !bg-green-500 !col-span-1 !rounded-md"
              >
                Approve
              </Button>

              <Button
                variant="contained"
                onClick={showReject}
                className="!normal-case !text-sm !py-3 !bg-red-600 !text-white !col-span-1 !rounded-md"
              >
                Reject
              </Button>
            </CardAnimation>
          )}

          {reject && (
            <CardAnimation className="grid grid-cols-2 mt-4 gap-2">
              <Button
                variant="contained"
                onClick={showApprove}
                className="!normal-case !text-sm !py-3 !text-black !bg-green-500 !col-span-1 !rounded-md"
              >
                Request New Submission
              </Button>

              <Button
                variant="contained"
                onClick={cancel}
                className="!normal-case !text-sm !py-3 !bg-red-600 !text-white !col-span-1 !rounded-md"
              >
                Dispute and Request Refund
              </Button>
            </CardAnimation>
          )}
        </div>
      </Card>
    </div>
  );
}
