import AppLogo from "assets/icons/AppLogo";
import React, { ReactNode } from "react";
import "./RegistrationBg.css";
import { ToastContainer } from "react-toastify";

interface RegistrationBgProps {
  children: ReactNode;
}

function RegistrationBg({ children }: RegistrationBgProps) {
  return (
    <div className="registration-bg">
      <div className="registration-bg-body">
        <div className="bg-block">
          <div className="registration-card">
            <AppLogo />
            {children}
            <ToastContainer className={"flex flex-col"}/>
          </div>
        </div>
        <footer className="flex absolute bottom-2 w-screen justify-between pl-2 pr-2 registration-footer-txt">
          <span> NikahBay.com</span>
          <span> &copy; BytesTechsol</span>
        </footer>
      </div>
    </div>
  );
}

export default RegistrationBg;
