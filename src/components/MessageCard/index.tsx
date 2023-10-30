import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const index = ({ item }) => {
   const [open, setOpen] = useState(false)
   const { id, firstname, lastname, img, message } = item
   return (
      <div className="relative flex cursor-pointer hover:dim-bg-yellow transition items-center w-[100%] mb-3 p-2 mx-auto rounded-xl h-[70px] border">
         <div className="h-[55px] w-[65px] rounded-xl min-w-[55px] overflow-hidden mr-2">
            <img src={img} className='w-full h-full object-cover' alt="model image" />
         </div>
         <div>
            <p className="text-sm font-bold mb-1 base-color">{firstname + ' ' + lastname}</p>
            <span className="flex items-center text-xs text-gray-500">{message}</span>
         </div>
         <span onClick={() => setOpen(prev => !prev)} className='ml-auto cursor-pointer active:opacity-70 pr-2' ><IoIosArrowForward /></span>
         {open && (<div onMouseLeave={() => setOpen(false)} className='shadow z-10 absolute right-10 flex flex-col rounded-xl overflow-hidden bg-gray-100 w-[10rem]'>
            <span className='h-full w-full p-4 pl-6 hover:dim-bg-yellow cursor-pointer text-sm border-b'>View</span>
            <span className='h-full w-full p-4 pl-6 hover:dim-bg-yellow cursor-pointer text-sm'>Delete Job</span>
         </div>)}
      </div>
   )
}

export default index