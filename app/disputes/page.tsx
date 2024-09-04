"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import DisputeCard from "@/components/DisputeCard";

const imageLink =
  "https://cdn.discordapp.com/attachments/1085293900706627595/1162203481017438298/Untitled670_20230803112855_1.png?ex=66d9b516&is=66d86396&hm=f02d02ef44519c088678162796c8bd1ffc30c7279248c532355f9871773447f8&";

export default function page() {
  const [disptueState, setDisputeState] = useState(true);

  const [disputes, setDisputed] = useState([
    { id: 1, ClinetName: "Zetsu", FreelancerName: "Manay", isResolved: false },
    { id: 2, ClinetName: "Zetsu", FreelancerName: "Manay", isResolved: false },
  ]);

  const handleCheckboxChange = (id: number) => {
    setDisputed(
      disputes.map((el) =>
        el.id === id ? { ...el, isResolved: !el.isResolved } : el
      )
    );
  };

  const ResolvedDisptued = [...disputes].filter((x) => x.isResolved);
  const NotResolvedDisptued = [...disputes].filter((x) => !x.isResolved);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-base text-textColor">
          <button
            disabled={disptueState}
            onClick={() => setDisputeState(true)}
            className="disabled:text-black disabled:font-semibold"
          >
            Open Disputes
          </button>
          <button
            disabled={!disptueState}
            onClick={() => setDisputeState(false)}
            className="disabled:text-black disabled:font-semibold"
          >
            Resolved
          </button>
        </div>
        <div className="text-xl font-semibold">150</div>
      </div>

      <motion.div className="w-full border border-textColor p-5 rounded-xl  flex flex-col space-y-10">
        {disptueState &&
          NotResolvedDisptued.map((el, i) => (
            <div key={i} className="flex items-center justify-around gap-5">
              <div className="flex justify-center">
                <DisputeCard
                  title={el.ClinetName}
                  role="Client"
                  image={imageLink}
                  contactLink="#"
                />
              </div>

              <div className="flex justify-center">
                <DisputeCard
                  title={el.FreelancerName}
                  role="Freelancer"
                  image={imageLink}
                  contactLink="#"
                />
              </div>

              <div className="text-sm text-center font-semibold">
                <div className="text-textColor mb-6">Resolved</div>
                <input
                  type="checkbox"
                  className="scale-[2] cursor-pointer"
                  checked={el.isResolved}
                  onChange={() => handleCheckboxChange(el.id)}
                />
              </div>
            </div>
          ))}

        {!disptueState &&
          ResolvedDisptued.map((el, i) => (
            <div key={i}>
              <div className="flex items-center justify-around gap-5">
                <div className="flex justify-center">
                  <DisputeCard
                    title={el.ClinetName}
                    role="Client"
                    image={imageLink}
                    contactLink="#"
                  />
                </div>

                <div className="flex justify-center">
                  <DisputeCard
                    title={el.FreelancerName}
                    role="Freelancer"
                    image={imageLink}
                    contactLink="#"
                  />
                </div>

                <div className="text-sm text-center font-semibold">
                  <div className="text-textColor mb-6">Resolved</div>
                  <input
                    type="checkbox"
                    className="scale-[2]"
                    checked={el.isResolved}
                    onChange={() => handleCheckboxChange(el.id)}
                  />
                </div>
              </div>
              {/* {i < ResolvedDisptued.length - 1 && (
                <hr className="w-full border border-textColor mt-6" />
              )} */}
            </div>
          ))}
      </motion.div>
    </div>
  );
}
