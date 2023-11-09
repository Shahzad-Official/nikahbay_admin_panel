import React, { ReactNode } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

function IconButton({ className, children, onClick }: IconButtonProps) {
  return <div className={`${className}  ${styles.iconbtn}`} onClick={onClick}>{children}</div>;
}

export default IconButton;
