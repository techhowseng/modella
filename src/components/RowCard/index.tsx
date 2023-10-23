import React from 'react'
import { Recommendations } from '../../../types'


const index = ({ models }) => {
   const { id, firstname, lastname, img, country } = models
   return (
      <div className='flex items-center p-2 w-full h-[60px] bg-white rounded-xl mb-2'>
         <div className='w-[50px] h-full rounded-2xl overflow-hidden mr-3'>
            <img src={img} className='w-full h-full object-cover' alt="models image" />
         </div>
         <div className='flex flex-col'>
            <p className='text-sm font-bold'>{firstname + ' ' + lastname}</p>
            <p className='text-xs text-gray-500'>{country}</p>
         </div>
         <button className='base-bg-color text-white text-sm ml-auto px-5 p-3 rounded-xl'>
            View
         </button>
      </div>
   )
}

export default index