import React from 'react'
import jobImg from 'assets/Rectangle 4153.png'
import Link from 'next/link'
import { APP_ROUTES } from 'lib/routes'

const JobsCard = ({ job }) => {
   return (
      <div className='bg-white p-4 rounded-xl'>
         <div className='flex items-center gap-x-2'>
            <div className='w-12 h-12 rounded-xl overflow-hidden'>
               <img src={job.img} className='w-full h-full' alt="job image" />
            </div>
            <div>
               <h1 className='font-bold text-sm'>{job.firstname + ' ' + job.lastname}</h1>
               <p className='text-gray-500 text-xs'>Posted By Andela.com</p>
            </div>
         </div>
         <p className='text-xs md:text-sm my-2 text-gray-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, omnis! Unde laboriosam quam repellat necessitatibus doloremque atque, culpa velit enim?</p>
         <div className='flex items-center gapx-6 gap-6 justify-between'>
            <div className='flex items-center overflow-hidden w-[90%] gap-x-2'>
               <div className='flex items-center w-10 h-10 gap-x-4'>
                  <img src={jobImg.src} className='w-full h-full rounded-full border-2 border-white' alt="job" />
                  <img src={jobImg.src} className='w-full h-full rounded-full border-2 border-white -translate-x-8' alt="job" />
                  <img src={jobImg.src} className='w-full h-full rounded-full border-2 border-white -translate-x-14' alt="job" />
               </div>
               <p className='text-sm ml-12 truncate text-ellipse w-full'>11&nbsp;&nbsp;Applicants</p>
            </div>
            <Link href={`${APP_ROUTES.jobs}/${job.id}`} className='base-bg-color text-white py-3 px-8 md:px-10 rounded-lg text-sm text-center'>Apply</Link>
         </div>
      </div>
   )
}

export default JobsCard