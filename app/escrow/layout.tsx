import React from "react";
import Menu from "@/components/Navbar/Menu";

export default function layout({ children }: any) {
  return (
    <div>
      <Menu />
      <div className="p-4">{children}</div>
    </div>
  );
}
