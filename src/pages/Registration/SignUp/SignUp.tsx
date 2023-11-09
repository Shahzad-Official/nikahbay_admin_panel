import React, { ChangeEvent, useEffect, useState } from "react";
import RegistrationBg from "../RegistrationBg";
import AppField from "components/AppFields/AppField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import TextButton from "components/AppButtons/TextButton";
import AppButton from "components/AppButtons/AppButton";
import OrDivider from "components/OrDivider/OrDivider";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useSignupForm from "hooks/useSignUpForm";
import usePinVerification from "hooks/usePinVerification";
import AppImagePick from "components/AppFields/AppImagePick";
import { signup } from "../api/auth";
import { PulseLoader } from "react-spinners";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    formData,
    errorMessage,
    setFormData,
    validateForm,
    changeObsecurity,
    isObsecure,
    resetStore,
  } = useSignupForm();

  const { setEmail } = usePinVerification();

  const navigate = useNavigate();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(name, value);
    validateForm();
  }

  async function handleValidation() {
    if (errorMessage !== "") {
      toast(errorMessage, {
        type: "error",
        position: "top-center",
      });
      localStorage.setItem("isLogin", "false");
    } else {
      setIsLoading(true);
      var data = await signup(
        formData.profile,
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      if (data.success) {
        setEmail(formData.email);
        localStorage.setItem("token", data.token ?? "");
        navigate("/signup/pin", { replace: true });

        resetStore();
      } else {
        toast(data.message, {
          position: "top-center",
          type: "error",
        });
      }
      setIsLoading(false);
    }
  }
  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    const signup = document.getElementById("signupbtn");
    if (e.key === "Enter") {
      signup?.focus();
      signup?.click();
    }
  }

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <RegistrationBg>
      <p className="login-txt text-xl font-semibold mt-2">SignUp</p>
      <p className="text-sm mt-1">Enter your credentials to signup</p>
      <span className="mt-5" />
      <AppImagePick
        setFormData={(name, value) => {
          setFormData("profile", value!);
          validateForm();
          console.log(value);
        }}
      />
      <span className="mt-5" />
      <div className="row">
        <AppField
          defaultValue={formData.firstName}
          label="FirstName"
          name="firstName"
          type="text"
          onChange={handleInput}
        />
        <span className="mr-2" />
        <AppField
          defaultValue={formData.lastName}
          label="LastName"
          name="lastName"
          type="text"
          onChange={handleInput}
        />
      </div>
      <span className="mb-4" />
      <AppField
        defaultValue={formData.email}
        label="Email"
        name="email"
        type="email"
        prefixIcon={<FontAwesomeIcon icon={faEnvelope} />}
        onChange={handleInput}
      />
      <span className="mb-4" />
      <AppField
        defaultValue={formData.password}
        label="Password"
        name="password"
        onChange={handleInput}
        type={isObsecure ? "password" : "text"}
        prefixIcon={<FontAwesomeIcon icon={faLock} />}
        suffixIcon={
          <FontAwesomeIcon
            onClick={changeObsecurity}
            icon={isObsecure ? faEyeSlash : faEye}
          />
        }
        onKeyUp={handleKeyPress}
      />
      <span className="mb-4" />
      <AppButton id="signupbtn" className="mt-2" onClick={handleValidation}>
        {
          isLoading?<PulseLoader color="white"/>:"SignUp"
        }
      </AppButton>
      <OrDivider className="mt-3" />
      <TextButton
        className="mt-2"
        text="Already have an account?"
        onClick={() => {
          navigate("/login", { replace: true });
        }}
      />
    </RegistrationBg>
  );
}

export default SignUp;
