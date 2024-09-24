"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorised!" };
  }

  // Check if the user is present in the database otherwise anyone can use leftover session

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorised!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: "Settings Updated!" };
};
