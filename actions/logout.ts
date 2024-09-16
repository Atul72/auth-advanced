"use server";

import { redirect } from "next/navigation";

import { signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const logout = async () => {
  // Do some server stuff
  await signOut({ redirectTo: DEFAULT_LOGIN_REDIRECT });
};
