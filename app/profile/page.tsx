"use client";

import Card from "@/components/Card";
import { Button, Stack, Switch } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import dragon from "@/public/dragon.svg";
import { motion } from "framer-motion";
import { cardStyle } from "@/lib/styles/styles";

export default function page() {
  const menu = ["Profile Summary", "Nexus Jobs", "Payment History"];

  const menu1 = ["Level of expertise", "Payment rate"];

  const [tap, setTap] = useState(menu[0]);
  const address = "HxVh4haF3Uu2QibqQqinEDXGxx5ThtARA24vaMfhSCaW";

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
      <div className="col-span-1 md:col-span-2">
        <Card className="!p-0">
          <div className="relative">
            <div className="absolute bottom-4 right-4">
              <Button
                variant="contained"
                className="!text-xs !text-black !bg-white !normal-case !font-semibold !font-mynamarButton"
              >
                Change PFP
              </Button>
            </div>
            <Image
              src={dragon}
              alt="dragon"
              className="w-full rounded-xl object-cover object-center"
            />
          </div>

          <div className="px-4 pb-4">
            <Stack pt={2} spacing={3}>
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
              py={1.6}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div className="text-base text-black/80">Content Writer</div>

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

            <div className=" text-xs line-clamp-1">
              {address !== null ? address : "No address"}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 mt-4 ">
          {menu1.map((el, i) => (
            <div key={i} className={`${cardStyle} !py-4`}>
              {el}
            </div>
          ))}
        </div>
      </div>

      <div className="cls-span-1 md:col-span-3">
        <Card className="rounded-b-none !px-0 border-b-2 pb-0" width="lg">
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
                  className={`!text-black/70 !normal-case !text-sm sm:!text-base !py-2 !px-4 ${
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
            <Card className="rounded-t-none pb-2" width="lg">
              <Stack
                className="text-lg sm:text-xl font-[500]"
                flexDirection="row"
                gap={6}
                justifyContent="center"
                alignContent="center"
                py={4}
              >
                <div>0 Ongoing Jobs</div>
                <div>0 Jobs Completed</div>
              </Stack>

              <div className="px-1 mt-4 text-xs text-textColor font-[500]">
                0 Leaderboard Ratings
              </div>
            </Card>

            <Card className="mt-6" width="lg">
              <div className="text-xs text-textColor">Profile Overview</div>
              <div className="text-sm leading-6 line-clamp-[6] mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-[18px] px-1">
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

        <Stack
          mt={4}
          justifyContent="center"
          alignItems="center"
          gap={2}
          flexDirection="row"
        >
          <Button
            variant="contained"
            className="!text-sm !text-black !bg-main !normal-case !font-mynamarButton"
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            className="!text-sm !text-black !bg-main !normal-case !font-mynamarButton"
          >
            Save
          </Button>
        </Stack>
      </div>
    </div>
  );
}
