import React from 'react'
import bannerImg from 'assets/Group 3928.png'
import profileImg from 'assets/Rectangle 4153.png'
import { BsPlusLg } from 'react-icons/bs'
import { SlLocationPin } from 'react-icons/sl'
import { AiOutlineDollar } from 'react-icons/ai'
import { modelData, recomData } from "../../dummyData"
import { FaFacebook, FaInstagram, FaRegHandshake, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import RowCard from 'components/RowCard'

const index = () => {
   return (
      <div className="ml-[5rem] lg:ml-[17rem] relative min-h-screen w-[100%] my-0">
         <div className='relative w-full h-[10rem] flex justify-center overflow-hidden'>
            <div className='absolute w-full h-full bg-black opacity-50'></div>
            <img src={bannerImg.src} className='w-full h-full object-cover' alt="banner image" />
            <div className='absolute top-[45%] flex items-center gap-x-2 cursor-pointer text-white'>Andela.com</div>
         </div>
         <div className='flex flex-col lg:flex-row gap-x-6  w-full px-2 lg:px-10 lg:px-6'>
            <div className='w-full lg:w-[35%]'>
               <div className="py-6 px-3 flex flex-col items-center justify-center bg-white rounded-2xl w-full -translate-y-14">
                  <div className='mx-auto text-center'>
                     <div className="w-[70px] mx-auto h-[70px] bg-gray-300 rounded-2xl overflow-hidden mb-4">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRlSVVcnT988ksu89xvG1b_-1hU5jct5sXEahmrXSuGlrZUZ0eLcCJbl5VBtIGpjnwxo&usqp=CAU' className="w-full h-full object-cover" alt="user profile" />
                     </div>
                     <p className="base-color text-xl mb-1 font-black">Face Photoshop</p>
                     <p className="flex items-center text-sm text-gray-400"><SlLocationPin className="text-xl mr-1" /> Capetown, South  Africa</p>
                  </div>
                  <div className='mt-6 w-[100%] flex justify-between gap-x-4 px-[25%] py-3 rounded-xl border'>
                     <div className='flex flex-col items-center justify-center gap-y-2'>
                        <FaRegHandshake className='text-gray-400 text-xl' />
                        <span className='text-sm text-gray-400'>Duration</span>
                        <p className='font-bold base-color'>2 weeks</p>
                     </div>
                     <div className='w-[1px] bg-gray-200 py-6'></div>
                     <div className='flex flex-col items-center justify-center gap-y-2'>
                        <AiOutlineDollar className='text-gray-400 text-xl' />
                        <span className='text-sm text-gray-400'>Earnings</span>
                        <p className='font-bold base-color'>$21000</p>
                     </div>
                  </div>
                  <button className='mt-3 text-white base-bg-color border w-full rounded-xl py-4 font-bold active:opacity-70'>Apply Now</button>
               </div>
               <h1 className='mb-6 font-bold'>Job Based On Your Profile</h1>
               <div className='py-6 space-y-3 rounded-2xl -translate-y-10 w-full'>
                  {
                     recomData.map((item) => (
                        <RowCard models={item} />
                     ))
                  }
               </div>
            </div>
            <div className='w-full lg:w-[60%] pt-6 lg:pt-16'>
               <div className='bg-white p-3 w-full rounded-xl'>
                  <h1 className='text-lg font-bold mb-3'>Job Qualifications</h1>
                  <ul className='text-sm text-gray-400 space-y-4 px-1'>
                     <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.</li>
                     <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.</li>
                     <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.</li>
                     <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.</li>
                     <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.</li>
                  </ul>
               </div>
               <div className='bg-white mt-3 p-3 w-full rounded-xl'>
                  <h1 className='text-lg font-bold mb-3'>About The Job</h1>
                  <div className='text-sm text-gray-400 leading-6'>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis omnis mollitia ipsum id velit pariatur suscipit sit molestiae, dolor facilis quae provident placeat voluptates unde veniam! Eius, molestiae! Recusandae nihil asperiores qui magni error explicabo accusamus vitae unde rerum cum!
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default index