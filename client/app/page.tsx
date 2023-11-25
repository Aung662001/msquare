"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader";


interface Props {}

const Page: FC<Props> = (props) => {
  const {user } = useSelector((state:any)=>(state.auth))
  const [open, setOpen] = useState(false);
  const [activeNumber, setActiveNumber] = useState(0);
  return (
     <div>
      <Heading
        title="MSquare"
        description="You want, you try"
        keywords="learning,programming,msquare,react,nextjs,mysql"
      />
        <Header open={open} setOpen={setOpen} activeNumber={activeNumber} setActiveNumber={setActiveNumber}/>
      <Custom>
        <Hero />
      </Custom>
    </div>
  );
};
const Custom: FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted,setMounted] = useState(false)
  const { isLoading } = useLoadUserQuery({});
  useEffect(()=>{
    setMounted(true)
  },[])
  if(!mounted ){
    return <>
    </>;
  }
  return (
    <div className={`dark:bg-black w-screen`}>
      {(isLoading ) ? <Loader/> : <>{children}</>}
    </div>
  );
};
export default Page;
