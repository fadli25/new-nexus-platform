"use client";

import Card from "@/components/Card";
import CardContract from "@/components/CardContract";
import { Stack } from "@mui/material";
import React from "react";
import { fakeData } from "@/lib/fakedata/Data";

export default function page() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center-center w-full py-10 max-w-7xl mx-auto">
        <Card className="pb-10">
          <div className="text-sm text-textColor">Ongoing Projects</div>

          <Stack mt={4} spacing={2.8}>
            {fakeData.map((el, i) => (
              <CardContract key={i} {...el} type="ongoing" />
            ))}
          </Stack>
        </Card>

        <Card className="pb-10">
          <div className="text-sm text-textColor">Pending Applications</div>

          <Stack mt={4} spacing={2.8}>
            {fakeData.map((el, i) => (
              <CardContract key={i} {...el} />
            ))}
          </Stack>
        </Card>
      </div>
    </div>
  );
}
