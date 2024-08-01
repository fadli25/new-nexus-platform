"use client";

import React, { useContext, useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, Stack } from "@mui/material";
import { FormContext } from "@/contexts/FormContext";

export default function FirstForm({ handleGoToStep }: any) {
  const { formData, setFormData } = useContext<any>(FormContext);
  const [imageInput, setImageInput] = useState<any>();
  const [selectedImage, setSelectedImage] = useState("");

  console.log("image input:", imageInput);
  console.log("selected:", selectedImage || null);

  useEffect(() => {
    if (imageInput) {
      const obj = URL.createObjectURL(imageInput);
      setSelectedImage(obj);
    }
  }, [imageInput]);

  return (
    <Stack alignItems="center" gap={5}>
      <Stack gap={3} className="flex-col md:!flex-row items-end pt-5">
        <div
          className="rounded-2xl bg-white relative h-fit"
          style={{ boxShadow: "0px 4px 10px 0px #00000012" }}
        >
          {!selectedImage ? (
            <AddPhotoAlternateIcon className="text-[#F3F3F3] !text-9xl sm:!text-[230px]" />
          ) : (
            <img
              src={selectedImage}
              alt="profile image"
              className="w-[230px] h-[230px] object-cover object-center rounded-2xl border border-white"
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

        <div className="grid gap-4 ">
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
        className="!bg-main !text-second !font-semibold !text-base !capitalize !px-12 !py-2 disabled:!bg-main/30 disabled:!text-black/40 font-mulish !rounded-xl"
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
