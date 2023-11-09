import React, { ReactNode } from "react";
import styles from "./AppBody.module.css";
import AppAvatar from "../AppAvatar/AppAvatar";
import BellIcon from "assets/icons/BellIcon";
import Badge from "components/Badge/Badge";
interface AppBodyProps {
  children?: ReactNode;
}

export default function AppBody({ children }: AppBodyProps) {
  return (
    <div className={styles['body-box']}>
      <div className="row ">
        <span />

        <span className="flex flex-row items-center">
          <span className="relative mr-4">
            <BellIcon />
            <Badge count={"21"} />
          </span>
          <AppAvatar />
          <p className="ml-2 mr-2 text-xl ">Hi , Shahzad</p>
        </span>
      </div>
      {children}
    </div>
  );
}
