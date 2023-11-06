// NotFound.js
import React, { useEffect } from 'react';
import styles from "./NotFound.module.css";
import TextButton from 'components/AppButtons/TextButton';
import { useNavigate } from 'react-router-dom';
import lottie from "lottie-web";
import lottieFile from "../../assets/animations/not_found.json";


const NotFound = () => {
  const navigate=useNavigate();
  function handleOnClick()
  {
    navigate("/",{replace:true});
  }


useEffect(()=>{
  const container=document.getElementById("lottie");
  if(container){
    lottie.loadAnimation({
      container:container,
      animationData:lottieFile,
      loop:true,
      autoplay:true,
      renderer:"svg",

    }
    );
  }
 
},[]);


  return (
    <div className='flex items-center justify-center h-screen' >
      <div className={styles.container}>
      <h1 className={styles.notFoundHeader}>404 - Not Found</h1>
     
    <div  className={styles.image} id='lottie'/>
      <p className={styles.notFoundText}>The page you are looking for does not exist.</p>
      <div className='mt-4'/>
      <TextButton text='Go to Home' className='text-xl underline' onClick={handleOnClick}/>
      

    </div>
    </div>
  );
};

export default NotFound;
