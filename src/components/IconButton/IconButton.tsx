import React, { ReactNode } from "react";
import "./IconButton.css";

interface IconButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

function IconButton({ className, children, onClick }: IconButtonProps) {
  return <div className={`${className}  icon-btn`}>{children}</div>;
}

export default IconButton;
