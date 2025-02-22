import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';

const SingleColor = ({rgb, weight, index}) => {

  const [alertCopyClipboard, setAlertCopyClipboard] = useState(false);
  const bcg = rgb.join(',');
  const hex = rgbToHex(...rgb);

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setAlertCopyClipboard(false);
    },3000)
    return ()=>clearTimeout(timeout);
  },[alertCopyClipboard])

  return <article className={`color ${index > 100 && 'color-light'}`}
  style={{backgroundColor:`rgb(${bcg})`}}
  onClick={()=>{
    setAlertCopyClipboard(true);
    navigator.clipboard.writeText(hex);
  }}>
    <p className="percent-value">
      {weight}%
    </p>
    <p className="color-value">
      {hex}
    </p>
    {alertCopyClipboard && <p className="alert">copied to clipboard</p>}
  </article>
};

export default SingleColor;
