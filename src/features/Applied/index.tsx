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
import AppliedCard from 'components/AppliedCard'


const Applied = () => {

   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 w-[100%] my-0  flex flex-col items-center">
         <div className='relative max-w-[1000px] flex justify-between w-full md:w-[95%]'>
            <h1 className='text-xl font-bold mt-8 text-left mb-2'>Applied</h1>
         </div>
         <div className='w-full md:w-[95%] max-w-[1000px] bg-white px-4 py-7 lg:px-6 lg:py-12 rounded-2xl'>
            {
               recomData.map((item) => (
                  <Link href={`${APP_ROUTES.applied}/${item.id}`}>
                     <AppliedCard item={item} />
                  </Link>
               ))
            }
         </div>
      </div>
   )
}

export default Applied