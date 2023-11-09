import React, { useEffect, useState } from "react";
import RegistrationBg from "../RegistrationBg";
import PinInputField from "components/AppFields/PinputField";
import AppButton from "components/AppButtons/AppButton";
import CountDown from "../../../components/TimerCountDown/CountDown";
import TextButton from "components/AppButtons/TextButton";
import usePinVerification from "hooks/usePinVerification";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { pinVerify } from "../api/auth";
import { PulseLoader } from "react-spinners";

interface PinVerificationProps {
  path: string;
}

function PinVerification({ path }: PinVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { errorMessage, setError, validate, pin, email, setPin, resetStore } =
    usePinVerification();
  const [isComplete, setIsComplete] = useState(false);

  function handleOnComplete() {
    setIsComplete(true);
  }

  async function handleSubmit() {
    if (errorMessage === "") {
      setIsLoading(true);
      var data = await pinVerify(pin);

      if (data.success) {
        toast(data.message, {
          position: "top-center",
          type: "success",
        });
        resetStore();
        localStorage.setItem("isLogin", "true");
        navigate(path, { replace: true });
      } else {
        toast(data.message, {
          position: "top-center",
          type: "error",
        });
      }

      setIsLoading(false);
    } else {
      toast(errorMessage, {
        position: "top-center",
        type: "error",
      });
    }
  }

  useEffect(() => {
    validate();
  }, [validate]);

  return (
    <RegistrationBg>
      <span className="mt-4" />
      <p className="text-sm text-center">
        A Verification code has been sent to{" "}
      </p>
      <p className="text-sm font-semibold mb-3 text-center">{email}</p>

      {/* <div className="flex flex-row items-center justify-center mt-1 mb-3">
        <TextButton
          className={`${isComplete ? "underline" : ""} text-lg`}
          text={isComplete ? "Resend OTP" : "Resend in"}
          disable={isComplete ? false : true}
          onClick={() => {
            if (isComplete) {
              setIsComplete(false);
            }
          }}
        />
        <CountDown
          className={isComplete ? "hidden" : "block"}
          seconds={isComplete ? 0 : 60}
          onComplete={handleOnComplete}
        />
      </div> */}

      <PinInputField
        length={5}
        onComplete={(pin) => {
          setPin(pin);
          validate();
        }}
      />
      <AppButton className="mt-4 mb-2" id="pinbtn" onClick={handleSubmit}>
        {isLoading ? <PulseLoader color="white" /> : "Verify"}
      </AppButton>
    </RegistrationBg>
  );
}

export default PinVerification;
