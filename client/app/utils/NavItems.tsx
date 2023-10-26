import Link from "next/link";
import React, { FC } from "react";

interface Props {
  activeNumber: number;
  isMobile: boolean;
}
export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];
const NavItems: FC<Props> = ({ activeNumber, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => {
            return (
              <Link href={item.url} key={index} passHref className="hover:scale-[1.1] transition-transform duration-300">
                <span
                  className={`text-[18px] px-6 font-Poppins font-[400] 
                        ${
                          activeNumber === index
                            ? "dark:text-sky-300 text-[crimson]"
                            : "dark:text-white text-black"
                        }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            {navItemsData &&
              navItemsData.map((item, index) => {
                return (
                  <Link href={item.url} key={index} passHref>
                    <span
                      className={`block text-[18px] py-5 px-6 font-Poppins font-[400] hover:scale-[1.3]  transition-transform duration-300
                        ${
                          activeNumber === index
                            ? "dark:text-sky-300 text-[crimson]"
                            : "dark:text-white text-black"
                        }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
