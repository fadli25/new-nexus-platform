"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const theme = createTheme({
  typography: {
    fontFamily: "mynamar",
  },
});

export default function MuiTheme({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
