'use client';
import React,{FC,} from "react";
import Header from "./utils/Heading";

interface Props{}

const Page:FC<Props> = (props)=>{
  return(
    <div>
      <Header 
      title="MSquare"
      description="You want , you try"
      keywords="learning,programming,msquare,react,nextjs,mysql"
      />
    </div>
  )
}
export default Page;