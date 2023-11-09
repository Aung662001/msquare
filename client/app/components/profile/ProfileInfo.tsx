"use client"
import { Avatar } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useUpdateProfileImageMutation, useUpdateProfileMutation } from '@/redux/features/user/userApiSlice'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import toast from 'react-hot-toast'

type Props = {}
export const styles= {
    label:"font-Poppins text-[18px] text-black dark:text-white",
    input:'mt-5 outline-none rounded-sm h-8 p-2 bg-transparent border-[1px] focus:border-green-600 w-full text-black dark:text-white',
    button:"border-[1px]  justify-self-start px-10 py-2 rounded-lg hover:scale-105 hover:border-green-500 transition-scale text-black dark:text-white"
}
const ProfileInfo = (props: Props) => {
    const {user} = useSelector((state:any)=>(state.auth))
    const [updateProfileImage,{isSuccess,error}] = useUpdateProfileImageMutation();
    const [updateProfile,{isError,isSuccess:success}]= useUpdateProfileMutation();
    const [name,setName] = useState(user.name || "");
    const [email,setEmail] = useState(user.email || "");
    const [loadUser,setLoadUser] = useState(false);
    const {} = useLoadUserQuery(undefined,{skip:!loadUser});

   function imageHandler(e:any){
        const fileReader = new FileReader();
        fileReader.onload= ()=>{
            if(fileReader.readyState === 2){
                const avatar = fileReader.result;
                updateProfileImage(avatar);
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    };
    async function updateProfileInfo(){
        if(!name.length){
            return false;
        }
       await updateProfile(name)
    }
    useEffect(()=>{
        if(isSuccess || success){
            toast.success("Profile updated successfully")
            setLoadUser(true)
        }
        if(error ){
            console.log(error);
            toast.error("Upload profile image failed");
        }
        if(isError){
            toast.error("Failed to update")
        }
    },[isSuccess,success,error,isError])
  return (
    <div className='h-[450px] ms-9  w-full  border-gray-300  rounded-sm  mt-[80px] mb-[80px] grid grid-cols-1 800px:grid-cols-2 justify-items-center auto-rows-max gap-5 border-0'>
       <div className="800px:col-span-2 m-auto relative" >
        {
            user && user.avatar && user.avatar.url ? <Avatar sx={{ width: 100, height: 100 }} src={user.avatar.url} />:<Avatar/>
        }
        <span>
            <input type="file" className='hidden' id='avatar' name='avatar' onChange={imageHandler} accept='image/png,image/jpg,image/jpeg,image/wepg'/>
            <label htmlFor='avatar'>
                <div className='cursor-pointer absolute bottom-0 right-0'>
                    <AiOutlineCamera/>
                </div>
            </label>
        </span>
        </div>
        <div className='h-24 w-full'>
            <label htmlFor="name"  className={`${styles.label} name `}>Full Name</label><br/>
            <input type="text" id='name' value={name} className={`${styles.input} `} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='w-full'>
            <label htmlFor="email"  className={`${styles.label} email`}>Email</label><br/>
            <input type="text" id='email' placeholder={user.email ||""} className={`${styles.input} `} readOnly/>
        </div>
        <button className={`${styles.button}`} onClick={updateProfileInfo}>Update</button>
    </div>
  )
}

export default ProfileInfo