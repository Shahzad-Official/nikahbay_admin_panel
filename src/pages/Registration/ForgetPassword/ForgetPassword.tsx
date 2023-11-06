import React, { ChangeEvent, useState } from "react";
import RegistrationBg from "../RegistrationBg";
import AppField from "components/AppFields/AppField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AppButton from "components/AppButtons/AppButton";
import Joi from "joi";
import { toast } from "react-toastify";
import { emailTlds } from "utils/AppCommonUtils";
import usePinVerification from "hooks/usePinVerification";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const { setEmail } = usePinVerification();

  const emailSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: emailTlds } })
      .required(),
  });
  const [email, setMyEmail] = useState("");
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setMyEmail(e.target.value);
  }
  const navigate = useNavigate();
  function handleSubmit() {
    const { error } = emailSchema.validate({ email: email });
    if (error) {
      toast(error?.details[0].message, {
        position: "top-center",
        type: "error",
      });
    } else {
      setEmail(email);
      navigate("/forget-password/pin");

    }
  }
  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    const forgetbtn = document.getElementById("forgetbtn");
    if (e.key === "Enter") {
      forgetbtn?.focus();
      forgetbtn?.click();
    }
  }
  return (
    <RegistrationBg>
      <p className="login-txt mt-4 mb-4">Enter Your Email to reset Password</p>
      <AppField
        label="Email"
        name="email"
        type="email"
        prefixIcon={<FontAwesomeIcon icon={faEnvelope} />}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
      />
      <AppButton
        id="forgetbtn"
        children={"Submit"}
        className="mt-4"
        onClick={handleSubmit}
      />
    </RegistrationBg>
  );
}

export default ForgetPassword;
