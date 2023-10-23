import React from 'react'
import bannerImg from 'assets/Group 3928.png'
import inviteImg from 'assets/Rectangle 4153.png'
import { SITE_NAME } from "lib/constants";
import Link from 'next/link'
import { APP_ROUTES } from 'lib/routes'
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BsLink45Deg } from 'react-icons/bs';

const Banner = () => {
   return (
      <div className="flex item-center w-full h-[260px] justify-between gap-x-6 mx-auto py-4 sm:px-6 lg:px-0 relative overflow-hidden rounded-lg">
         <div className="relative w-[80%] flex-1 base-bg-color overflow-hidden rounded-[30px] ">
            <img src={bannerImg.src} className='object-cover w-full h-full' alt="banner image" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
            <div className='absolute top-0 pl-6 lg:pl-4 w-[90%] md:w-[80%] lg:w-[90%] xl:w-[70%] p-3 md:p-4 lg:p-6'>
               <h1 className='text-3xl md:text-2xl lg:text-4xl font-black text-white'>Explore the World of Creativity</h1>
               <p className='hidden md:block md-flex mb-3 text-white text-xs md:text-sm mt-3'>Welcome Onboard Please Fill Out Your Biodata To Enrich Your Profile</p>
               <Link href={APP_ROUTES.bioData} className='absolute -bottom-25 sm:-bottom-10 lg:mb-29 py-4 px-6 text-center hover:bg-blue-100 transition rounded-xl lg:rounded-2xl bg-white base-color'>
                  Complete Biodata
               </Link>
            </div>
         </div>
         <div className='relative base-bg-color overflow-hidden rounded-[30px] hidden mx-auto lg:flex flex-col justify-center items-center w-[30%] h-full text-center base-bg-color'>
            <img src={inviteImg.src} className='object-cover w-full h-full' alt="invite image" />
            <div className='absolute top-5 xl:px-2 mx-auto'>
               <h1 className='md:text-xl lg:text-2xl xl:text-3xl font-black text-white'>Want To Share The Feeling</h1>
               <p className='hidden md-flex lg:block text-white text-xs  md:text-sm'>Help {SITE_NAME} Grow</p>
               <Link href={APP_ROUTES.bioData} className='w-[100%] mx-auto'>
                  <p className='flex items-center justify-center w-[70%] py-4 mx-auto hover:bg-blue-100 transition rounded-xl lg:rounded-2xl bg-white base-color mt-4'> <BsLink45Deg className='text-2xl mr-2' />  Invite friend</p>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Banner