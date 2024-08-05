"use client";

import { FormContext } from "@/contexts/FormContext";
import { init_user } from "@/lib/user/init_user";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, Stack } from "@mui/material";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useContext, useEffect, useState } from "react";

export default function FirstForm({ handleGoToStep }: any) {
  const { formData, setFormData } = useContext<any>(FormContext);
  const [imageInput, setImageInput] = useState<any>();
  const [selectedImage, setSelectedImage] = useState("");

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const { connection } = useConnection();

  console.log("image input:", imageInput);
  console.log("selected:", selectedImage || null);

  useEffect(() => {
    if (imageInput) {
      const obj = URL.createObjectURL(imageInput);
      setSelectedImage(obj);
    }
  }, [imageInput]);


  // async function initialize_user() {
  //   try {
  //     // if (profile_overview.length > 120) {
  //     //   return notify_warning(
  //     //     "Profile Overview need to be at least 120 characters!"
  //     //   );
  //     // }

  //     // notify_laoding("Creating Profile...");
  //     // setLoading(true);
  //     await init_user(
  //       anchorWallet,
  //       connection,
  //       formData.UserName,
  //       "",
  //       "category",
  //       roles,
  //       level,
  //       others,
  //       profile_overview,
  //       payment_rate_per_hour,
  //       nogotion,
  //       portfolio,
  //       resume,
  //       tosp,
  //       timezone,
  //       country,
  //       wallet
  //     );
  //     // notify_delete();
  //     // notify_success("Profile Created!");
  //     // setLoading(false);
  //   } catch (e) {
  //     // setLoading(false);
  //     // notify_delete();
  //     // notify_error("Transaction Failed");
  //     console.log(e);
  //   }
  // }

  return (
    <Stack alignItems="center" gap={5}>
      <Stack alignItems="center" gap={3} className="flex-col md:!flex-row">
        <div
          className="p-5 rounded-2xl bg-white md:-mb-6 relative"
          style={{ boxShadow: "0px 4px 10px 0px #00000012" }}
        >
          {!selectedImage ? (
            <AddPhotoAlternateIcon className="text-[#F3F3F3] !text-9xl sm:!text-[200px]" />
          ) : (
            <img
              src={selectedImage}
              alt="profile image"
              className="w-[200px] h-[200px] object-cover object-center"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageInput(() => {
                if (e.target.files) {
                  return e.target.files[0];
                }
              })
            }
            className="absolute top-0 left-0 w-full h-full opacity-0 z-10"
          />
        </div>

        <div className="grid gap-4 pt-5">
          <div className="sm:col-span-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900 font-myanmar"
            >
              Username
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm  sm:max-w-md">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.UserName}
                  onChange={(e) =>
                    setFormData({ ...formData, UserName: e.target.value })
                  }
                  autoComplete="username"
                  className="block bg-white rounded-md flex-1 border-0 py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none sm:text-sm sm:leading-6 min-w-[300px]"
                  placeholder=""
                  style={{
                    boxShadow: "0px 4px 10px 0px #00000012",
                    height: "2.688rem",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="Twitter Profile"
              className="block text-sm font-medium leading-6 text-gray-900 font-myanmar"
            >
              Twitter Profile
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm  sm:max-w-md">
                <input
                  type="text"
                  name="Twitter Profile"
                  value={formData.TwitterProfile}
                  onChange={(e) =>
                    setFormData({ ...formData, TwitterProfile: e.target.value })
                  }
                  className="block bg-white rounded-md flex-1 border-0 py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none sm:text-sm sm:leading-6"
                  placeholder=""
                  style={{
                    boxShadow: "0px 4px 10px 0px #00000012",
                    height: "2.688rem",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="Email Address"
              className="block text-sm font-medium leading-6 text-gray-900 font-myanmar"
            >
              Email Address
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm  sm:max-w-md">
                <input
                  type="email"
                  name="Email Address"
                  value={formData.EmailAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, EmailAddress: e.target.value })
                  }
                  className="block bg-white rounded-md flex-1 border-0 py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none sm:text-sm sm:leading-6"
                  placeholder=""
                  style={{
                    boxShadow: "0px 4px 10px 0px #00000012",
                    height: "2.688rem",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Stack>

      <Button
        className="!bg-main !text-second !font-semibold !text-xl !capitalize !px-8 !py-2 disabled:!bg-main/30 disabled:!text-black/40 font-mulish w-48 !rounded-xl"
        variant="contained"
        disabled={
          !formData.EmailAddress ||
          !formData.TwitterProfile ||
          !formData.UserName ||
          !selectedImage
        }
        onClick={() => handleGoToStep("second")}
        style={{ boxShadow: "0px 4px 10px 0px #00000012" }}
      >
        Next
      </Button>
    </Stack>
  );
}
