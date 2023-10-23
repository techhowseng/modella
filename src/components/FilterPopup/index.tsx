import React from 'react'
import { Button, Input } from '..'
import { FaMagic } from 'react-icons/fa'

const skill = [
   'modelling',
   'Photography',
   'Make-Up Artist',
   'Dance/Vixen',
   'Host/Hostress'
]
const FilterPopup = () => {
   return (
      <div className="absolute -left-[305px] md:-left-[350px] top-12 h-[500px] w-[350px] shadow-xl bg-white p-5 py-11 border">
         <div className='relative w-full h-[15%] mb-1'>
            <label htmlFor="search" className='bg-white absolute left-4 -top-2 px-2 text-sm text-gray-400'>Country</label>
            <input
               id='search'
               type='text'
               name='search'
               placeholder='South Africa'
               className='border border-gray-300 w-full h-[100%] rounded-xl outline-0'
               onChange={() => { }}
            />
         </div>

         <div className='mt-10'>
            <p>Skill Type</p>
            <div className='flex flex-wrap mt-4 gap-2'>
               {skill.map((item, index) => (
                  <div key={index} className='p-4 px-5 hover:dim-bg-yellow cursor-pointer border border-black text-sm rounded-[20px]'>{item}</div>
               ))}
            </div>
         </div>
         <Button
            className='mt-8'
            loading={false}
            loadingText='showing result...'>
            Show Results
         </Button>
      </div>
   )
}

export default FilterPopup