'use client'
import React,{useState} from "react";
import Heading from "../utils/Heading";
 import AdminSidebar from "../components/admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/useAdmin";

type Props = {};

const page = (props: Props) => {
    const [active,setActive] = useState(0)
  return (
    <div>
        <AdminProtected>
            <Heading
            title={`Admin - MSQUARE`}
            description="Manage courses, manage students"
            keywords="learning,programming,msquare,react,nextjs,mysql"
            />
        <div className="flex h-[100vh]">
            <div className="1500px:w-[18%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[80%]"></div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
