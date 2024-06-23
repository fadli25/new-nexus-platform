"use client";

import React from "react";
import LogImg from "@/public/logImage.jpg";
import Image from "next/image";

export default function index({ children }: any) {
  return (
    <div className="flex flex-col items-end relative onboarding bg">
      <div className="sm:w-[42%] bg-second absolute top-0 left-0 h-full grid place-items-center">
        <Image
          src={LogImg}
          className="w-full absolute bottom-0 left-0"
          alt=""
        />
      </div>

      <div className="flex w-full sm:w-[60%] justify-center items-center flex-1">
        {children}
      </div>
    </div>
  );
}
