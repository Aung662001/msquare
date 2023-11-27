"use client"
import React from 'react'
import CreateCourses from "../../components/admin/CreateCourses/CreateCourses"
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar"
import Heading from '../../../app/utils/Heading'
import Header from '@/app/components/admin/Header/Header'
type Props = {}

const page = (props: Props) => {
  return (
    <div>
            <Heading
            title={`Admin - MSQUARE`}
            description="Manage courses, manage students"
            keywords="learning,programming,msquare,react,nextjs,mysql"
            />
    <div className='h-[200vh]'>
      <div className={` 1500px:w-[18%] w-1/5`}>
        <AdminSidebar/>
      </div>
      <Header/>
      <div className='w-[80%] float-right mt-10 dark:text-white text-black'>
        <CreateCourses/>
      </div>
    </div>
    </div>
  )
}

export default page