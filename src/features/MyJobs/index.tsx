import Navbar from 'components/Navbar'
import MyJobsCard from 'components/MyJobsCard'
import ApplicantsCard from 'components/ApplicantsCard'
import { BsThreeDotsVertical, BsPeople, BsPlusLg } from 'react-icons/bs'
import React from 'react'
import { recomData } from 'dummyData'


const index = () => {
   return (
      <div className="ml-[5rem] text-gray-700 md:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 w-[100%] my-0  flex flex-col items-center">
         <h1 className='text-xl mt-8 font-bold text-left mb-2 pl-[4%] mr-auto'>My Jobs</h1>
         <div className='w-[95%] bg-white px-4 py-7 lg:px-6 lg:py-12 rounded-2xl'>
            {
               recomData.map((item) => (
                  <MyJobsCard item={item} />
               ))
            }
            <div className='flex items-center justify-center rounded-xl w-[100%] h-[40px] border base-color py-7 hover:dim-bg-yellow active:opacity-70 transition cursor-pointer'>
               <BsPlusLg className='mr-2 text-xl' /> Create New Job
            </div>
         </div>
         <h1 className='text-xl font-bold mt-8 text-left mb-2 pl-[4%] mr-auto'>Applicants</h1>
         <div className='w-[95%] bg-white px-4 py-7 lg:px-6 lg:py-12 rounded-2xl'>
            {
               recomData.map((item) => (
                  <ApplicantsCard item={item} />
               ))
            }
         </div>
      </div>
   )
}

export default index