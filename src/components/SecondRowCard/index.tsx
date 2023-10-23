import React from 'react'
import { Recommendations } from '../../../types'


const index = ({ models }) => {
   const { id, firstname, lastname, img, desc } = models
   return (
      <div className='flex items-center p-2 w-full h-[60px] bg-white rounded-xl mb-2'>
         <div className='w-[50px] h-full rounded-2xl overflow-hidden mr-3'>
            <img src={img} className='w-full h-full object-cover' alt="models image" />
         </div>
         <div className='flex flex-col'>
            <p className='text-sm font-bold flex items-center gap-1'><span>{firstname}</span>  <span className='hidden md:flex'>{lastname}</span></p>
            <p className='hidden md:block text-xs text-gray-500'>{desc}</p>
         </div>
         <div className='ml-auto flex flex-nowrap'>
            <button className='border hover:dim-bg-yellow text-sm px-5 p-3 rounded-xl'>
               Follow
            </button>
            <button className='base-bg-color text-white text-sm px-5 p-3 ml-2 rounded-xl'>
               View
            </button>
         </div>
      </div>
   )
}

export default index