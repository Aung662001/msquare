"use client";
import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/profile/Profile";
import { useSelector } from "react-redux";
type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeNumber, setActiveNumber] = useState(5);
  const {user} = useSelector((state:any)=>(state.auth))
  return (
    <Protected>
      <Heading
        title={`${user.name}'s profile`}
        description="You want, you try"
        keywords="learning,programming,msquare,react,nextjs,mysql"
      />
      <Header open={open} setOpen={setOpen} activeNumber={activeNumber} setActiveNumber={setActiveNumber}/>
      <Profile user={user}/>
    </Protected>
  );
};

export default page;
