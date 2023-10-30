"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import { useSelector } from "react-redux";
import {redirect} from "next/navigation"


interface Props {}

const Page: FC<Props> = (props) => {
  const {user } = useSelector((state:any)=>(state.auth))
  if(user){
    redirect("/profile")
  }
  const [open, setOpen] = useState(false);
  const [activeNumber, setActiveNumber] = useState(0);
  return (
    <div>
      <Heading
        title="MSquare"
        description="You want, you try"
        keywords="learning,programming,msquare,react,nextjs,mysql"
      />
      <Header open={open} setOpen={setOpen} activeNumber={activeNumber} />
      <Hero />
    </div>
  );
};
export default Page;
