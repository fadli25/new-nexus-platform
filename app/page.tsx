"use client";

import Image from "next/image";
import Index from "@/components/Onboarding";
import { useEffect, useState } from "react";
import FirstForm from "@/components/Onboarding/FirstForm";
import SecondForm from "@/components/Onboarding/SecondForm";
import ThirdForm from "@/components/Onboarding/ThirdForm";

type Form = JSX.Element;

export interface FormDataType {
  username: string;
  twitterProfile: string;
  EmailAddress: string;
}

export default function Home() {
  const [steps, setSteps] = useState("first");
  const [signup, setSignup] = useState<Form>();

  function handleGoToStep(e: string) {
    setSteps(e);
  }

  useEffect(() => {
    if (steps === "first") {
      setSignup(<FirstForm handleGoToStep={handleGoToStep} />);
    } else if (steps === "second") {
      setSignup(<SecondForm handleGoToStep={handleGoToStep} />);
    } else {
      setSignup(<ThirdForm handleGoToStep={handleGoToStep} />);
    }
  }, [steps]);
  return (
    <>
      <Index>{signup}</Index>
    </>
  );
}
