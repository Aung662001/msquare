"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

interface Props {}

const Page: FC<Props> = (props) => {
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
    </div>
  );
};
export default Page;
