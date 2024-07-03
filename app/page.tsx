"use client";

import Image from "next/image";
import Index from "@/components/Onboarding";
import { useContext, useEffect, useState } from "react";
import FirstForm from "@/components/Onboarding/FirstForm";
import SecondForm from "@/components/Onboarding/SecondForm";
import { FormContext } from "@/contexts/FormContext";

type Form = JSX.Element;

export default function Home() {
  const [steps, setSteps] = useState("first");
  const [signup, setSignup] = useState<Form>();

  function handleGoToStep(e: string) {
    setSteps(e);
  }

  const { formData, setFormData } = useContext<any>(FormContext);

  console.log(formData);

  useEffect(() => {
    if (steps === "first") {
      setSignup(<FirstForm handleGoToStep={handleGoToStep} />);
    } else if (steps === "second") {
      setSignup(<SecondForm handleGoToStep={handleGoToStep} />);
    }
  }, [steps]);
  return (
    <>
      <Index>{signup}</Index>
    </>
  );
}
