import React from 'react'
import bannerImg from 'assets/Group 3928.png'
import profileImg from 'assets/Rectangle 4153.png'
import { BsPlusLg } from 'react-icons/bs'
import { SlLocationPin } from 'react-icons/sl'
import { AiOutlineDollar } from 'react-icons/ai'
import { FaFacebook, FaInstagram, FaRegHandshake, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

const index = () => {
   return (
      <div className="ml-[5rem] lg:ml-[17rem] relative min-h-screen w-[100%] my-0">
         <div className='relative w-full h-[10rem] flex justify-center overflow-hidden'>
            <div className='absolute w-full h-full bg-black opacity-50'></div>
            <img src={bannerImg.src} className='w-full h-full object-cover' alt="banner image" />
            <div className='absolute top-[45%] flex items-center gap-x-2 cursor-pointer text-white'><BsPlusLg className='text-white text-xl cursor-pointer' /> Add A Banner Image</div>
         </div>
         <div className='flex flex-col lg:flex-row gap-x-6  w-full px-2 lg:px-10 lg:px-6'>
            <div className='w-full lg:w-[35%]'>
               <div className="py-6 px-3 flex flex-col items-center justify-center bg-white rounded-2xl w-full -translate-y-14">
                  <div className='mx-auto text-center'>
                     <div className="w-[70px] mx-auto h-[70px] bg-gray-300 rounded-2xl overflow-hidden mb-4">
                        {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRlSVVcnT988ksu89xvG1b_-1hU5jct5sXEahmrXSuGlrZUZ0eLcCJbl5VBtIGpjnwxo&usqp=CAU' className="w-full h-full object-cover" alt="user profile" /> */}
                        <img src={profileImg.src} className="w-full h-full object-cover" alt="user profile" />
                     </div>
                     <p className="base-color text-xl mb-1 font-black">Kanye West</p>
                     <p className="flex items-center text-sm text-gray-400"><SlLocationPin className="text-xl mr-1" /> Capetown, South  Africa</p>
                  </div>
                  <div className='mt-6 w-[100%] flex justify-between gap-x-4 px-[25%] py-3 rounded-xl border'>
                     <div className='flex flex-col items-center justify-center gap-y-2'>
                        <FaRegHandshake className='text-gray-400 text-xl' />
                        <span className='text-sm text-gray-400'>Likes</span>
                        <p className='font-bold base-color'>2340</p>
                     </div>
                     <div className='w-[1px] bg-gray-200 py-6'></div>
                     <div className='flex flex-col items-center justify-center gap-y-2'>
                        <AiOutlineDollar className='text-gray-400 text-xl' />
                        <span className='text-sm text-gray-400'>Earnings</span>
                        <p className='font-bold base-color'>$21000</p>
                     </div>
                  </div>
                  <button className='mt-3 base-color border w-full rounded-xl py-4 font-bold hover:bg-blue-100 active:opacity-70'>Edit Your Profile</button>
               </div>
               <div className='py-6 px-4 bg-white space-y-7 rounded-2xl -translate-y-10 w-full'>
                  <div>
                     <h1 className='font-bold mb-2'>Bio</h1>
                     <p className='text-sm text-gray-400'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, reiciendis dolore! Asperiores, quam pariatur et vel libero accusamus reprehenderit iure!
                     </p>
                  </div>
                  <div className='flex items-center gap-x-2'>
                     <h1 className='font-bold'>Skill Set:</h1>
                     <p className='text-sm text-gray-400'>
                        Professional
                     </p>
                  </div>
                  <div className=''>
                     <h1 className='mb-2 font-bold'>Skill Style:</h1>
                     <p className='text-sm text-gray-400'>
                        Face Modeling, Beauty. Shoot, Runway Shoot.
                     </p>
                  </div>
                  <div className=''>
                     <h1 className='mb-2 font-bold'>Social Links</h1>
                     <div className='flex gap-x-6 text-3xl'>
                        <Link href='#'>
                           <FaFacebook />
                        </Link>
                        <Link href='#'>
                           <FaInstagram />
                        </Link>
                        <Link href='#'>
                           <FaWhatsapp />
                        </Link>
                        <Link href='#'>
                           <FaTwitter />
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className='w-full lg:w-[60%] pt-6 lg:pt-16'>
               <div className="flex items-center justify-between mb-3">
                  <h1 className='text-lg font-bold'>My Gallery</h1>
                  <button className='flex items-center gap-x-2 text-sm font-bold border border-blue-500 px-6 py-3 rounded-xl base-color hover:bg-blue-100 active:opacity-70'><BsPlusLg className='text-md' /> Upload Images</button>
               </div>
               <div className='grid md:grid-cols-3 grid-cols-2 gap-3 bg-white p-3 w-full rounded-xl'>
                  <div className='bg-gray-300 w-[100%] h-40 rounded-xl overflow-hidden'>
                     <img src={profileImg.src} className='w-full h-full object-cover' alt="gallery image" />
                  </div>
                  <div className='bg-gray-300 w-[100%] h-40 rounded-xl overflow-hidden'>
                     <img src={profileImg.src} className='w-full h-full object-cover' alt="gallery image" />
                  </div>
                  <div className='bg-gray-300 col-span-2 md:col-span-1 w-[100%] h-40 rounded-xl overflow-hidden'>
                     <img src={profileImg.src} className='w-full h-full object-cover' alt="gallery image" />
                  </div>
                  <div className='bg-gray-300 md:col-span-2 w-[100%] h-40 rounded-xl overflow-hidden'>
                     <img src={profileImg.src} className='w-full h-full object-cover' alt="gallery image" />
                  </div>
                  <div className='cols- bg-gray-300 w-[100%] h-40 rounded-xl overflow-hidden'>
                     <img src={profileImg.src} className='w-full h-full object-cover' alt="gallery image" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default index