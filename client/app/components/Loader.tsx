"use client";
import { Box, CircularProgress } from '@mui/material';
import React,{FC, useEffect, useState} from 'react';
import  {
    circularProgressClasses,
  } from '@mui/material/CircularProgress';

type Props = {

}

const Loader:FC<Props> = () => {
  return (
    <div style={{ position: 'relative' }} className={`w-full h-[calc(100vh-80px)] flex items-center justify-center`}>
      <div className={`loader`}></div>
   </div>
  )
}

export default Loader;