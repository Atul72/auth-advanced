"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function AdminCheck() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Hello admin!" };
  } else {
    return { error: "Get a job man!" };
  }
}
