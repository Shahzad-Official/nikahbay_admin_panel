import React from 'react';
import styles from "./OrDivider.module.css";

function OrDivider({className=""}) {
  return (
    <div className={`${className} ${styles.box}`}>
        <div className={styles.divider}/>
        <p className='ml-1 mr-1'> OR </p>
        <div className={styles.divider}/>
    </div>
  )
}

export default OrDivider