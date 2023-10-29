import Navbar from 'components/Navbar'
import MyJobsCard from 'components/MyJobsCard'
import ApplicantsCard from 'components/ApplicantsCard'
import { BsPlusLg } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import React, { useState } from 'react'
import { recomData } from 'dummyData'
import CreateJobForm from 'features/CreateJobForm'
import Button from 'components/Button'
import Input from 'components/Input'
import Link from 'next/link'
import { APP_ROUTES } from 'lib/routes'


const MyJobs = () => {
   const [open, setOpen] = useState(false)

   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 w-[100%] my-0  flex flex-col items-center">
         <h1 className='text-xl mt-8 font-bold w-full max-w-[1000px] md:w-[95%] text-left mb-2'>My Jobs</h1>
         <div className='w-full max-w-[1000px] md:w-[95%] bg-white px-4 py-7 lg:px-6 lg:py-12 rounded-2xl'>
            {
               recomData.map((item) => (
                  <MyJobsCard item={item} />
               ))
            }
            <Link href={APP_ROUTES.createJob} className='flex items-center justify-center rounded-xl w-[100%] h-[40px] border base-color py-7 hover:dim-bg-yellow active:opacity-70 transition cursor-pointer'>
               <BsPlusLg className='mr-2 text-xl' /> Create New Job
            </Link>
         </div>
         <div className='relative max-w-[1000px] flex justify-between w-full md:w-[95%]'>
            <h1 className='text-xl font-bold mt-8 text-left mb-2'>Applicants</h1>
            <div onClick={() => setOpen(prev => !prev)} className='flex items-center gap-x-1 cursor-pointer'>Sort <IoIosArrowDown /></div>
            {open && (<div onMouseLeave={() => setOpen(false)} className='shadow z-10 absolute right-8 top-14 flex flex-col rounded-xl overflow-hidden bg-gray-100 w-[10rem]'>
               <span className='h-full w-full p-4 pl-6 hover:dim-bg-yellow cursor-pointer text-sm border-b'>Date</span>
               <span className='h-full w-full p-4 pl-6 hover:dim-bg-yellow cursor-pointer border-b text-sm'>Name</span>
               <span className='h-full w-full p-4 pl-6 hover:dim-bg-yellow cursor-pointer text-sm'>Highest Likes</span>
            </div>)}
         </div>
         <div className='w-full md:w-[95%] max-w-[1000px] bg-white px-4 py-7 lg:px-6 lg:py-12 rounded-2xl'>
            {
               recomData.map((item) => (
                  <Link href={`${APP_ROUTES.myJobs}/${item.id}`}>
                     <ApplicantsCard item={item} />
                  </Link>
               ))
            }
         </div>
      </div>
   )
}

export default MyJobs