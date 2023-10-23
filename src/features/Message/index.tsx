import Navbar from 'components/Navbar'
import MessageCard from 'components/MessageCard'
import React from 'react'
import { recomData } from 'dummyData'

const index = () => {
   return (
      <div className="ml-[5rem] text-gray-700 md:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 w-[100%] my-0  flex flex-col items-center">
         <h1 className='text-xl font-bold mt-8 text-left mb-2 pl-[4%] mr-auto'>Messages</h1>
         <div className='w-[95%] bg-white px-4 py-7 lg:px-6 lg:py-12 rounded-2xl'>
            {
               recomData.map((item) => (
                  <MessageCard item={item} />
               ))
            }
         </div>
      </div>
   )
}

export default index