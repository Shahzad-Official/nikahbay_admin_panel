import React, { useEffect } from "react";
import RegistrationBg from "../RegistrationBg";
import AppField from "components/AppFields/AppField";
import AppButton from "components/AppButtons/AppButton";
import useSetPassword from "hooks/useSetPassword";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface SetPasswordProps {
  path: string;
}

function SetPassword({ path }: SetPasswordProps) {
  const {
    errorMessage,
    password,
    obsecureCp,
    obsecureP,
    setObsecureCp,
    setObsecureP,
    cPassword,
    setPassword,
    setCPassword,
    validate,
    resetStore,
  } = useSetPassword();

  const navigate = useNavigate();

  function handleSubmit() {
    if (errorMessage === "") {
      toast("Password has been updated successfully", {
        position: "top-center",
        type: "success",
      });

      navigate(path, { replace: true });
      resetStore();
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
      <h5 className="mt-3 font-medium">Update Your Password</h5>

      <AppField
        className="mt-4"
        type={obsecureP ? "password" : "text"}
        label="Password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
          validate();
        }}
        suffixIcon={
          <FontAwesomeIcon
            icon={obsecureP ? faEyeSlash : faEye}
            onClick={setObsecureP}
          />
        }
      />

      <AppField
        className="mt-4"
        type={obsecureCp ? "password" : "text"}
        label="Confirm Password"
        name="password"
        onChange={(e) => {
          setCPassword(e.target.value);
          validate();
        }}
        suffixIcon={
          <FontAwesomeIcon
            icon={obsecureCp ? faEyeSlash : faEye}
            onClick={setObsecureCp}
          />
        }
      />

      <AppButton className="mt-4" onClick={handleSubmit}>
        Update
      </AppButton>

    </RegistrationBg>
  );
}

export default SetPassword;
