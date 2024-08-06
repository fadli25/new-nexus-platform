"use client";

import Card from "@/components/Card";
import { fTarminat } from "@/lib/NexusProgram/escrow/Fterminat";
import { submit } from "@/lib/NexusProgram/escrow/submit";
import { getEscrowInfo } from "@/lib/NexusProgram/escrow/utils.ts/getEscrowInfo";
import { get_userr_info } from "@/lib/NexusProgram/escrow/utils.ts/get_userr_info";
import coin from "@/public/coin.svg";
import dragon from "@/public/dragon.svg";
import XIcon from "@mui/icons-material/X";
import { Button, Container, Modal, Stack } from "@mui/material";
import { web3 } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [escrow_info, setEscrowInfo] = useState<any>();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function handleCloseModal() {
    setOpen(false);
  }

  function handleOpenModal() {
    setOpen(true);
  }

  const [showSubmission, setShowSubmission] = useState(false);

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  const submission = async () => {
    try {
      const address = pathname.replace("/escrow/ongoing/", "");
      const escrow = new web3.PublicKey(address);

      const tx = await submit(anchorWallet, connection, wallet, escrow);
      // setShowSubmission(true);
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  };

  const Tarminat = async () => {
    try {
      const address = pathname.replace("/escrow/ongoing/", "");
      const escrow = new web3.PublicKey(address);

      const tx = await fTarminat(anchorWallet, connection, wallet, escrow);
      // setShowSubmission(true);
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  };

  const getEscrowInfos = async () => {
    try {
      // const address = searchParams.get("escrow");
      console.log(pathname);
      const address = pathname.replace("/escrow/ongoing/", "");
      const escrow = new web3.PublicKey(address);
      const info = await getEscrowInfo(anchorWallet, connection, escrow);

      const founder_info = await get_userr_info(
        anchorWallet,
        connection,
        info!.founder
      );

      info!.founderInfo = founder_info;

      setEscrowInfo(info);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!anchorWallet) return;
    getEscrowInfos();
  }, [anchorWallet]);

  const links = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-8">
          <Card className="!py-4 !col-span-1 sm:!col-span-3" width="lg">
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              className="text-base sm:text-xl font-[500] h-12"
            >
              <div className="flex-1">Build a team dashboard</div>

              <Stack flexDirection="row" gap={1}>
                <Image src={coin} alt="coin" className="w-5" />
                <div>{escrow_info ? Number(escrow_info.amount) : "--"}</div>
              </Stack>
            </Stack>
          </Card>

          <Card className="!py-4 !px-4 col-span-1 sm:max-w-72 grid place-items-center">
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <div className="text-sm font-[500]">Private</div>
              <div className="flex flex-col space-y-2">
                <div className="text-xs text-textColor">Deadline</div>
                <div className="text-base font-semibold line-clamp-1">
                  2d 24hrs 30min
                </div>
              </div>
            </Stack>
          </Card>
        </div>

        <div className="grid sm:grid-cols-5 gap-4 mt-5">
          <Card className="!p-0 sm:col-span-2 overflow-hidden h-fit">
            <Image
              src={dragon}
              alt="dragon"
              className="w-full rounded-xl object-cover object-center"
            />

            <Stack py={2} spacing={3} px={2}>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <div className="text-xl font-[500] line-clamp-1">
                  {escrow_info ? escrow_info.founderInfo.name : "--"}
                </div>
                {escrow_info && escrow_info.founderInfo.twitter.length > 0 && (
                  <span
                    onClick={() =>
                      links(escrow_info.founderInfo.twitter.length)
                    }
                  >
                    <XIcon className="text-xl" />
                  </span>
                )}
              </Stack>

              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="end"
              >
                {escrow_info &&
                  escrow_info.founderInfo.telegramId.length > 0 && (
                    <Button
                      onClick={() => links(escrow_info.founderInfo.telegramId)}
                      variant="contained"
                      className="!text-sm !px-10 !py-2 !capitalize !font-semibold !bg-second !w-fit"
                    >
                      Start Chat
                    </Button>
                  )}

                <div className="text-[11px] font-[300] line-clamp-1 py-1">
                  0 Leaderboard rating
                </div>
              </Stack>
            </Stack>
          </Card>

          <div className="sm:col-span-3">
            <Card width="lg" className=" h-fit">
              <div className="text-sm text-textColor">Description</div>

              <div className="p-3 mt-3">
                <div className="line-clamp-5 text-5 text-[13px] leading-7">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
              </div>
            </Card>
            {escrow_info && (
              <span onClick={() => links(escrow_info.materials)}>
                <Card className="mt-4 text-sm py-4">Link to materials</Card>
              </span>
            )}
            {escrow_info && escrow_info.status == 2 && (
              <Card className="mt-4 !py-3">
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <div className="text-sm text-textColor">Submission</div>
                  <Button
                    variant="contained"
                    className="!text-xs !bg-second !px-4 !py-2 !rounded-md !font-semibold !normal-case !text-white"
                    onClick={() => submission()}
                  >
                    Submission
                  </Button>
                </Stack>
              </Card>
            )}

            {
              escrow_info && escrow_info.status == 4 &&
              (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 500,
                  }}
                  className="px-4 mt-4"

                >
                  <div className="text-xs text-black font-[200]">
                    Your submission was rejected, you can either dispute or Terminate
                  </div>

                  <Stack
                    flexDirection="row"
                    mt={4}
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      variant="contained"
                      className="!text-xs sm:!text-sm !bg-second !px-4 !font-semibold !py-2 !rounded-md !normal-case !text-white"
                    >
                      Dispute
                    </Button>

                    <Button
                      variant="contained"
                      className="!text-xs sm:!text-sm !bg-second !px-4 !font-semibold !py-2 !rounded-md !normal-case !text-white"
                      onClick={() => Tarminat()}
                    >
                      Terminate
                    </Button>
                  </Stack>
                </motion.div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
