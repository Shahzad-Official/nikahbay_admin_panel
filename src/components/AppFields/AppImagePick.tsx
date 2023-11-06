import React, { ChangeEvent } from 'react';
import './AppImagePick.css';
import personicon from '../../assets/icons/personicon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import useImagePick from 'hooks/useImagePick';

interface AppImagePickProps{
  setFormData:(name:string,file?:string)=>void;
}

function AppImagePick({setFormData}:AppImagePickProps) {
  const {profile,setProfile}=useImagePick();
  const handleIconClick = () => {
    const fileInput = document.getElementById('file-input');
    fileInput?.click();
  };
  function convertToBase64(file:any){
   
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
       setProfile(reader.result?.toString());
       setFormData("file",reader.result?.toString());
    };
    reader.onerror=(err)=>{
        console.log(err);
    }
   
}
function onChange(e:ChangeEvent<HTMLInputElement>){
  const file=e.target.files??"";
    convertToBase64(file[0]);
}
  return (
    <div>
      <img className="avatar" src={profile==null||profile===""? personicon:profile} alt="profile" />

      <input
        id="file-input"
        name={"file"}
        type="file"
        accept=".jpg, .jpeg, .png,"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <span className="icon-btn" onClick={handleIconClick}>
        <FontAwesomeIcon icon={faCamera} />
      </span>
    </div>
  );
}

export default AppImagePick;
