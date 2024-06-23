"use client";

import { Container } from "@mui/material";
import React from "react";

export default function Card({ children, className, width = "sm" }: any) {
  return (
    <Container
      maxWidth={width}
      className={`p-5 bg-white rounded-lg shadow-md text-black ${className}`}
    >
      {children}
    </Container>
  );
}
