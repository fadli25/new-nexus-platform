"use client";

import Card from "@/components/Card";
import CardContract from "@/components/CardContract";
import { fakeData } from "@/lib/fakedata/Data";
import { Button, Stack, Switch } from "@mui/material";
import React, { useState } from "react";
import coin from "@/public/coin.svg";
import Image from "next/image";
import { inputStyle } from "@/lib/styles/styles";

export default function page() {
  const [form, setForm] = useState({
    ContactName: "",
    TelegramLink: "",
    DeadLine: "",
    Amount: 0,
    Link: "",
    Description: "",
    private: true,
  });

  function isDisabled() {
    return (
      !form.TelegramLink ||
      !form.ContactName ||
      !form.Amount ||
      !form.DeadLine ||
      !form.Description ||
      !form.Link
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center-center w-full py-10 max-w-7xl mx-auto">
        <form onSubmit={(e) => e.preventDefault()}>
          <Card className="pb-7">
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
                  <Switch
                    color="warning"
                    value={form.private}
                    onChange={(e) =>
                      setForm({ ...form, private: e.target.checked })
                    }
                  />
                </div>
                <div>Private</div>
              </Stack>
            </Stack>

            <Stack spacing={2} width={"100%"} mt={5} className="text-sm">
              <div>
                <label>Contact Name</label>
                <input
                  value={form.ContactName}
                  onChange={(e) =>
                    setForm({ ...form, ContactName: e.target.value })
                  }
                  className={`${inputStyle} w-full`}
                  placeholder=""
                />
              </div>

              <div className="grid gap-6 grid-cols-4">
                <div className="col-span-3">
                  <label>Telegram Link</label>
                  <input
                    type="text"
                    value={form.TelegramLink}
                    onChange={(e) =>
                      setForm({ ...form, TelegramLink: e.target.value })
                    }
                    className={`${inputStyle} w-full`}
                    placeholder=""
                  />
                </div>

                <div className="col-span-1">
                  <label>Deadline</label>
                  <input
                    type="date"
                    value={form.DeadLine}
                    onChange={(e) =>
                      setForm({ ...form, DeadLine: e.target.value })
                    }
                    className={`${inputStyle} w-full`}
                    placeholder=""
                  />
                </div>
              </div>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                <div className="col-span-1">
                  <label className=" line-clamp-1">Input USDC amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={form.Amount}
                      onChange={(e) =>
                        setForm({ ...form, Amount: Number(e.target.value) })
                      }
                      className={`${inputStyle} w-full`}
                      placeholder=""
                    />
                    <div className="absolute right-4 top-[50%] translate-y-[-50%]">
                      <Image src={coin} alt="coin" className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <label className=" line-clamp-1">
                    Link to materials needed
                  </label>
                  <input
                    type="text"
                    value={form.Link}
                    onChange={(e) => setForm({ ...form, Link: e.target.value })}
                    className={`${inputStyle} w-full`}
                    placeholder=""
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">Description</label>
                <textarea
                  value={form.Description}
                  onChange={(e) =>
                    setForm({ ...form, Description: e.target.value })
                  }
                  className={`${inputStyle} w-full`}
                  rows={3}
                ></textarea>
              </div>
            </Stack>

            <Stack mt={5} alignItems="center">
              <Button
                variant="contained"
                type="submit"
                disabled={isDisabled()}
                className="!text-sm sm:!text-base !font-semibold !capitalize !bg-main !text-second !w-fit disabled:!bg-main/50 disabled:!text-second/50"
              >
                Submit
              </Button>
            </Stack>
          </Card>
        </form>

        <Card>
          <div className="text-sm sm:text-base text-textColor">
            Open Public Contracts
          </div>

          <Stack mt={5} spacing={2.6}>
            {fakeData.map((el, i) => (
              <CardContract key={i} {...el} />
            ))}
          </Stack>
        </Card>
      </div>
    </div>
  );
}
