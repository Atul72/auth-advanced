"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    // Unfortunately in logout() redirect not working in function from action
    signOut();
  };

  return (
    <span onClick={onClick} className=" cursor-pointer">
      {children}
    </span>
  );
};
