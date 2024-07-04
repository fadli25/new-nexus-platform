"use client";

import Card from "@/components/Card";
import { Button, Container, Modal, Stack } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import Image from "next/image";
import React, { useState } from "react";
import coin from "@/public/coin.svg";
import dragon from "@/public/dragon.svg";
import { motion } from "framer-motion";

export default function page() {
  const [open, setOpen] = useState(false);

  function handleCloseModal() {
    setOpen(false);
  }

  function handleOpenModal() {
    setOpen(true);
  }

  const [showSubmission, setShowSubmission] = useState(false);

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4 pt-8">
          <Card className="!py-4" width="lg">
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              className="text-xl font-[500] h-12"
            >
              <div className="line-clamp-1">Build a team dashboard</div>

              <Stack flexDirection="row" gap={1}>
                <Image src={coin} alt="coin" className="w-6" />
                <div>3000</div>
              </Stack>
            </Stack>
          </Card>

          <Card className="!py-4 col-span-1 sm:max-w-72">
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <div className="text-lg">Private</div>
              <div>
                <div className="text-sm text-textColor">Deadline</div>
                <div className="text-lg font-semibold line-clamp-1">
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
                  Zetsu | The shaman king
                </div>

                <XIcon className="text-xl" />
              </Stack>

              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="end"
              >
                <Button
                  variant="contained"
                  className="!text-sm !px-10 !py-2 !capitalize !bg-second !w-fit"
                >
                  Start Chat
                </Button>

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

            <Card className="mt-4 text-sm py-4">Link to materials</Card>

            <Card className="mt-4 !py-3">
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <div className="text-sm text-textColor">Submission</div>
                <Button
                  variant="contained"
                  className="!text-xs !bg-second !px-4 !py-2 !rounded-md !normal-case !text-white"
                  onClick={() => setShowSubmission(true)}
                >
                  Submission
                </Button>
              </Stack>
            </Card>

            {showSubmission && (
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
                  Your submission was rejected, you can either dispute or make a
                  new submission
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
                    className="!text-xs sm:!text-sm !bg-second !px-4 !py-2 !rounded-md !normal-case !text-white"
                  >
                    Dispute
                  </Button>

                  <Button
                    variant="contained"
                    className="!text-xs sm:!text-sm !bg-second !px-4 !py-2 !rounded-md !normal-case !text-white"
                    onClick={() => setShowSubmission(false)}
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
