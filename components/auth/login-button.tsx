"use client";

import { useRouter } from "next/navigation";

interface LoginButtonPorps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonPorps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode == "modal") return <span>TODO: Implement Modal</span>;

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
