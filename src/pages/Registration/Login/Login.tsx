import React, { ChangeEvent, useEffect, useState } from "react";
import RegistrationBg from "../RegistrationBg";
import "./Login.css";
import AppField from "components/AppFields/AppField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import useLoginForm from "hooks/useLoginForm";
import TextButton from "components/AppButtons/TextButton";
import { toast } from "react-toastify";
import AppButton from "components/AppButtons/AppButton";
import OrDivider from "components/OrDivider/OrDivider";
import { useNavigate } from "react-router-dom";
import usePinVerification from "hooks/usePinVerification";
import { PulseLoader } from "react-spinners";
import { login } from "../api/auth";
function Login() {
  const [isLoading,setIsLoading]=useState(false);
  const navigate = useNavigate();
  const {
    isObsecure,
    formData,
    setFormData,
    changeObsecurity,
    errorMessage,
    validateForm,
    resetStore,
  } = useLoginForm();

  const {setEmail}=usePinVerification();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setFormData(e.target.name, e.target.value);
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
     const loadingToast= toast.loading("logging in...",{
        position:"top-center",
      });
     const data=await login(formData.email,formData.password);
     if(data.success){
      
      localStorage.setItem("token", `${data.token}`);
      setEmail(formData.email);
      navigate("/login/pin", { replace: true });
      toast.dismiss(loadingToast);
      resetStore();
     }else{
      toast.dismiss(loadingToast);
      toast(data.message, {
        type: "error",
        position: "top-center",
      });
      localStorage.setItem("isLogin", "false");
     }
     setIsLoading(false);
     
    }
  }
  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    const loginBtn = document.getElementById("login");
    if (e.key === "Enter") {
      loginBtn?.focus();
      loginBtn?.click();
    }
  }
  useEffect(() => {
    validateForm();
    localStorage.setItem("isLogin", "false");
  }, [validateForm]);

  return (
    <RegistrationBg>
      <p className="login-txt text-xl font-semibold mt-2">Hi Welcome Back</p>
      <p className="text-sm mt-1">Enter your credentials to login</p>
      <span className="mt-4" />
      <AppField
        defaultValue={formData.email}
        label="Email"
        name="email"
        onChange={handleInput}
        type="email"
        prefixIcon={<FontAwesomeIcon icon={faEnvelope} />}
      />
      <span className="mt-4" />
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
      <TextButton
        className="self-end mt-1"
        text="Forget Password?"
        onClick={() => {
          navigate("/forget-password");
        }}
      />
      <AppButton id={"login"} onClick={handleValidation} className="mt-2">
       {
        isLoading? <PulseLoader  className="self-center pt-1" color="white" />:"Login"
       }
      </AppButton>
      <OrDivider className="mt-3" />
      <TextButton
        className="mt-2"
        text="Do not have an account?"
        onClick={() => {
          navigate("/signup", { replace: true });
        }}
      />
    </RegistrationBg>
  );
}

export default Login;
