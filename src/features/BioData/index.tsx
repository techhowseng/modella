import Button from 'components/Button'
import Input from 'components/Input'
import React from 'react'

const BioData = () => {
   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-6 md:py-10 w-[100%] my-0 flex flex-col items-center">
         <div className='w-full max-w-[1000px] sm:w-[90%] bg-white p-10 rounded-2xl'>
            <h1 className='text-sm text-gray-400 text-center pb-8'>Please Fill Out Your Biodata To Enrich Your Profile</h1>
            <div className="text-sm text-gray-700 font-bold space-y-6 sm:space-y-8  ">
               <Input
                  className="bg-transparent text-sm font-light rounded-[15px] placeholder:text-center placeholder:pt-12 placeholder:text-gray-400  outline-0"
                  label="Bio"
                  name="title"
                  placeholder='Tell Us Little About Yourself'
                  type="textarea"
                  onChange={() => { }}
               />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className='flex flex-col gap-2'>
                     <label>Date Of Birth</label>
                     <input
                        className="p-4 border-gray-200 rounded-xl outline-0"
                        type='date'
                        onChange={() => { }}
                        // label='Date Of Birth'
                        name='date'
                     />
                  </div>
                  <Input
                     className="border rounded-xl outline-0"
                     type='text'
                     onChange={() => { }}
                     label='Location'
                     name='location'
                  />
                  <Input
                     className="border rounded-xl outline-0"
                     type='phone'
                     onChange={() => { }}
                     label='Phone'
                     name='phone'
                  />
                  <div>
                     <h1 className='mb-5'>Skill Set</h1>
                     <div className='flex items-center gap-x-6'>
                        <div>
                           <input type="radio" id="professional" name="fill" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                           <label className='text-sm cursor-pointer font-light' htmlFor="professional">Professional</label>
                        </div>
                        <div>
                           <input type="radio" id="beginner" name="fill" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                           <label className='text-sm cursor-pointer font-light' htmlFor="beginner">Beginner</label>
                        </div>
                        <div>
                           <input type="radio" id="junior" name="fill" className="border-gray-200 bg-gray-100 rounded-full p-3 mr-2" />
                           <label className='text-sm cursor-pointer font-light' htmlFor="junior">Junior Mid Level</label>
                        </div>
                     </div>
                  </div>
               </div>
               <h1>Social Links</h1>
               <div className='p-4 grid font-light grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                     className="border rounded-xl outline-0"
                     type='text'
                     onChange={() => { }}
                     label='Facebook Profile'
                     name='link'
                  />
                  <Input
                     className="border rounded-xl outline-0"
                     type='text'
                     onChange={() => { }}
                     label='LinkedIn Profile'
                     name='link'
                  />
                  <Input
                     className="border rounded-xl outline-0"
                     type='text'
                     onChange={() => { }}
                     label='Twitter Profile'
                     name='link'
                  />
                  <Input
                     className="border rounded-xl outline-0"
                     type='text'
                     onChange={() => { }}
                     label='Instagram Profile'
                     name='link'
                  />
               </div>
               <Input
                  className="border rounded-xl outline-0 mb-4"
                  type='text'
                  onChange={() => { }}
                  label='Skill Style'
                  name='skill'
               />
               <Button>Make Changes</Button>
            </div>
         </div>
      </div>
   )
}

export default BioData