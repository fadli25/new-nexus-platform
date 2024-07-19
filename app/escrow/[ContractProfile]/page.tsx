"use client";

import Card from "@/components/Card";
import { Button, Container, Modal, Stack } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import Image from "next/image";
import React, { useState } from "react";
import coin from "@/public/coin.svg";
import dragon from "@/public/dragon.svg";
import { useRouter } from "next/navigation";
import { inputStyle } from "@/lib/styles/styles";
import { IoMdClose } from "react-icons/io";

export default function page() {
  const [open, setOpen] = useState(false);

  function handleCloseModal() {
    setOpen(false);
  }

  function handleOpenModal() {
    setOpen(true);
  }

  const router = useRouter();

  const [showDescription, setShowDescription] = useState(false);

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
                <Image src={coin} alt="coin" className="w-5" />
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
          <Card className="!p-0 sm:col-span-2 overflow-hidden ">
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

              <Button
                variant="contained"
                className="!text-sm !px-10 !font-semibold !py-2 !capitalize !bg-second !w-fit"
              >
                Start Chat
              </Button>
            </Stack>
          </Card>

          <div
            className="sm:col-span-3 cursor-pointer"
            onClick={() => setShowDescription(true)}
          >
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

            <Card className="mt-4 text-base">Link to materials</Card>

            <Stack alignItems="center" mt={4}>
              <Button
                variant="contained"
                onClick={handleOpenModal}
                className="!text-xs sm:!text-sm !font-semibold !bg-main !text-second !w-fit !normal-case !py-3 !px-8"
              >
                Apply to work
              </Button>
            </Stack>
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
              <input className={`${inputStyle} w-full`} />
            </div>

            <Stack mt={5} alignItems="center">
              <Button
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
