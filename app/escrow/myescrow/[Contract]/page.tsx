"use client";

import Card from "@/components/Card";
import { Button, IconButton, Modal, Stack, Switch } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import Coin from "@/public/coin.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { inputStyle } from "@/components/Onboarding/ThirdForm";
import CardAccordion from "@/components/CardAccordion";
import { fakeData2, fakeData3 } from "@/lib/fakedata/Data";

export default function page() {
  const [open, setOpen] = useState(false);
  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  const [showStartProject, setShowStartProject] = useState(false);
  const [showTerminate, setShowTerminate] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  return (
    <div>
      <div className="max-w-5xl mx-auto pt-4">
        <Card width="lg">
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <div className="text-lg line-clamp-1 sm:text-3xl font-semibold">
              Build a team dashboard
            </div>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Image src={Coin} alt="coin" className="w-5" />
              <div className="text-xl font-semibold">3000</div>
            </Stack>
          </Stack>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Card className="col-span-1 md:col-span-3" width="lg">
              <div className="text-sm text-textColor">Description</div>
              <div className="text-sm mt-3 leading-7 min-h-24 px-5 py-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Mollitia possimus fugiat velit nemo, nostrum optio reiciendis,
                sint veritatis laudantium accusamus dolores enim, excepturi
                eius. Harum id doloremque totam obcaecati. Saepe?
              </div>
            </Card>

            <Card className="col-span-1">
              <Stack
                flexDirection="row"
                gap={1}
                className="text-sm"
                alignItems="center"
              >
                <div>Public</div>
                <Switch />
                <div>Public</div>
              </Stack>

              <Stack mt={4} spacing={2}>
                <div className="text-xs text-textColor">Deadline</div>
                <Stack flexDirection="row" gap={2} alignItems="center">
                  <div className="text-lg font-[500] line-clamp-1">
                    2d 24hrs 30 min
                  </div>
                  <IconButton onClick={handleOpenModal}>
                    <EditOutlinedIcon className="text-textColor text-base" />
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          </div>
        </Card>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Stack spacing={2}>
            <CardAccordion
              title="Approved Contractor"
              data={fakeData3}
              type="Chat"
            >
              <Stack flexDirection="row" gap={1}>
                <div
                  className={
                    showStartProject || showTerminate || showRefund
                      ? "hidden"
                      : ""
                  }
                >
                  <Button
                    variant="contained"
                    onClick={() => setShowStartProject(true)}
                    className="!text-xs !bg-main !normal-case !text-second !px-4 !py-2"
                  >
                    Start Project
                  </Button>
                </div>

                <Button
                  variant="contained"
                  onClick={() => {
                    setShowTerminate(true);
                    setShowRefund(false);
                  }}
                  className="!text-xs !bg-white !normal-case !text-second !px-4 !py-2"
                >
                  Terminate
                </Button>
              </Stack>
            </CardAccordion>

            <Card>
              <div className="text-base text-textColor">Submission</div>
            </Card>

            {showStartProject && (
              <Stack flexDirection="row" justifyContent="center" gap={2} mt={1}>
                <Button
                  variant="contained"
                  className="!text-xs !px-5 !py-2 !bg-main !text-second !normal-case"
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  className="!text-xs !px-5 !py-2 !bg-main !text-second !normal-case"
                  onClick={() => {
                    setShowStartProject(false);
                    setShowTerminate(true);
                  }}
                >
                  Reject
                </Button>
              </Stack>
            )}
            {showTerminate && (
              <Stack flexDirection="row" justifyContent="center" gap={2} mt={1}>
                <Button
                  variant="contained"
                  onClick={() => setOpen(true)}
                  className="!text-xs !px-5 !py-2 !bg-main !text-second !normal-case"
                >
                  Request new submissin
                </Button>
                <Button
                  variant="contained"
                  className="!text-xs !px-5 !py-2 !bg-main !text-second !normal-case"
                  onClick={() => {
                    setShowTerminate(false);
                    setShowRefund(true);
                  }}
                >
                  Dispute and Request refund
                </Button>
              </Stack>
            )}

            {showRefund && (
              <div className="text-xs text-black font-[200]">
                Your dispute has been resolved, and refund completed, please
                terminate the project
              </div>
            )}
          </Stack>

          <CardAccordion title="Applications" data={fakeData2} type="Approve" />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleCloseModal}
        className="grid place-items-center"
      >
        <Card className="text-center text-lg p-10">
          <div>Active Deadline</div>
          <div className="mt-6 text-3xl font-[500]">2d 24hrs 30min</div>
          <input
            className={`${inputStyle} mx-auto mt-8 w-[80%]`}
            type="datetime-local"
          />

          <Stack alignItems="center" mt={5}>
            <Button
              variant="contained"
              className="!text-second !text-xs sm:!text-sm !bg-main !normal-case !px-10 !py-2"
            >
              Done
            </Button>
          </Stack>
        </Card>
      </Modal>
    </div>
  );
}
