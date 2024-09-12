"use server";
import * as z from "zod";
import { loginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof loginSchema>) => {
  // Validation at the server side
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email Sent!" };
};
