"use client";

import { AdminCheck } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onAdminOnlyFuctionClick = () => {
    AdminCheck().then((data) => {
      if (data.success) {
        toast.success(data.success);
      } else {
        toast.error(data.error);
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API route!");
      } else {
        toast.error("Forbidden Api route!");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin Stuffs</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to view this page." />
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
          <p className="text-sm font-medium">Admin-only api route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
          <p className="text-sm font-medium">Admin-only server action</p>
          <Button onClick={onAdminOnlyFuctionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
