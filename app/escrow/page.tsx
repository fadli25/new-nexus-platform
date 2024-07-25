"use client";

import Card from "@/components/Card";
import CardContract from "@/components/CardContract";
import { fakeData } from "@/lib/fakedata/Data";
import { Button, Stack, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import coin from "@/public/coin.svg";
import Image from "next/image";
import { inputStyle } from "@/lib/styles/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateContractSchema } from "./types";

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateContractSchema>({
    resolver: zodResolver(CreateContractSchema),
  });

  const contractData = [...fakeData];
  const onSubmit: SubmitHandler<CreateContractSchema> = (data) => {
    const date = new Date();
    contractData.push({
      title: data.contactName,
      price: data.amount,
      time: String(date.getMinutes),
    });

    console.log(contractData);
  };

  const isPublic = watch("public", false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("public", event.target.checked);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center-center w-full py-10 max-w-7xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="pb-7">
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div className="text-sm sm:text-base text-textColor line-clamp-1">
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
                    {...register("public")}
                    color="warning"
                    onChange={handleSwitchChange}
                    checked={isPublic}
                  />
                </div>
                <div>Private</div>
              </Stack>
            </Stack>

            <Stack spacing={2} width={"100%"} mt={5} className="text-sm">
              <div>
                <label>Contranct Name</label>
                <input
                  {...register("contactName")}
                  className={`${inputStyle} w-full`}
                  placeholder="Eg. Build Dashboard"
                />

                {errors.contactName?.message && (
                  <p className="text-red-700	text-xs">
                    {errors.contactName?.message}
                  </p>
                )}
              </div>

              <div className="grid gap-6 grid-cols-4">
                <div className="col-span-3">
                  <label>Telegram Link</label>
                  <input
                    type="text"
                    {...register("telegramLink")}
                    className={`${inputStyle} w-full`}
                    placeholder="Eg. https://example.tg.com"
                  />

                  {errors.telegramLink?.message && (
                    <p className="text-red-700	text-xs">
                      {errors.telegramLink?.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1">
                  <label>Deadline</label>
                  <input
                    type="date"
                    {...register("deadline")}
                    className={`${inputStyle} w-full`}
                    placeholder="Eg. 2024-08-10"
                  />
                  {errors.deadline?.message && (
                    <p className="text-red-700	text-xs">
                      {errors.deadline?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                <div className="col-span-1">
                  <label className=" line-clamp-1">Input USDC amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register("amount")}
                      className={`${inputStyle} w-full`}
                      placeholder="Eg. 0"
                    />
                    <div className="absolute right-4 top-[50%] translate-y-[-50%]">
                      <Image src={coin} alt="coin" className="w-5 h-5" />
                    </div>
                  </div>
                  {errors.amount?.message && (
                    <p className="text-red-700	text-xs">
                      {errors.amount?.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1">
                  <label className=" line-clamp-1">
                    Link to materials needed
                  </label>
                  <input
                    type="text"
                    {...register("materialLink")}
                    className={`${inputStyle} w-full`}
                    placeholder="Eg. https://figma.com/design"
                  />

                  {errors.materialLink?.message && (
                    <p className="text-red-700	text-xs">
                      {errors.materialLink?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="">Description</label>
                <textarea
                  {...register("description")}
                  className={`${inputStyle} w-full`}
                  rows={3}
                  placeholder="Eg. Description for the project"
                ></textarea>

                {errors.description?.message && (
                  <p className="text-red-700	text-xs">
                    {errors.description?.message}
                  </p>
                )}
              </div>
            </Stack>

            <Stack mt={5} alignItems="center">
              <Button
                variant="contained"
                type="submit"
                disabled={!isValid}
                className="!text-sm sm:!text-base !font-semibold !capitalize !bg-main !text-second !w-fit disabled:!bg-main/50 disabled:!text-second/50 !pt-3.5"
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
            {contractData.map((el, i) => (
              <CardContract key={i} {...el} />
            ))}
          </Stack>
        </Card>
      </div>
    </div>
  );
}
