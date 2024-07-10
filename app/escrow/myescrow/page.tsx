"use client";

import Card from "@/components/Card";
import { Stack } from "@mui/material";
import React from "react";
import { fakeData } from "@/lib/fakedata/Data";
import CardContract from "@/components/CardContract";

export default function page() {
  return (
    <div>
      <Card width="md" className="pb-10">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          className="text-textColor text-xs"
        >
          <div className="text-base">My Open contracts</div>
          <div>View past contracts</div>
        </Stack>

        <Stack spacing={2.8} mt={3}>
          {fakeData.map((el, i) => (
            <CardContract key={i} {...el} />
          ))}
        </Stack>
      </Card>
    </div>
  );
}
