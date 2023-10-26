import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[80%] flex items-center justify-center">
        <div>
          <img
            src="https://yt3.googleusercontent.com/ytc/APkrFKaaHFS2A90x4A36ss8ZD-Jud2qr1mtz4peq1MJS=s176-c-k-c0x00ffffff-no-rj"
            alt="msquare image"
            className="inline w-[200px] h-[200px] rounded-full"
          />
        </div>
        <div>
          <h1 className="inline text-[30px] font-[800] ml-4 header text-black dark:text-gray-500">
            WELLCOM TO MSQUARE PROGRAMMING
          </h1>
          <br />
          <h2 className="mt-6 ml-4 moti text-black dark:text-gray-500">Let Make Your Future Together!</h2>
          <p className=" mt-6 ml-4 stdcount text-black dark:text-gray-500">
            1000+ students are building their future at{" "}
            <span className="msquare dark:before:bg-black dark:shadow-[5px 5px 20px black] before:bg-white">msquare!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
