import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { BsThreeDotsVertical, BsPeople, BsPlusLg } from 'react-icons/bs'
import { IoIosArrowDropdown } from 'react-icons/io'

const AppliedCard = ({ item }) => {
   const { id, firstname, lastname, img, status, job } = item
   return (
      <div className="relative flex cursor-pointer hover:dim-bg-yellow transition items-center w-[100%] mb-3 p-2 mx-auto rounded-xl h-[70px] border">
         <div className="h-[55px] w-[65px] rounded-xl overflow-hidden mr-2">
            <img src={img} className='w-full h-full object-cover' alt="model image" />
         </div>
         <div>
            <p className="text-sm font-bold mb-1 base-color">{firstname + ' ' + lastname}</p>
            <span className="flex items-center text-xs text-gray-500">{job}</span>
            <span className={`${status === 'Pending' ? 'text-yellow-300' : ''} ${status === 'Not Accepted' ? 'text-red-500' : ''} ${status === 'Accepted' ? 'text-green-400' : ''} flex font-bold items-center text-sm text-gray-500`}>{status}</span>
         </div>
         <span className='ml-auto cursor-pointer active:opacity-70 pr-2' ><IoIosArrowForward /></span>
      </div>
   )
}

export default AppliedCard