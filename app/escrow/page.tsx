"use client";

import Card from "@/components/Card";
import CardContract from "@/components/CardContract";
import Loading from "@/components/Loading";
import { initEscrow } from "@/lib/NexusProgram/escrow/init_escrow";
import { getAllEscrow } from "@/lib/NexusProgram/escrow/utils.ts/getAllEscrow";
import { getFounderEscrow } from "@/lib/NexusProgram/escrow/utils.ts/getFounderEscrow";
import { fakeData } from "@/lib/fakedata/Data";
import { inputStyle } from "@/lib/styles/styles";
import coin from "@/public/coin.svg";
import { Button, Stack, Switch } from "@mui/material";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";

export default function page() {
  const [time_value, setTimeValue] = useState();
  const [escrows, setEscrows] = useState<any[]>();

  const [form, setForm] = useState({
    ContractName: "",
    TelegramLink: "",
    DeadLine: 0,
    Amount: 0,
    Link: "",
    Description: "",
    private: true,
  });

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  function isDisabled() {
    return (
      !form.TelegramLink ||
      !form.ContractName ||
      !form.Amount ||
      !form.DeadLine ||
      !form.Description ||
      !form.Link
    );
  }

  const getEscrow = async () => {
    try {
      console.log("wow");
      const escrow = await getAllEscrow(connection, "confirmed");
      setEscrows(escrow);
      console.log(escrow);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!anchorWallet) return;
    getEscrow();
  }, [anchorWallet]);

  const onChangeTime = (e: any) => {
    setTimeValue(e);
    var date = new Date(e); // some mock date
    var milliseconds = date.getTime();
    console.log();
    setForm({ ...form, DeadLine: milliseconds / 1000 });
    // setTime(milliseconds / 1000);
  };

  const init_esc = async () => {
    try {
      console.log(form);
      console.log(form.DeadLine);

      initEscrow(
        anchorWallet!,
        connection,
        form.ContractName,
        form.TelegramLink,
        form.Link,
        form.Description,
        form.Amount,
        form.DeadLine,
        wallet
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center w-full py-10 max-w-7xl mx-auto mb-10">
        <form onSubmit={(e) => e.preventDefault()}>
          <Card className="pb-7">
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div className="text-sm sm:text-base text-textColor  !font-myanmar">
                Create new escrow contract
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

            <Stack
              spacing={2}
              width={"100%"}
              mt={5}
              className="text-xs sm:text-base"
            >
              <div>
                <label className="!font-myanmar">Contract Name</label>
                <input
                  value={form.ContractName}
                  onChange={(e) =>
                    setForm({ ...form, ContractName: e.target.value })
                  }
                  className={`${inputStyle} w-full`}
                  placeholder="Eg. Build a landing page"
                />
              </div>

              <div className="grid gap-6 grid-cols-4">
                <div className="col-span-3">
                  <label className="!font-myanmar">Telegram Link</label>
                  <input
                    type="text"
                    value={form.TelegramLink}
                    onChange={(e) =>
                      setForm({ ...form, TelegramLink: e.target.value })
                    }
                    className={`${inputStyle} w-full`}
                    placeholder="Eg. https://example.tme.com"
                  />
                </div>

                <div className="col-span-1">
                  <label className="!font-myanmar">Deadline</label>
                  <input
                    type="date"
                    value={time_value}
                    onChange={(e) => onChangeTime(e.target.value)}
                    className={`${inputStyle} w-full`}
                    placeholder="Eg. 2024-08-15"
                  />
                </div>
              </div>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                <div className="col-span-1">
                  <label className=" line-clamp-1 !font-myanmar">
                    Input USDC amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={form.Amount}
                      onChange={(e) =>
                        setForm({ ...form, Amount: Number(e.target.value) })
                      }
                      className={`${inputStyle} w-full`}
                      placeholder="200"
                    />
                    <div className="absolute right-4 top-[50%] translate-y-[-50%]">
                      <Image src={coin} alt="coin" className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <label className=" line-clamp-1 !font-myanmar">
                    Link to materials needed
                  </label>
                  <input
                    type="text"
                    value={form.Link}
                    onChange={(e) => setForm({ ...form, Link: e.target.value })}
                    className={`${inputStyle} w-full`}
                    placeholder="Eg. https://example.figma.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="" className="!font-myanmar">
                  Description
                </label>
                <textarea
                  value={form.Description}
                  onChange={(e) =>
                    setForm({ ...form, Description: e.target.value })
                  }
                  className={`${inputStyle} w-full`}
                  rows={3}
                  placeholder="Eg. A brief description of what the project entails"
                ></textarea>
              </div>
            </Stack>

            <Stack mt={5} alignItems="center">
              <Button
                onClick={() => init_esc()}
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

          <Stack
            mt={5}
            spacing={2.6}
            className="h-[600px] sm:max-h-[489px] overflow-y-scroll overflow-x-hidden"
          >
            {escrows &&
              escrows.map((el, i) => (
                <Suspense fallback={<Loading />}>
                  <CardContract
                    key={i}
                    contractName={el.contractName}
                    amount={Number(el.amount)}
                    deadline={Number(el.deadline)}
                    escrow={el.pubkey.toBase58()}
                    type={2}
                  />
                </Suspense>
              ))}
          </Stack>
        </Card>
      </div>
    </div>
  );
}
