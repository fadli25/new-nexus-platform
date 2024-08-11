"use client";

import Card from "@/components/Card";
import CardAccordion from "@/components/CardAccordion";
import CardAccordionAccept from "@/components/CardAccordionAccept";
import { getApplyEscrow } from "@/lib/NexusProgram/escrow/utils.ts/getApplyEscrow";
import { getEscrowInfo } from "@/lib/NexusProgram/escrow/utils.ts/getEscrowInfo";
import { get_userr_info } from "@/lib/NexusProgram/escrow/utils.ts/get_userr_info";
import { inputStyle } from "@/lib/styles/styles";
import Coin from "@/public/coin.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, IconButton, Modal, Stack, Switch } from "@mui/material";
import { web3 } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import linksvg from "@/public/linksvg.svg";
import ApproveModal from "@/components/ApproveModal";

export default function page() {
  const [open, setOpen] = useState(false);
  const [escrowInfo, setEscrowInfo] = useState<any>();
  const [applys, setApplys] = useState<any[]>();
  const anchorWallet = useAnchorWallet();
  // const wallet = useWallet();
  const { connection } = useConnection();
  // const router = useRouter()
  const pathname = usePathname();
  // const searchParams = useSearchParams()

  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  const getEscrowInfosss = async () => {
    try {
      // const address = searchParams.get("escrow");
      const address = pathname.replace("/escrow/myescrow/", "");
      const escrow = new web3.PublicKey(address);
      const info = await getEscrowInfo(anchorWallet, connection, escrow);
      info!.escrow = escrow;
      console.log("info");
      console.log(info);

      const freelancerInfo = await get_userr_info(
        anchorWallet,
        connection,
        info!.reciever
      );
      console.log(freelancerInfo);
      info!.freelancerInfo = freelancerInfo;
      // console.log(info);
      setEscrowInfo(info);
    } catch (e) {
      console.log(e);
    }
  };

  const getApplys = async () => {
    try {
      // const address = searchParams.get("escrow");
      const address = pathname.replace("/escrow/myescrow/", "");
      const escrow = new web3.PublicKey(address);
      const info = await getApplyEscrow(connection, escrow, "confirmed");
      console.log("apply");
      console.log(info);
      setApplys(info);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!anchorWallet) return;
    getEscrowInfosss();
    getApplys();
  }, [anchorWallet]);

  const filter = () => {
    console.log(applys![0].pubkey.toBase58());
    console.log(escrowInfo.reciever.toBase58());
    const wddd = applys?.filter(
      (ap: any) => ap.pubkey.toBase58() == escrowInfo.reciever.toBase58()
    );
    console.log(wddd);
  };

  const [showStartProject, setShowStartProject] = useState(false);
  const [showTerminate, setShowTerminate] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showApprove, setShowApprove] = useState(false);

  function handleCancelProjectTermination() {
    setShowTerminate(false);
    setShowReject(false);
  }

  function handleShowStartProject() {
    setShowStartProject(true);
  }

  function handleShowApprove() {
    setShowApprove(true);
  }

  function handleShowReject() {
    setShowReject(true);
    setShowTerminate(false);
  }

  function handleCloseReject() {
    setShowReject(false);
  }
  return (
    <div>
      <div className="max-w-6xl mx-auto pt-4">
        <div className="flex items-center gap-3">
          <Card width="lg">
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack flexDirection="row" alignItems="center" gap={1}>
                <div className="text-base line-clamp-1 sm:text-2xl font-semibold font-mynamarButton">
                  Build a team dashboard
                </div>

                {/* <ShareIcon /> */}
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap={1}>
                <Image src={Coin} alt="coin" className="w-5" />
                <div className="text-sm sm:text-xl font-semibold">
                  {escrowInfo ? Number(escrowInfo.amount) : "--"}
                </div>
              </Stack>
            </Stack>
          </Card>

          <div className="bg-white rounded-xl p-5 h-full hidden sm:block">
            <Image src={linksvg} alt="" className="w-[30px] py-[3px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <Card className="col-span-1 md:col-span-3" width="lg">
            <div className="text-xs sm:text-sm text-textColor">Description</div>
            <div className="text-xs sm:text-sm mt-3 leading-7 min-h-24 px-5 py-2">
              {escrowInfo ? escrowInfo.description : "--"}
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
                <div
                  onClick={() => filter()}
                  className="text-lg font-[500] line-clamp-1"
                >
                  2d 24hrs 30 min
                </div>
                <IconButton onClick={handleOpenModal}>
                  <EditOutlinedIcon className="text-textColor text-base" />
                </IconButton>
              </Stack>
            </Stack>
          </Card>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Stack spacing={2}>
            {escrowInfo && applys && (
              <CardAccordionAccept
                data={
                  escrowInfo.reciever
                    ? applys?.filter(
                        (ap: any) =>
                          ap.user.toBase58() == escrowInfo.reciever.toBase58()
                      )
                    : []
                }
                title="Approved Contractor"
                type="Chat"
                escrowInfo={escrowInfo}
                showTerminate={showTerminate}
                showApprove={handleShowApprove}
                reject={showReject}
                showReject={handleShowReject}
                cancel={handleCancelProjectTermination}
              >
                <Stack flexDirection="row" gap={1}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowTerminate(true);
                      setShowReject(false);
                    }}
                    className="!text-xs !bg-white !font-semibold !normal-case !text-second !px-4 !py-2"
                  >
                    Terminate
                  </Button>
                </Stack>
              </CardAccordionAccept>
            )}

            {/* {showStartProject && (
              <CardAnimation>
                <Stack
                  flexDirection="row"
                  justifyContent="center"
                  gap={2}
                  mt={1}
                >
                  <Button
                    variant="contained"
                    className="!text-xs !px-5 !font-semibold !py-2 !bg-main !text-second !normal-case"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    className="!text-xs !px-5 !font-semibold !py-2 !bg-main !text-second !normal-case"
                    onClick={() => {
                      setShowStartProject(false);
                      setShowTerminate(true);
                    }}
                  >
                    Reject
                  </Button>
                </Stack>
              </CardAnimation>
            )}
            {showTerminate && (
              <CardAnimation>
                <Stack
                  flexDirection="row"
                  justifyContent="center"
                  gap={2}
                  mt={1}
                >
                  <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    className="!text-xs !px-5 !font-semibold !py-2 !bg-main !text-second !normal-case"
                  >
                    Request new submissin
                  </Button>
                  <Button
                    variant="contained"
                    className="!text-xs !px-5 !font-semibold !py-2 !bg-main !text-second !normal-case"
                    onClick={() => {
                      setShowTerminate(false);
                      setShowRefund(true);
                    }}
                  >
                    Dispute and Request refund
                  </Button>
                </Stack>
              </CardAnimation>
            )}

            {showRefund && (
              <CardAnimation>
                <div className="text-xs text-black font-[200]">
                  Your dispute has been resolved, and refund completed, please
                  terminate the project
                </div>
              </CardAnimation>
            )} */}
          </Stack>

          {applys && escrowInfo && (
            <CardAccordion
              title="Applications"
              data={
                escrowInfo.reciever
                  ? applys?.filter(
                      (ap: any) =>
                        ap.user.toBase58() !== escrowInfo.reciever.toBase58()
                    )
                  : applys
              }
              startProject={handleShowStartProject}
              type="Approve"
              page={"approve"}
              link={"approve"}
            />
          )}
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

      <Modal
        open={showStartProject}
        onClose={() => setShowStartProject(false)}
        className="grid place-items-center"
      >
        <ApproveModal
          title="Confirmation"
          messageTitle="Are you sure to start the contract??"
          messageDescription="Contract can oly be terminated by both parties mutually agreeing to do so"
        >
          <Button
            variant="contained"
            className="!normal-case !text-black !text-sm !bg-green-500 !px-8 !py-2"
          >
            Start Project
          </Button>
        </ApproveModal>
      </Modal>

      <Modal
        open={showApprove}
        onClose={() => setShowApprove(false)}
        className="grid place-items-center"
      >
        <ApproveModal
          title="Confirmation"
          messageTitle="Are you sure to start the contract??"
          messageDescription="Contract can oly be terminated by both parties mutually agreeing to do so"
        >
          <Button
            variant="contained"
            className="!normal-case !text-black !text-sm !bg-green-500 !px-8 !py-2"
          >
            Approve
          </Button>
        </ApproveModal>
      </Modal>
    </div>
  );
}
