import React from 'react';
import "./Badge.css";


function Badge({count=2,className=""}:{count?:number|string,className?:string}) {
  return (
    <div className={`${className} badge`}>
        {count}
    </div>
  )
}

export default Badge