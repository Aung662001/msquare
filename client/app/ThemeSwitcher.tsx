'use client';
import { useTheme } from 'next-themes';
import React,{useEffect, useState} from 'react'
import {BiMoon,BiSun} from 'react-icons/bi';
const ThemeSwitcher = () => {
    const [mount,setMount] = useState(false);
    const {theme,setTheme} = useTheme();
    useEffect(()=>{
        setMount(true)
    },[])
    if(!mount){return null}
  return (
    <div className="flex items-center justify-center mx-4">
        {
            theme ==="light"?(
                <BiMoon 
                className="cursor-pointer"
                fill='black'
                size={25}
                onClick={() => setTheme("dark")}
                />
            ):(
                <BiSun
                className="cursor-pointer"
                size={25}
                onClick={() => {
                    setTheme("light")
                }}
                />
            )
        }
    </div>
  )
}

export default ThemeSwitcher