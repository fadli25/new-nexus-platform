"use client";

import Card from "@/components/Card";
import { FreelacerApply } from "@/lib/NexusProgram/escrow/freelacerApply";
import { getEscrowInfo } from "@/lib/NexusProgram/escrow/utils.ts/getEscrowInfo";
import { get_userr_info } from "@/lib/NexusProgram/escrow/utils.ts/get_userr_info";
import { USER_PREFIX } from "@/lib/constants/constants";
import { inputStyle } from "@/lib/styles/styles";
import { formatTime, timeLeft } from "@/lib/utils/time_formatter";
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
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function page() {
  const [open, setOpen] = useState(false);
  const [telegram, setTelegram] = useState<string>("");

  function handleCloseModal() {
    setOpen(false);
  }

  function handleOpenModal() {
    setOpen(true);
  }

  const [escrowInfo, setEscrowInfo] = useState<any>();
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();
  const pathname = usePathname();

  const getEscrowInfos = async () => {
    try {
      // const address = searchParams.get("escrow");
      console.log(pathname);
      const address = pathname.replace("/escrow/", "");
      const escrow = new web3.PublicKey(address);
      const info = await getEscrowInfo(anchorWallet, connection, escrow);

      const founder_info = await get_userr_info(
        anchorWallet,
        connection,
        info!.founder
      );
      info!.escrow = escrow;

      const PROGRAM_ID = new web3.PublicKey(
        "3GKGywaDKPQ6LKXgrEvBxLAdw6Tt8PvGibbBREKhYDfD"
      );

      const [freelancer] = web3.PublicKey.findProgramAddressSync(
        [anchorWallet!.publicKey.toBuffer(), Buffer.from(USER_PREFIX)],
        PROGRAM_ID
      );

      const freelancer_info = await get_userr_info(
        anchorWallet,
        connection,
        freelancer
      );

      info!.founderInfo = founder_info;
      info!.freelancer = freelancer_info;
      console.log(info, "info", formatTime(info!.deadline));
      setEscrowInfo(info);
      setTelegram(freelancer_info!.telegramId);
    } catch (e) {
      console.log(e);
    }
  };

  const apply = async () => {
    try {
      if (telegram.length == 0) {
        return console.log("need telegram first");
      }

      const tx = await FreelacerApply(
        anchorWallet,
        connection,
        wallet,
        escrowInfo.escrow,
        telegram
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!anchorWallet) return;
    getEscrowInfos();
  }, [anchorWallet]);

  const router = useRouter();

  const links = (link: string) => {
    window.open(link, "_blank");
  };
  const [showDescription, setShowDescription] = useState(false);

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
              <div className="flex-1">
                {escrowInfo && escrowInfo.contractName !== ""
                  ? escrowInfo.contractName
                  : "Build a team dashboard"}
              </div>

              <Stack flexDirection="row" gap={1}>
                <Image src={coin} alt="coin" className="w-5" />
                <div>{escrowInfo ? Number(escrowInfo.amount) : "--"}</div>
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
                  {escrowInfo && escrowInfo.deadline
                    ? timeLeft(escrowInfo.deadline)
                    : "2d 24hrs 30min"}
                </div>
              </div>
            </Stack>
          </Card>
        </div>

        <div className="grid sm:grid-cols-5 gap-4 mt-5">
          <Card className="!p-0 sm:col-span-2 overflow-hidden ">
            <div className="flex sm:flex-col p-2 sm:p-0">
              <Image
                src={dragon}
                alt="dragon"
                className="w-[100px] p-1 sm:p-0 sm:w-full rounded-xl object-cover object-center"
              />

              <Stack py={2} spacing={3} px={2}>
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div className="text-base sm:text-xl font-[500] line-clamp-1">
                    {escrowInfo ? escrowInfo.founderInfo.name : "--"}
                  </div>
                  <span
                    onClick={() => links(escrowInfo.founderInfo.twitter)}
                    className="hidden sm:block"
                  >
                    <XIcon className="text-xl" />
                  </span>
                </Stack>

                <div className="flex gap-4 items-center">
                  <Button
                    onClick={() => escrowInfo && links(escrowInfo.telegramLink)}
                    variant="contained"
                    className="!text-[10px] sm:!text-sm !px-10 !font-semibold !py-2 !capitalize !bg-second !w-fit"
                  >
                    Start Chat
                  </Button>

                  <span
                    onClick={() => links(escrowInfo.founderInfo.twitter)}
                    className="sm:hidden"
                  >
                    <XIcon className="text-sm" />
                  </span>
                </div>
              </Stack>
            </div>
          </Card>

          <div className="sm:col-span-3">
            <Card width="lg" className=" h-72">
              <div className="text-sm text-textColor">Description</div>

              <div className="p-1 mt-3">
                <div
                  className="line-clamp-5 text-5 text-[13px] leading-7 cursor-pointer h-14"
                  onClick={() => setShowDescription(true)}
                >
                  {escrowInfo && escrowInfo.description !== ""
                    ? escrowInfo.description
                    : "--"}
                </div>
              </div>
            </Card>

            <Card className="mt-4">
              <span onClick={() => links(escrowInfo.founderInfo.twitter)}>
                <Card className="mt-4 text-base">Link to materials</Card>
              </span>

              <Stack alignItems="center" mt={4}>
                <Button
                  variant="contained"
                  onClick={handleOpenModal}
                  className="!text-xs sm:!text-sm !font-semibold !bg-main !text-second !w-fit !normal-case !py-3 !px-8"
                >
                  Apply to work
                </Button>
              </Stack>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleCloseModal}
        className="grid place-items-center"
      >
        <Card width="xs">
          <div className="p-5">
            <div className="text-sm">
              <span className="text-red-600">Hint: </span>
              People who fill up their profile properly are likely to get hire
              <br />
              Go to{" "}
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                "My Profile"
              </span>
            </div>

            <div className="mt-10 w-full">
              <label>Telegram Link for communication:</label>
              <input
                value={telegram}
                className={`${inputStyle} w-full`}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>

            <Stack mt={5} alignItems="center">
              <Button
                onClick={() => apply()}
                variant="contained"
                className="!text-xs sm:!text-sm !font-semibold !normal-case !py-2 !text !px-10 !bg-main !text-second !w-fit"
              >
                Apply to work
              </Button>
            </Stack>
          </div>
        </Card>
      </Modal>

      <Modal
        open={showDescription}
        onClose={() => setShowDescription(false)}
        className="grid place-items-center"
      >
        <Card width="md" className=" max-h-screen overflow-y-hidden relative">
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => setShowDescription(false)}
          >
            <IoMdClose className="text-2xl" />
          </div>

          <div className="text-base font-[500]">Description</div>

          <p className="mt-5 p-2 text-sm leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Card>
      </Modal>
    </div>
  );
}
