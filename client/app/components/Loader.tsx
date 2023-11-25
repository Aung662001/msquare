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
    <div style={{ position: 'relative' }} className={`w-full h-full flex items-center justify-center`}>
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
        animationDuration: '550ms',
        position: 'absolute',
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      }}
      size={40}
      thickness={4}
    />
  </div>
  )
}

export default Loader;