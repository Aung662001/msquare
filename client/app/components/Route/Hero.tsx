import React, { useEffect, useState } from "react";

const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="w-[80%] flex flex-col items-center justify-center 900px:flex-row ">
        <div >
          <img
            src="https://yt3.googleusercontent.com/ytc/APkrFKaaHFS2A90x4A36ss8ZD-Jud2qr1mtz4peq1MJS=s176-c-k-c0x00ffffff-no-rj"
            alt="msquare image"
            className="inline w-[200px] h-[200px] rounded-full"
          />
        </div>
        <div>
          <h1 className="inline text-[20px] font-[600] 900px:text-[30px] 900px:font-[800] ml-4 header text-black dark:text-gray-500">
            WELLCOM TO MSQUARE PROGRAMMING
          </h1>
          <br />
          <h2 className="mt-6 ml-4 moti text-black dark:text-gray-500
          text-[20px] font-[400] 900px:text-[30px] 900px:font-[500]
          ">Let Make Your Future Together!</h2>
          <p className=" mt-6 ml-4 stdcount text-black dark:text-gray-500
          text-[18px] font-[400] 900px:text-[20px] 900px:font-[500]
          ">
            1000+ students are building their future at{" "}
            <span className="msquare dark:after:bg-[#070A11] dark:shadow-[5px 5px 20px black] after:bg-white">msquare!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
