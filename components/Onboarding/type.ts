import * as z from "zod";
export const OnboardingScreenForm = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .min(3, "username should not be less than 3 characters")
    .max(20, "username should not be more that 20 characters"),

  twitterProfile: z
    .string({
      required_error: "twitter profile is required",
    })
    .min(1, "Twitter profile url is required")
    .url(),

  email: z
    .string({
      required_error: "email is required",
    })
    .min(1, "Email is required")
    .email(),

  profileImage: z.any(),
});
export type OnboardingScreenForm = z.infer<typeof OnboardingScreenForm>;
