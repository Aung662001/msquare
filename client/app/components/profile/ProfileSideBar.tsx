import { Avatar } from "@mui/material";
import React from "react";
import KeyIcon from "@mui/icons-material/Key";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logoutHandler: () => void;
};
const styles = {
  h5: "ms-2 font-Poppins font-[600] dark:text-white text-black",
  icon:"text-black dark:text-white",
  navItem:"cursor-pointer w-full h-[60px] flex items-center ps-4 hover:scale-105 transition-all rounded-sm"
};
const ProfileSideBar = ({ active, setActive, avatar }: Props) => {
  return (
    <div>
      <div
        className={`${
          active == 1 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        } ${styles.navItem}`}
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
      >
        <KeyIcon sx={{ width: 40, height: 40 }} className={styles.icon}/>
        <h5 className={styles.h5}>Change Password</h5>
      </div>
    </div>
  );
};

export default ProfileSideBar;
