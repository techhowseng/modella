import Input from 'components/Input'
import profileImg from 'assets/Rectangle 4153.png'
import React from 'react'
import { useRouter } from 'next/router'
import { recomData } from 'dummyData'

const AppliedDetails = () => {
   const router = useRouter()
   const { appliedId } = router.query

   const applicant = recomData.find(item => item.id === appliedId)

   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-6 md:py-10 w-[100%] my-0 flex flex-col items-center">
         <div className='w-full max-w-[1000px] sm:w-[90%] bg-white p-10 rounded-2xl'>
            <div className="text-sm text-gray-700 font-bold space-y-6 sm:space-y-8  ">
               <div className='flex items-center gap-x-2'>
                  <div className='h-16 rounded-2xl overflow-hidden'><img className='w-full h-full' src={applicant.img} alt="Job-Image" /></div>
                  <div>
                     <h1 className='underline base-color text-lg'>{applicant.firstname + ' ' + applicant.lastname}</h1>
                     <p className='font-bold'>Face Photoshop</p>
                     <p className='text-gray-400 text-sm font-light capitalize'>applied on may 30</p>
                  </div>
               </div>
               <div className={`${applicant.status === 'Pending' ? 'border-yellow-300 bg-yellow-100' : ''} ${applicant.status === 'Not Accepted' ? 'border-red-500 bg-red-100' : ''} ${applicant.status === 'Accepted' ? 'border-green-400 bg-green-100' : ''} rounded-xl border p-4 w-full`}><h1>Application {applicant.status}</h1>
                  <p className='text-sm font-light text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, illo sequi ab ipsa ad a.</p></div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                     className="text-gray-400 text-sm border rounded-xl outline-0"
                     type='text'
                     onChange={() => { }}
                     label='Skill Set'
                     value='Professional'
                     name='link'
                  />
                  <Input
                     className="text-gray-400 text-sm border rounded-xl outline-0"
                     type='text'
                     onChange={() => { }}
                     value='South Africa'
                     label='Location'
                     name='location'
                  />
                  <Input
                     className="text-gray-400 text-sm border rounded-xl outline-0"
                     type='email'
                     onChange={() => { }}
                     label='Email'
                     value='caroline@gmail.com'
                     name='email'
                  />
                  <Input
                     className="text-gray-400 text-sm border rounded-xl outline-0"
                     type='phone'
                     onChange={() => { }}
                     label='Phone'
                     value='98765234540'
                     name='phone'
                  />

               </div>
               <Input
                  className="bg-transparent text-sm text-gray-400 font-light rounded-[15px]outline-0"
                  label="What's Your Experience So Far On The Job ?"
                  name="experience"
                  value='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, saepe nisi. Autem ex amet saepe, mollitia totam ipsam eos doloribus, quod ad reprehenderit dolorem vero pariatur? Illum, soluta est? Mollitia?'
                  type="textarea"
                  onChange={() => { }}
               />
               <div className='w-full space-y-2'>
                  <button className='w-full base-bg-color mx-auto py-4 rounded-xl active:opacity-70 text-white'>Accept Application</button>
                  <button className='w-full base-color mx-auto py-4 rounded-xl border active:bg-blue-100 border-blue-500'>Reject Application</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AppliedDetails