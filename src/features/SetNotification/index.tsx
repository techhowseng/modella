import React from 'react'
import { IoIosArrowForward, IoMdNotificationsOutline } from 'react-icons/io'
import { BsEnvelope, BsPerson, BsPersonVcard, BsPhone } from 'react-icons/bs'
import { BiEnvelope, BiNotepad, BiPhone, BiSupport } from 'react-icons/bi'
import Link from 'next/link'
import { APP_ROUTES } from 'lib/routes'
import { GoPerson } from 'react-icons/go'
import { CiEdit } from 'react-icons/ci'
import { TbLogout2 } from 'react-icons/tb'
import Input from 'components/Input'
import Button from 'components/Button'
import { FaPhone, FaPhoneAlt } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'

const SetNotification = () => {
   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-12 py-4 md:py-12 w-[100%] my-0 flex flex-col items-center">
         <div className='relative w-full md:w-[95%] max-w-[700px] flex justify-between'>
            <h1 className='text-xl font-bold mt-8 mb-4'>Notification</h1>
         </div>
         <div className='w-full md:w-[95%] max-w-[700px] bg-white p-10 rounded-2xl text-sm font-bold space-y-7'>
            <p className='text-center capitalize font-light text-gray-400'>Recieve notifications about latest jobs and offers via</p>
            <div className='space-y-6 mt-10'>
               <div className='flex py-2 items-center justify-between cursor-pointer'>
                  <label htmlFor='email' className='flex w-full cursor-pointer gap-x-4 items-center'><BsEnvelope className='text-[18px]' />Emails</label>
                  <input type="radio" name='radio' id='email' />
               </div>
               <div className="flex py-2 items-center justify-between cursor-pointer">
                  <label htmlFor='phone' className='flex w-full cursor-pointer gap-x-4 items-center'><FiPhone className='text-[18px] font-thin' />Phone</label>
                  <input type="radio" name='radio' id='phone' />
               </div>
            </div>
         </div>
      </div>
   )
}

export default SetNotification