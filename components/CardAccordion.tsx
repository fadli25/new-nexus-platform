import React from "react";
import Card from "./Card";
import { Stack } from "@mui/material";
import CardApp from "@/components/CardApp";

export default function CardAccordion({ children, data, title, type }: any) {
  return (
    <div>
      <Card className="rounded-b-none border-b-2 py-4">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="text-base sm:text-[20px] text-[#696969] font-[500]">
            {title}
          </div>
          <Stack flexDirection="row" gap={1}>
            {children}
          </Stack>
        </Stack>
      </Card>
      <Card className="rounded-t-none min-h-24 w-[98%] mx-auto">
        <Stack spacing={2}>
          {data.map((el: any, i: number) => (
            <CardApp key={i} {...el} type={type} />
          ))}
        </Stack>
      </Card>
    </div>
  );
}
