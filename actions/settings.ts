"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { unstable_update } from "@/auth";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getAccountByUserId } from "@/lib/account";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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

  const account = await getAccountByUserId(dbUser.id);
  const account1 = !!account; // I have to do because i try hard but i can't get the oAuth property prefilled in auth.ts

  if (user.isOAuth || account1 === true) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.iSTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verifcationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verifcationToken.email, verifcationToken.token);

    return { success: "Verifiation email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isTwoFactorEnabled: updatedUser.iSTwoFactorEnabled,
    },
  });

  return { success: "Settings Updated!" };
};
