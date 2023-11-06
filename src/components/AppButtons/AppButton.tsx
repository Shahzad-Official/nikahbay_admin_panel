import React, { ReactNode } from 'react';
import "./AppButton.css";

interface AppButtonProps{
  children?:ReactNode,
  id?:string,
  className?:string,
  onClick?:()=>void,
}

function AppButton({id,children="",className="",onClick}:AppButtonProps) {
  return (
    <button id={id} onClick={onClick} className={`${className} primary-button`}>
        {children}
    </button>
  )
}

export default AppButton