"use client";

import { newVerifcation } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerifcation(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Someting went worng!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      <CardWrapper
        headerLabel="Confirming you verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
      >
        <div className="flex  items-center w-full justify-center">
          {!success && !error && <BeatLoader />}

          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </CardWrapper>
    </div>
  );
};
