"use client";

import Card from "@/components/Card";
import CardContract from "@/components/CardContract";
import { inputStyle } from "@/components/Onboarding/ThirdForm";
import { fakeData } from "@/lib/fakedata/Data";
import { Button, Stack, Switch } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center-center w-full py-10 max-w-7xl mx-auto">
        <Card>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div className="text-sm sm:text-base text-textColor line-clamp-1">
              Create new escrow contact
            </div>
            <Stack
              flexDirection="row"
              alignItems="center"
              gap={0.3}
              className="text-xs sm:text-sm"
            >
              <div>Public</div>
              <div>
                <Switch color="warning" />
              </div>
              <div>Private</div>
            </Stack>
          </Stack>

          <Stack spacing={2} width={"100%"} mt={5} className="text-sm">
            <div>
              <label>Contact Name</label>
              <input className={`${inputStyle} w-full`} placeholder="" />
            </div>

            <div className="grid gap-6 grid-cols-4">
              <div className="col-span-3">
                <label>Telegram Link</label>
                <input
                  type="text"
                  className={`${inputStyle} w-full`}
                  placeholder=""
                />
              </div>

              <div className="col-span-1">
                <label>Deadline</label>
                <input
                  type="date"
                  className={`${inputStyle} w-full`}
                  placeholder=""
                />
              </div>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              <div className="col-span-1">
                <label className=" line-clamp-1">Input token and amount</label>
                <input
                  type="text"
                  className={`${inputStyle} w-full`}
                  placeholder=""
                />
              </div>

              <div className="col-span-1">
                <label className=" line-clamp-1">
                  Link to materials needed
                </label>
                <input
                  type="text"
                  className={`${inputStyle} w-full`}
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <label htmlFor="">Description</label>
              <textarea className={`${inputStyle} w-full`} rows={3}></textarea>
            </div>
          </Stack>

          <Stack mt={5} alignItems="center">
            <Button
              variant="contained"
              className="!text-base !capitalize !bg-main !text-second !w-fit"
            >
              Submit
            </Button>
          </Stack>
        </Card>

        <Card>
          <div className="text-sm sm:text-base text-textColor">
            Open Public Contracts
          </div>

          <Stack mt={5} spacing={2}>
            {fakeData.map((el, i) => (
              <CardContract key={i} {...el} />
            ))}
          </Stack>
        </Card>
      </div>
    </div>
  );
}
