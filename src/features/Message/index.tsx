import Navbar from 'components/Navbar'
import MessageCard from 'components/MessageCard'
import React from 'react'
import { recomData } from 'dummyData'
import Link from 'next/link'
import { APP_ROUTES } from 'lib/routes'

const index = () => {
   const ifThereIsMessage = true

   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 md:py-12 w-[100%] my-0 flex flex-col items-center">
         <h1 className='text-xl w-full md:w-[95%] max-w-[900px] font-bold mt-8 text-left mb-2'>Messages</h1>
         <div className='w-full md:w-[95%] max-w-[900px] bg-white px-4 py-7 lg:px-6 lg:py-12 rounded-2xl'>
            {ifThereIsMessage ?

               <>
                  {
                     recomData.map((item) => (
                        <Link href={`${APP_ROUTES.message}/${item.firstname}-${item.lastname}`}>
                           <MessageCard key={item.id} item={item} />
                        </Link>
                     ))
                  }
               </>
               :
               <>
                  <div className='h-[50vh] w-full flex justify-center items-center text-2xl'>No Messages</div>
               </>
            }
         </div>
      </div>
   )
}

export default index