import React from "react";
import EscrowImg from "@/public/web3-cryptocurrency-token-escrow-payment-contract 1.svg";
import PaymentBackImg from "@/public/coins-payments-back-and-forth-between-two-devices 1.svg";
import ProfessionalImg from "@/public/web3-professional-on-his-laptop 1.svg";
import BusnessesImg from "@/public/web3-businesses-and-payrolls 1.svg";
import Image from "next/image";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function SecondForm({ handleGoToStep }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 p-8">
      <motion.button
        whileHover={{ scale: 0.98 }}
        onClick={() => handleGoToStep("third")}
      >
        <Stack gap={1}>
          <div className="bg-white p-12 rounded-2xl border-2">
            <Image src={EscrowImg} alt="" className="w-[120px]" />
          </div>

          <div className="text-sm text-center">Nexus Escrow</div>
        </Stack>
      </motion.button>

      <motion.button
        whileHover={{ scale: 0.98 }}
        onClick={() => handleGoToStep("third")}
      >
        <Stack gap={1}>
          <div className="bg-white p-12 rounded-2xl border-2">
            <Image src={PaymentBackImg} alt="" className="w-[120px]" />
          </div>

          <div className="text-sm text-center">Nexus Swap / Payments</div>
        </Stack>
      </motion.button>

      <motion.button
        whileHover={{ scale: 0.98 }}
        onClick={() => handleGoToStep("third")}
      >
        <Stack gap={1}>
          <div className="bg-white p-12 rounded-2xl border-2">
            <Image src={BusnessesImg} alt="" className="w-[120px]" />
          </div>

          <div className="text-sm text-center">Nexus Businesses</div>
        </Stack>
      </motion.button>

      <motion.button
        whileHover={{ scale: 0.98 }}
        onClick={() => handleGoToStep("third")}
      >
        <Stack gap={1}>
          <div className="bg-white p-12 rounded-2xl border-2">
            <Image src={ProfessionalImg} alt="" className="w-[120px]" />
          </div>

          <div className="text-sm text-center">Nexus Professinals</div>
        </Stack>
      </motion.button>
    </div>
  );
}
