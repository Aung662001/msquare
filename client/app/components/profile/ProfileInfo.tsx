"use client"
import { Avatar } from '@mui/material'
import React,{useState} from 'react'
import { useSelector } from 'react-redux'

type Props = {}
const styles= {
    label:"font-Poppins text-[18px] text-black dark:text-white",
    input:'mt-5 outline-none rounded-sm h-8 p-2 bg-transparent border-[1px] focus:border-green-600 w-full text-black dark:text-white',
    button:"border-[1px]  justify-self-start px-10 py-2 rounded-lg hover:scale-105 hover:border-green-500 transition-scale text-black dark:text-white"
}

const ProfileInfo = (props: Props) => {
    const {user} = useSelector((state:any)=>(state.auth))
    const [name,setName] = useState(user.name || "")
  return (
    <div className='h-[450px] ms-9  w-full  border-gray-300  rounded-sm  mt-[80px] mb-[80px] grid grid-cols-1 800px:grid-cols-2 justify-items-center auto-rows-max gap-5 border-0'>
        {
           (user && user.avatar && user.avatar.url)  ? <Avatar sx={{ width: 100, height: 100 }} src={user.avatar.url} className="800px:col-span-2 m-auto" />:<Avatar/>
        }
        <div className='h-24 w-full'>
            <label htmlFor="name" id='name' className={`${styles.label} name `}>Full Name</label><br/>
            <input type="text" id='name' value={name} className={`${styles.input} `}/>
        </div>
        <div className='w-full'>
            <label htmlFor="email" id='email' className={`${styles.label} email`}>Email</label><br/>
            <input type="text" id='email' placeholder={user.email ||""} className={`${styles.input} `}disabled/>
        </div>
        <button className={`${styles.button}`}>Update</button>
    </div>
  )
}

export default ProfileInfo