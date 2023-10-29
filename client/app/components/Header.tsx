"use client";
import Link from "next/link";
import React, { FC, useState ,useEffect} from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux";
import {useSession} from "next-auth/react"
import { useSocialAuthMutation } from "@/redux/features/auth/authApiSlice";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeNumber: number;
}
const Header: FC<Props> = ({ activeNumber, open, setOpen }) => {
  const {user} = useSelector((state:any)=>state.auth)
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [route, setRoute] = useState("login");
  const {data} = useSession();
  const [socialAuth,{isSuccess,error}] = useSocialAuthMutation();

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  const handleClose = (e: any) => {
    if (e.target.id === "sidebar") {
      setOpenSidebar(false);
    }
  };
  useEffect(() => {
      if(!user){
        if(data){
          // {url:user.data?.image,public_id:Math.random()}
          socialAuth({name:data.user?.name,email:data.user?.email,avatar:{url:data.user?.image,public_id:Math.random()}})
        }
      }
      if(isSuccess){
        toast.success("Login success")
      }
      if(error){
        toast.error("Login error")
      }
  }, [error,data,isSuccess,user])
  console.log(user)
  console.log(data)
  return (
    <div className="w-full relative ">
      <div
        className={`${
          true
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-grey-700 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffffc1] shadow-xl transition-all duration-700"
            : "w-full border-b-2 dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow-sm"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-full flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                M SQUARE
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeNumber={activeNumber} isMobile={false} />
              <ThemeSwitcher />
              {/* menu open hambargar */}
              <div className="800px:hidden mx-4">
                <HiOutlineMenuAlt3
                  size={25}
                  onClick={() => setOpenSidebar(true)}
                  className="cursor-pointer dark:text-white text-black"
                />
              </div>
              {/* profile */}
                { user? user.avatar?
                 <Link href={"/profile"}><Avatar alt="Avater" src={user.avatar.url} className="cursor-pointer" sx={{width:30,height:30}}/></Link>:
                 <Link href="/profile"><Avatar sx={{width:30,height:30}} className="cursor-pointer"/></Link>:
                (
                  <HiOutlineUserCircle
                  size={30}
                  onClick={() => setOpen(true)}
                  className="cursor-pointer  dark:text-white text-black mx-auto hover:scale-[1.3] transition-transform duration-300"
                />
                )
                }
            </div>
          </div>
        </div>
        {/* for mobile */}
        {openSidebar && (
          <div
            className=" h-screen  w-full bg-transparent z-[99999999]"
            onClick={handleClose}
            id="sidebar"
          >
            <div className="bg-white opacity-[0.9] z-50 dark:bg-gray-900 h-screen w-[70%] top-0 right-0 absolute border-l-2">
              <NavItems activeNumber={activeNumber} isMobile={true} />
              <div className="w-full flex items-center justify-center">
                {user? user.avater? 
                 <Link href={"/profile"}><Avatar alt="Avater" src={user.avater} className="cursor-pointer"/></Link>:
                 <Link href="/profile"><Avatar sx={{width:30,height:30}} className="cursor-pointer"/></Link>:
                (
                  <HiOutlineUserCircle
                  size={30}
                  onClick={() => setOpen(true)}
                  className="cursor-pointer  dark:text-white text-black mx-auto hover:scale-[1.3] transition-transform duration-300"
                />
                )
                }
              </div>
            </div>
          </div>
        )}
      </div>
      {
         route == "login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeNumber={activeNumber}
              component={Login}
            />
          )}
        </>
         )
      }
      {
         route == "sign-up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeNumber={activeNumber}
              component={SignUp}
            />
          )}
        </>
         )
      }
       {
         route == "verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeNumber={activeNumber}
              component={Verification}
            />
          )}
        </>
         )
      }
    </div>
  );
};

export default Header;
