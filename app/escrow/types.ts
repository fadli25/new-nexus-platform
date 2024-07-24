import { z } from "zod";

export const CreateContractSchema = z.object({
  contactName: z.string(),
  telegramLink: z.string().url(),
  materialLink: z.string().url(),
  amount: z.string().transform((val) => Number(val)),
  description: z.string().min(5),
  public: z.boolean(),
  deadline: z.string().date(),
});
export type CreateContractSchema = z.infer<typeof CreateContractSchema>;
