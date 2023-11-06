import React from 'react'
import "./AppAvatar.css";
import personSvg from "../../assets/icons/personicon.svg";
interface AppAvatarProps{
    src?:string;
}


function AppAvatar({src=personSvg}:AppAvatarProps) {
  return (
    <div className='app-avatar'>
        <img src={src} alt="avatar" />
    </div>
  )
}

export default AppAvatar