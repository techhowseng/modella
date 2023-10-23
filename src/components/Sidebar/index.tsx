import { SITE_NAME } from "lib/constants";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { APP_ROUTES } from "lib/routes";
import { FaBook } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { SlSettings } from "react-icons/sl";
import { TbLogout2 } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiBriefcase } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
import NavLink from 'next/link'
import React, { useState } from 'react'

const navigation = [
   { id: 1, name: "Hire", icon: <GoChecklist />, href: "/hire" },
   { id: 2, name: "My Jobs", icon: <PiBriefcase />, href: "/my-jobs" },
   { id: 3, name: "Message", icon: <AiOutlineMessage />, href: "/message" },
   { id: 5, name: "Notifications", icon: <IoMdNotificationsOutline />, href: "/notification" },
   { id: 6, name: "Profile", icon: <BsPerson />, href: "/profile" },
   { id: 7, name: "Settings", icon: <SlSettings />, href: "/settings" },
];
function Sidebar() {
   return (
      <div className='fixed left-0 z-10 flex flex-col md:w-[17rem] transition-all w-[5rem] h-screen bg-white border-r'>
         <div className="flex flex-col mt-5 md:mt-20 items-center">
            <h1 className="text-2xl font-black base-color md:hidden mb-20">M</h1>
            <div className="md:w-[80px] w-[50px] md:h-[80px] h-[50px] bg-gray-300 rounded-2xl overflow-hidden mb-4">
               <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRlSVVcnT988ksu89xvG1b_-1hU5jct5sXEahmrXSuGlrZUZ0eLcCJbl5VBtIGpjnwxo&usqp=CAU' className="w-full h-full object-cover" alt="user profile" />
            </div>
            <p className="hidden md:block base-color text-xl mb-1 font-black">Andela.Com</p>
            <p className="hidden md:flex items-center text-sm text-gray-400"><SlLocationPin className="text-xl mr-1" /> Capetown, South  Africa</p>
         </div>
         <nav className="flex flex-col justify-center w-[100%] mt-3 lg:mt-10 items-center ">
            {navigation.map((field, index) => (
               <Link className="flex items-center w-[85%] md:w-[90%] text-left rounded-xl pl-6 lg:pl-10 xl:pl-12 md:rounded-2xl py-4 md:py-4 hover:bg-blue-100 hover:base-color active:opacity-70 focus:bg-blue-100 focus:text-blue-500" href={field.href}>
                  <span className='w-[2rem] text-xl'>{field.icon}</span>
                  <p className="hidden md:block text-sm">{field.name}</p>
               </Link>
            ))}
         </nav>
         <div className="flex flex-col justify-center w-[100%] mb-6 mt-auto items-center focus:base-color">
            <span className="mt-auto cursor-pointer flex items-center w-[80%] md:w-[90%] text-left rounded-xl pl-5 lg:pl-10 xl:pl-12 md:rounded-2xl py-4 md:py-4 hover:bg-blue-100 hover:base-color">
               <span className='w-[2rem]'><TbLogout2 className="text-xl" /></span>
               <p className="hidden md:block text-sm">Log Out</p>
            </span>
         </div>

      </div>
   );
}

export default Sidebar;