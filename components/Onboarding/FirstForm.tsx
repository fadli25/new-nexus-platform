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
      <Stack alignItems="center" gap={3} className="flex-col md:!flex-row">
        <div className="p-5 rounded-2xl bg-white md:-mb-6 relative">
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

        <div className="grid gap-4">
          <div className="sm:col-span-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
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
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="Twitter Profile"
              className="block text-sm font-medium leading-6 text-gray-900"
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
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="Email Address"
              className="block text-sm font-medium leading-6 text-gray-900"
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
                />
              </div>
            </div>
          </div>
        </div>
      </Stack>

      <Button
        className="!bg-main !text-second !font-semibold !text-base !capitalize !px-8 !py-2 disabled:!bg-main/30 disabled:!text-black/40"
        variant="contained"
        disabled={
          !formData.EmailAddress ||
          !formData.TwitterProfile ||
          !formData.UserName ||
          !selectedImage
        }
        onClick={() => handleGoToStep("second")}
      >
        Next
      </Button>
    </Stack>
  );
}
