"use client";

import React, { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, Stack } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { OnboardingScreenForm } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FirstForm({ handleGoToStep }: any) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<OnboardingScreenForm>({
    resolver: zodResolver(OnboardingScreenForm),
    mode: "onChange",
  });

  // Watching form fields
  const watchedUsername = watch("username");
  const watchedTwitterProfile = watch("twitterProfile");
  const watchedEmail = watch("email");

  const onSubmit: SubmitHandler<OnboardingScreenForm> = (data) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    for (const key in data) {
      formData.append(key, data[key as keyof OnboardingScreenForm] as string);
    }

    console.log("Form Data:", {
      ...data,
      profileImage: imageFile,
      formData,
    });

    handleGoToStep("second");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Log or use the watched values
    console.log("Watched Username:", watchedUsername);
    console.log("Watched Twitter Profile:", watchedTwitterProfile);
    console.log("Watched Email:", watchedEmail);
  }, [watchedUsername, watchedTwitterProfile, watchedEmail]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="center" gap={5}>
        <Stack gap={3} className="flex-col md:!flex-row items-end pt-5">
          <div className="rounded-2xl bg-white relative h-fit">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Selected"
                className="w-[230px] h-[230px] object-cover object-center rounded-2xl border border-white"
              />
            ) : (
              <AddPhotoAlternateIcon className="text-[#F3F3F3] !text-9xl sm:!text-[230px]" />
            )}
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
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
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex rounded-md shadow-sm sm:max-w-md">
                  <input
                    {...register("username")}
                    type="text"
                    autoComplete="username"
                    className="block bg-white rounded-md flex-1 border-0 py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none sm:text-sm sm:leading-6 min-w-[300px]"
                    placeholder=""
                  />
                </div>
                {errors.username?.message && (
                  <p className="text-red-700 text-xs">
                    {errors.username?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="twitterProfile"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Twitter Profile
              </label>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex rounded-md shadow-sm sm:max-w-md">
                  <input
                    {...register("twitterProfile")}
                    type="text"
                    className="block bg-white rounded-md flex-1 border-0 py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
                {errors.twitterProfile?.message && (
                  <p className="text-red-700 text-xs">
                    {errors.twitterProfile?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex rounded-md shadow-sm sm:max-w-md">
                  <input
                    {...register("email")}
                    type="email"
                    className="block bg-white rounded-md flex-1 border-0 py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
                {errors.email?.message && (
                  <p className="text-red-700 text-xs">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Stack>

        <Button
          className="!bg-main !text-second !font-semibold !text-base !capitalize !px-12 !py-2 disabled:!bg-main/30 disabled:!text-black/40 font-mulish !rounded-xl"
          variant="contained"
          disabled={!isValid}
          type="submit"
        >
          Next
        </Button>
      </Stack>
    </form>
  );
}
