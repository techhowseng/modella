import React from 'react'
import { AiOutlineDollar } from 'react-icons/ai'
import { FaRegHandshake } from 'react-icons/fa'

const ModelCard = ({ model }) => {
   return (
      <div className='bg-white p-4 rounded-xl'>
         <div className='flex items-center gap-x-2'>
            <div className='w-12 h-12 rounded-xl overflow-hidden'>
               <img src={model.img} className='w-full h-full' alt="model image" />
            </div>
            <div>
               <h1 className='font-bold text-sm'>{model.firstname + ' ' + model.lastname}</h1>
               <p className='text-gray-500 text-xs'>{model.country}</p>
            </div>
         </div>
         <p className='text-xs md:text-sm my-2 text-gray-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, omnis! Unde laboriosam quam repellat necessitatibus doloremque atque, culpa velit enim?</p>
         <div className='flex items-center gapx-6 gap-6 justify-between'>
            <div className='flex items-center gap-x-4'>
               <span className='base-color flex items-center font-bold text-sm'><FaRegHandshake className='text-gray-500 text-2xl mr-1' /> 2340</span>
               <span className='base-color flex items-center font-bold text-sm'><AiOutlineDollar className='text-gray-500 text-xl mr-1' />$21000</span>
            </div>
            <button className='base-bg-color text-white py-3 px-8 md:px-10 rounded-lg text-sm text-center'>View</button>
         </div>
      </div>
   )
}

export default ModelCard
