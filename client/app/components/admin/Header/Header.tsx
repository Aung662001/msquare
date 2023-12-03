import { NotificationsOutlined } from '@mui/icons-material'
import ThemeSwitcher from '../../../ThemeSwitcher'
import React, { useState } from 'react'

type Props = {

}

const Header = ({}: Props) => {
  const [open ,setOpen] = useState(false)
  return (
    <div>
        <div className="relative">
      <div className="right-4  top-7 fixed flex">
        <ThemeSwitcher/>
        <div>
          <span className="w-2 h-2 border rounded-full absolute right-0 bg-red-500"></span>
          <NotificationsOutlined onClick={() => setOpen(!open)} className="dark:text-white text-black text-[30px]"/>
        </div>
      </div>
      {open && (
        <div className="w-96 fixed  top-14 right-7 dark:text-white text-black  dark:bg-[#111C43] bg-gray-100 p-3 rounded-sm overflow-y-scroll max-h-[500px]">
          <h2 className="text-[1.5rem] font-bold text-center">Notifications</h2>
            <div className="border-gray-100 border-l-0 border-r-0 border-b-0 border mb-2">
            <div className="flex gap-5 mb-3">
              <p className="font-bold">New Notification Received</p>
              <p className='cursor-pointer'>Mark as read</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              alias dignissimos non beatae autem ducimus molestias eveniet itaque
              consectetur exercitationem unde quidem id deleniti aliquam, ullam
              recusandae perferendis aliquid dolore?
            </p>
            <i><small>5 days ago</small></i>
          </div>
          <div className="border-gray-100 border-l-0 border-r-0 border-b-0 border mb-2">
            <div className="flex gap-5 mb-3">
              <p className="font-bold">New Notification Received</p>
              <p className='cursor-pointer'>Mark as read</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              alias dignissimos non beatae autem ducimus molestias eveniet itaque
              consectetur exercitationem unde quidem id deleniti aliquam, ullam
              recusandae perferendis aliquid dolore?
            </p>
            <i><small>5 days ago</small></i>
          </div>
          <div className="border-gray-100 border-l-0 border-r-0 border-b-0 border mb-2">
            <div className="flex gap-5 mb-3">
              <p className="font-bold">New Notification Received</p>
              <p className='cursor-pointer'>Mark as read</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              alias dignissimos non beatae autem ducimus molestias eveniet itaque
              consectetur exercitationem unde quidem id deleniti aliquam, ullam
              recusandae perferendis aliquid dolore?
            </p>
            <i><small>5 days ago</small></i>
          </div>
          <div className="border-gray-100 border-l-0 border-r-0 border-b-0 border mb-2">
            <div className="flex gap-5 mb-3">
              <p className="font-bold">New Notification Received</p>
              <p className='cursor-pointer'>Mark as read</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              alias dignissimos non beatae autem ducimus molestias eveniet itaque
              consectetur exercitationem unde quidem id deleniti aliquam, ullam
              recusandae perferendis aliquid dolore?
            </p>
            <i><small>5 days ago</small></i>
          </div>
          <div className="border-gray-100 border-l-0 border-r-0 border-b-0 border mb-2">
            <div className="flex gap-5 mb-3">
              <p className="font-bold">New Notification Received</p>
              <p className='cursor-pointer'>Mark as read</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              alias dignissimos non beatae autem ducimus molestias eveniet itaque
              consectetur exercitationem unde quidem id deleniti aliquam, ullam
              recusandae perferendis aliquid dolore?
            </p>
            <i><small>5 days ago</small></i>
          </div>
          <div className="border-gray-100 border-l-0 border-r-0 border-b-0 border mb-2">
            <div className="flex gap-5 mb-3">
              <p className="font-bold">New Notification Received</p>
              <p className='cursor-pointer'>Mark as read</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              alias dignissimos non beatae autem ducimus molestias eveniet itaque
              consectetur exercitationem unde quidem id deleniti aliquam, ullam
              recusandae perferendis aliquid dolore?
            </p>
            <i><small>5 days ago</small></i>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
export default Header