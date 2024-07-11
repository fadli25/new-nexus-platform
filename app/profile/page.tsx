"use client";

import Card from "@/components/Card";
import { Button, Stack, Switch } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import coin from "@/public/coin.svg";
import dragon from "@/public/dragon.svg";
import XIcon from "@mui/icons-material/X";
import { motion } from "framer-motion";
import { TiMessages } from "react-icons/ti";
import { FaListUl, FaStar, FaVideo } from "react-icons/fa";
import { buttonType } from "@/lib/types/types";
import { cardStyle } from "@/lib/styles/styles";

const buttons: buttonType[] = [
  { title: "Message", icon: <TiMessages /> },
  { title: "Shedule Interview", icon: <FaVideo /> },
  { title: "Review", icon: <FaStar /> },
  { title: "Add to watchlist", icon: <FaListUl /> },
];

export default function page() {
  const menu = ["Profile Summary", "Nexus Jobs", "Payment History"];

  const [tap, setTap] = useState(menu[0]);
  const address = "HxVh4haF3Uu2QibqQqinEDXGxx5ThtARA24vaMfhSCaW";

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
      <div className="col-span-1 md:col-span-2">
        <Card className="p-0">
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
              <div className="text-lg font-[500] line-clamp-1">
                Zetsu | The shaman king
              </div>
            </Stack>
          </Stack>

          <Stack
            py={1}
            px={2.5}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div className="text-lg text-black/80">Content Writer</div>

            <Stack
              flexDirection="row"
              gap={0.5}
              alignItems="center"
              justifyContent="space-between"
              className="text-xs"
            >
              <div className="text-textColor">Open to work</div>
              <Switch color="success" />
            </Stack>
          </Stack>

          <div className="p-4 text-xs line-clamp-1">
            {address !== null ? address : "No address"}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 mt-4 ">
          {buttons.map((bt, index) => (
            <motion.button
              whileTap={{ scale: 0.98 }}
              key={index}
              className="text-sm"
            >
              <Card>
                <Stack
                  flexDirection="row"
                  gap={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <div className="text-lg">{bt.icon}</div>

                  <div className="line-clamp-1">{bt.title}</div>
                </Stack>
              </Card>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="cls-span-1 md:col-span-3">
        <Card className="rounded-b-none px-0 border-b-2 pb-0">
          <Stack flexDirection="row">
            {menu.map((el, i) => (
              <div
                key={i}
                className={`${
                  tap === el &&
                  "border-b-4 border-black transition-all duration-300 ease-in-out"
                }`}
              >
                <Button
                  variant="text"
                  disabled={tap === el}
                  onClick={() => setTap(el)}
                  className={`!text-black/70 !normal-case !text-base sm:!text-lg !py-2 !px-4 ${
                    tap === el && "!text-black !font-semibold"
                  }`}
                >
                  {el}
                </Button>
              </div>
            ))}
          </Stack>
        </Card>
        {tap === menu[0] && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 200,
            }}
          >
            <Card className="rounded-t-none pb-2">
              <Stack
                className="text-lg sm:text-2xl font-[500]"
                flexDirection="row"
                gap={6}
                justifyContent="center"
                alignContent="center"
                py={3}
              >
                <div>0 Ongoing Jobs</div>
                <div>0 Jobs Completed</div>
              </Stack>

              <div className="px-1 mt-4 text-xs text-textColor font-[500]">
                0 Leaderboard Ratings
              </div>
            </Card>

            <Card className="mt-5">
              <div className="text-xs text-textColor">Profile Overview</div>
              <div className="text-sm leading-6 line-clamp-5 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 px-1">
              <div className={`${cardStyle}`}>Category</div>
              <div className={`${cardStyle}`}>Country</div>
              <div className={`${cardStyle}`}>Time Zone</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 px-1">
              <div className={`${cardStyle}`}>View Portfolio</div>
              <div className={`${cardStyle}`}>View Resume</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
