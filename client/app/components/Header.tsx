"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeNumber: number;
}
const Header: FC<Props> = ({ activeNumber, open, setOpen }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

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
              <HiOutlineUserCircle
                size={25}
                onClick={() => setOpen(false)}
                className="cursor-pointer mx-4 hidden 800px:block dark:text-white text-black"
              />
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
              <div className="w-full ">
                {" "}
                <HiOutlineUserCircle
                  size={30}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer  dark:text-white text-black mx-auto hover:scale-[1.3] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
