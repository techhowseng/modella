import Navbar from 'components/Navbar'
import React from 'react'

const index = () => {
   const ifThereIsNotification = false

   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 md:py-12 w-[100%] my-0  flex flex-col items-center">
         <h1 className='text-xl w-full md:w-[95%] max-w-[900px] font-bold mt-8 text-left mb-2'>Notifications</h1>
         <div className='w-full md:w-[95%] max-w-[900px] bg-white px-4 py-7 lg:px-6 lg:py-12 mx-auto rounded-2xl'>
            {ifThereIsNotification ?
               <>
                  <div className='relative flex items-center w-[100%] mb-3 p-2 mx-auto rounded-xl h-[70px]'>
                     <div className="h-[55px] w-[65px] rounded-xl overflow-hidden mr-2">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbq4kBjnVFn97ChSVEZFnExzxRUNG-nG5LA&usqp=CAU' className='w-full h-full object-cover' alt="model image" />
                     </div>
                     <div>
                        <div className='flex items-center flex-wrap'>
                           <p className="font-bold base-color mr-1">Angela Jouly</p>
                           <p className="flex items-center text-sm text-gray-400">and 12 others applied to your</p>
                           <b className='capitalize text-sm ml-1'>Photoshot Job</b>
                        </div>
                        <p className='text-gray-400 text-sm'>1m ago</p>
                     </div>
                  </div>
                  <div className='relative flex items-center w-[100%] mb-3 p-2 mx-auto rounded-xl h-[70px]'>
                     <div className="h-[55px] w-[65px] rounded-xl overflow-hidden mr-2">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRlSVVcnT988ksu89xvG1b_-1hU5jct5sXEahmrXSuGlrZUZ0eLcCJbl5VBtIGpjnwxo&usqp=CAU' className='w-full h-full object-cover' alt="model image" />
                     </div>
                     <div>
                        <div className='flex items-center flex-wrap'>
                           <p className="font-bold base-color mr-1">Kanye West</p>
                           <p className="flex items-center text-sm text-gray-400">sent you a message</p>
                        </div>
                        <p className='text-gray-400 text-sm'>10m ago</p>
                     </div>
                  </div>
                  <div className='relative flex items-center w-[100%] mb-3 p-2 mx-auto rounded-xl h-[70px]'>
                     <div className="h-[55px] w-[65px] rounded-xl overflow-hidden mr-2">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbq4kBjnVFn97ChSVEZFnExzxRUNG-nG5LA&usqp=CAU' className='w-full h-full object-cover' alt="model image" />
                     </div>
                     <div>
                        <div className='flex items-center flex-wrap'>
                           <p className="font-bold base-color mr-1">Pandora Polina</p>
                           <p className="flex items-center text-sm text-gray-400">and 11 others applied to your</p>
                           <b className='capitalize text-sm ml-1'>runway shoot job</b>
                        </div>
                        <p className='text-gray-400 text-sm'>1m ago</p>
                     </div>
                  </div>
               </>
               :
               <>
                  <div className='h-[50vh] w-full flex justify-center items-center text-2xl'>No Notifications</div>
               </>
            }
         </div>
      </div>
   )
}

export default index