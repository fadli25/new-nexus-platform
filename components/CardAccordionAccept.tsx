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
  openDispute,
  closeReject,
  font_size = "text-base",
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

  console.log({ data });
  return (
    <div>
      <Card className="rounded-b-none border-b-2 !py-4 !pb-2">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div
            className={`${font_size} sm:text-lg font-myanmar text-[#9c9595] font-semibold`}
          >
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
          {data.length > 1 ? (
            <div className="w-full p-4 text-center rounded-lg border border-black/30 mt-9 text-xs ">
              Contract has started{" "}
              <span className="font-semibold">{`${data[0].userName}`}</span>{" "}
              will make submission when done
            </div>
          ) : (
            <div className="w-full p-4 text-center rounded-lg border border-black/30 mt-9 text-xs ">
              Select Freelancer to start contract with
            </div>
          )}

          <motion.button
            disabled={!showTerminate}
            className="w-full cursor-default mt-2 pt-2 pb-4 relative text-center text-base font-[500] rounded-lg disabled:opacity-25 mynamarButton"
            style={{
              boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
          >
            <div className="-mb-2" style={{ fontFamily: "mynamarButton" }}>
              View Submission
            </div>
            <div className="absolute right-3 top-[9px] text-xl">
              {!showTerminate ? <FaLock /> : <FaUnlock />}
            </div>
          </motion.button>

          {/* {showTerminate && (
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
          )} */}

          {showTerminate && (
            <CardAnimation className="grid grid-cols-2 mt-4 gap-2">
              <Button
                variant="contained"
                onClick={cancel}
                className="!normal-case !text-xs !py-3 !text-white !bg-red-700 !col-span-1 !rounded-md"
              >
                Cancel Contract Termination
              </Button>

              <Button
                variant="contained"
                onClick={showApprove}
                className="!normal-case !text-xs !py-3 !bg-black !text-white !col-span-1 !rounded-md"
              >
                Dispute and Request termination
              </Button>
            </CardAnimation>
          )}

          {openDispute && (
            <CardAnimation>
              <Button
                variant="contained"
                className="!text-sm !mt-4 !w-full !text-white !bg-black !normal-case !px-10 !py-2"
              >
                Chat with Moderator
              </Button>
            </CardAnimation>
          )}
        </div>
      </Card>
    </div>
  );
}
