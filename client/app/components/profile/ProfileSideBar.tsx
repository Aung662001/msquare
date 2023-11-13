import { Avatar } from "@mui/material";
import React from "react";
import KeyIcon from "@mui/icons-material/Key";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { VscDashboard } from "react-icons/vsc";
import useAdminProtected from "@/app/hooks/useAdmin";
import { useSelector } from "react-redux";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logoutHandler: () => void;
};
export const styles = {
  h5: "ms-2 font-Poppins dark:font-[600] font-[700] dark:text-white text-black hidden 800px:block",
  icon:"text-black dark:text-white",
  navItem:"cursor-pointer w-full h-[60px] flex items-center 800px:ps-4 ps-2 hover:scale-105 transition-all rounded-sm"
};
const ProfileSideBar = ({ active, setActive, avatar,logoutHandler }: Props) => {
  const {user} = useSelector((state:any)=>state.auth);
  return (
    <div>
      <div
        className={`${
          active == 1 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        } ${styles.navItem}`}
        onClick={()=>{setActive(1)}}
      >
        {avatar ? (
          <Avatar sx={{ width: 40, height: 40 }} src={avatar} className="" />
        ) : (
          <Avatar />
        )}
        <h5 className={styles.h5}>My Account</h5>
      </div>
      <div
        className={`${
          active == 2 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        } ${styles.navItem}`}
        onClick={()=>{setActive(2)}}

      >
        <KeyIcon sx={{ width: 40, height: 40 }} className={styles.icon}/>
        <h5 className={styles.h5}>Change Password</h5>
      </div>

      <div
        className={`${
          active == 3 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        } ${styles.navItem}`}
        onClick={()=>{setActive(3)}}

      >
        <LocalLibraryIcon sx={{ width: 40, height: 40 }} className={styles.icon}/>
        <h5 className={styles.h5}>Enrolled Courses</h5>
      </div>

        {/* for admin */}
        {user.role === 'admin' &&<Link href={"/admin"}
        className={`${
          active == 100 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        } ${styles.navItem}`}
        onClick={()=>{setActive(100)}}

      >
        <VscDashboard style={{ width: 40, height: 40 }} className={styles.icon}/>
        <h5 className={styles.h5}>Admin Dashboard</h5>
      </Link>}
        {/* for admin */}

      <div
        className={`${
          active == 4 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        } ${styles.navItem}`}
        onClick={logoutHandler}

      >
        <ExitToAppIcon sx={{ width: 40, height: 40 }} className={styles.icon}/>
        <h5 className={styles.h5}>Logout</h5>
      </div>
    </div>
  );
};

export default ProfileSideBar;
