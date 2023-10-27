"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { motion } from "framer-motion";
const ThemeSwitcher = () => {
  const [mount, setMount] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return null;
  }
  return (
    <motion.div
      className="flex items-center justify-center mx-4"
      whileTap={{ rotate: [0, 90, 180], opacity: [1] }}
      transition={{ duration: 0.3 }}
    >
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          fill="black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className="cursor-pointer"
          size={25}
          onClick={() => {
            setTheme("light");
          }}
        />
      )}
    </motion.div>
  );
};

export default ThemeSwitcher;
