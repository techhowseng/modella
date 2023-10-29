import Button from "components/Button";
import Input from "components/Input";
import PopUpModal from "components/PopUpModal";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React, { useState } from "react";


const CreateJobForm = () => {
   const [showModal, setShowModal] = useState(false)

   return (
      <>
         <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 w-[100%] my-0  flex flex-col items-center">
            <div className="flex items-center w-full max-w-[900px] md:w-[90%] justify-between py-8">
               <h1 className='text-xl font-bold text-left'>Create Job</h1>
               <Link href={APP_ROUTES.myJobs} className="base-color text-sm underline">Go Back</Link>
            </div>
            <div className='w-full max-w-[900px] md:w-[90%] bg-white p-10 rounded-2xl'>
               <div className="text-sm text-gray-700 font-bold space-y-6 sm:space-y-8  ">
                  <Input
                     className="bg-transparent text-sm font-light rounded-[15px] outline-0"
                     label="Job Title"
                     name="title"
                     type="text"
                     onChange={() => { }}
                  />
                  <Input
                     className="bg-transparent text-sm font-light  rounded-[15px] outline-0"
                     label="Job Description"
                     name="description"
                     type="textarea"
                     onChange={() => { }}
                  />
                  <Input
                     className="bg-transparent text-sm font-light  rounded-[15px] outline-0"
                     label="Job Reqirement"
                     name="description"
                     type="textarea"
                     onChange={() => { }}
                  />
                  <h1>Required Information</h1>
                  <div className="flex flex-wrap gap-5">
                     <span className="text-xs text-gray-500">
                        <input type="checkbox" id="email" name="email" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                        <label className="cursor-pointer" htmlFor="email">Email</label>
                     </span>
                     <span className="text-xs text-gray-500">
                        <input type="checkbox" id="phone" name="phone" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                        <label className="cursor-pointer" htmlFor="phone">Phone</label>
                     </span>
                     <span className="text-xs text-gray-500">
                        <input type="checkbox" id="skill" name="skill" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                        <label className="cursor-pointer" htmlFor="skill">Skill Set</label>
                     </span>
                     <span className="text-xs text-gray-500">
                        <input type="checkbox" id="location" name="location" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                        <label className="cursor-pointer" htmlFor="location">Location</label>
                     </span>
                     <span className="text-xs text-gray-500">
                        <input type="checkbox" id="fill" name="fill" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                        <label className="cursor-pointer" htmlFor="fill">Fill</label>
                     </span>
                     <span className="text-xs text-gray-500">
                        <input type="checkbox" id="fill-two" name="fill" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                        <label className="cursor-pointer" htmlFor="fill-two">Fill</label>
                     </span>
                  </div>
                  <Button onClick={() => setShowModal(true)}>Create Job</Button>
               </div>
            </div>
         </div>
         <PopUpModal className='bg-white w-[90%] sm:w-[70%] mt-[60%] md:mt-[40%] lg:mt-[35%] max-w-[600px] rounded-2xl p-3' isVisible={showModal} onClose={() => setShowModal(false)} >
            <div className='w-full space-y-3'>
               <Input
                  type="text"
                  name="text"
                  className="placeholder:text-sm placeholder:text-center placeholder:text-gray-400 border-blue-500"
                  placeholder="Whats Your Experience So Far On The Job ?"
                  onChange={() => { }}
               />
               <Button onClick={() => setShowModal(false)} className='bg-gray-100 text-gray-400 py-3 w-full rounded-xl'>Save</Button>
            </div>
         </PopUpModal>
      </>
   );
}

export default CreateJobForm;
