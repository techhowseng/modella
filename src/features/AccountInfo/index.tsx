import React, { useState } from 'react'
import Input from 'components/Input'
import PopUpModal from 'components/PopUpModal'

const AccountInfo = () => {
   const [showModal, setShowModal] = useState(false)

   return (
      <>
         <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-12 py-4 md:py-12 w-[100%] my-0 flex flex-col items-center">
            <div className='relative w-full md:w-[95%] max-w-[700px] flex justify-between'>
               <h1 className='text-xl font-bold mt-8 mb-4'>Acconut Information</h1>
            </div>
            <div className='w-full md:w-[95%] max-w-[700px] bg-white p-10 rounded-2xl text-sm font-bold space-y-7'>
               <Input
                  label='Email Address'
                  type='email'
                  name='email'
                  onChange={() => { }}
               />
               <Input
                  label='Password'
                  type='password'
                  name='password'
                  onChange={() => { }}
               />
               <div>
                  <h1>Delete Account</h1>
                  <p className='text-xs font-light mt-2 text-gray-400 capitalise'>Your Account Will Be Deleted Forever From The Application And All Information Will Be Wiped Out.</p>
               </div>
               <button onClick={() => setShowModal(true)} className='bg-red-100 rounded-2xl w-full mx-auto p-5 text-red-500'>Delete Account</button>
            </div>
         </div>
         <PopUpModal className='bg-white w-[90%] sm:w-[60%] max-w-[500px] rounded-2xl p-8' isVisible={showModal} onClose={() => setShowModal(false)} >
            <p className='text-center capitalize text-sm text-gray-400'>are you sure you want to delete your account <br /> permanently?</p>
            <div className='flex w-full justify-center gap-x-5 mt-10'>
               <button onClick={() => setShowModal(false)} className='bg-gray-100 text-gray-400 py-3 w-full rounded-xl'>Cancel</button>
               <button className='text-white base-bg-color py-3 w-full rounded-xl active:opacity-70'>Delete</button>
            </div>
         </PopUpModal>
      </>
   )
}

export default AccountInfo