import React from 'react'
import { IoIosArrowForward, IoMdNotificationsOutline } from 'react-icons/io'
import { BsPerson, BsPersonVcard } from 'react-icons/bs'
import { BiNotepad, BiSupport } from 'react-icons/bi'
import Link from 'next/link'
import { APP_ROUTES } from 'lib/routes'
import { GoPerson } from 'react-icons/go'
import { CiEdit } from 'react-icons/ci'
import { TbLogout2 } from 'react-icons/tb'

const Settings = () => {
   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 w-[100%] my-0 flex flex-col items-center">
         <div className='relative max-w-[1000px] flex justify-between w-full'>
            <h1 className='text-xl px-5 font-bold mt-8 text-left mb-2 mr-auto'>General</h1>
         </div>
         <div className='w-full md:w-[95%] max-w-[1000px] bg-white py-5 lg:py-6 rounded-2xl'>
            <Link href={APP_ROUTES.bioData} className="flex justify-between items-center hover:dim-bg-yellow transition cursor-pointer p-5 active:opacity-70">
               <p className='flex items-center gap-x-4'><BsPersonVcard className='text-xl' /> Biodata</p>
               <span><IoIosArrowForward /></span>
            </Link>
            <Link href={APP_ROUTES.accountInfo} className="flex justify-between items-center hover:dim-bg-yellow transition cursor-pointer p-5 active:opacity-70">
               <p className='flex items-center gap-x-4'><GoPerson className='text-xl' /> Account Information</p>
               <span><IoIosArrowForward /></span>
            </Link>
            <Link href={APP_ROUTES.setNotification} className="flex justify-between items-center hover:dim-bg-yellow transition cursor-pointer p-5 active:opacity-70">
               <p className='flex items-center gap-x-4'><IoMdNotificationsOutline className='text-xl' /> Notification</p>
               <span><IoIosArrowForward /></span>
            </Link>
            <div className="flex justify-between items-center hover:dim-bg-yellow transition cursor-pointer p-5 active:opacity-70">
               <p className='flex items-center gap-x-4'><CiEdit className='text-xl' /> Change Password</p>
               <span><IoIosArrowForward /></span>
            </div>
         </div>

         <div className='relative max-w-[1000px] flex justify-between w-full'>
            <h1 className='text-xl px-5 font-bold mt-8 text-left mb-2 mr-auto'>Support</h1>
         </div>
         <div className='w-full md:w-[95%] max-w-[1000px] bg-white py-5 lg:py-6 rounded-2xl'>
            <div className="flex justify-between items-center hover:dim-bg-yellow transition cursor-pointer p-5 active:opacity-70">
               <p className='flex items-center gap-x-4'><BiSupport className='text-xl' /> Help & Support</p>
               <span><IoIosArrowForward /></span>
            </div>
            <Link href={APP_ROUTES.privacy} className="flex justify-between items-center hover:dim-bg-yellow transition cursor-pointer p-5 active:opacity-70">
               <p className='flex items-center gap-x-4'><BiNotepad className='text-xl' /> Terms & Condition</p>
               <span><IoIosArrowForward /></span>
            </Link>
            <div className="flex justify-between items-center hover:dim-bg-yellow transition cursor-pointer p-5 active:opacity-70">
               <p className='flex items-center gap-x-4'><TbLogout2 className='text-xl' /> Log Out</p>
               <span><IoIosArrowForward /></span>
            </div>
         </div>
      </div>
   )
}

export default Settings