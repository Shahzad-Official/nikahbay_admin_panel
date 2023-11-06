import React from "react";
import "./TextButton.css";

interface TextButtonProps {
  disable?:boolean;
  text?: string;
  className?: string;
  onClick?: () => void;
}

function TextButton({
  disable=false,
  text = "text button",
  className = "text-sm",
  onClick,
}: TextButtonProps) {
  return (
    <span onClick={onClick} className={`${className} ${disable?"disable-txt":"txt-btn"} `}>
      {text}
    </span>
  );
}

export default TextButton;
