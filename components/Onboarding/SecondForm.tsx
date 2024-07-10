"use client";

import React, { useContext } from "react";
import EscrowImg from "@/public/web3-cryptocurrency-token-escrow-payment-contract 1.svg";
import PaymentBackImg from "@/public/coins-payments-back-and-forth-between-two-devices 1.svg";
import ProfessionalImg from "@/public/web3-professional-on-his-laptop 1.svg";
import BusnessesImg from "@/public/web3-businesses-and-payrolls 1.svg";
import Image from "next/image";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormContext } from "@/contexts/FormContext";

export default function SecondForm({ handleGoToStep }: any) {
  const router = useRouter();

  const { formData, setFormData } = useContext<any>(FormContext);

  const NexusTypes = [
    { title: "Nexus Escrow", image: EscrowImg },
    { title: "Nexus Swap / Payments", image: PaymentBackImg },
    { title: "Nexus Businesses", image: BusnessesImg },
    { title: "Nexus Professinals", image: ProfessionalImg },
  ];

  return (
    <div className="grid grid-cols-2 gap-10 p-8">
      {NexusTypes.map((el, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 0.98 }}
          onClick={() => {
            setFormData({ ...formData, NexusType: el.title });
            router.push("/escrow");
          }}
        >
          <Stack gap={1}>
            <div className="bg-white p-12 rounded-2xl border-2">
              <Image src={el.image} alt="" className="w-[120px]" />
            </div>

            <div className="text-sm text-center">{el.title}</div>
          </Stack>
        </motion.button>
      ))}
    </div>
  );
}
