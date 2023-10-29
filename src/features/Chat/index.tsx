import React, { useState } from 'react'
import profileImg from 'assets/Rectangle 4153.png'
import { BsFillSendFill } from 'react-icons/bs'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Chat = () => {
   const [query, setQuery] = useState('')
   const [message, setMessage] = useState([])
   const router = useRouter()
   const { chatId } = router.query
   // const [time, setTime] = useState({})

   const scrollRef: React.MutableRefObject<any> = useRef()

   const handleQuery = () => {
      if (query) {
         setMessage([...message, { text: query }])
      } else {
         return
      }
      setQuery('')
   }

   useEffect(() => {
      scrollRef.current?.scrollIntoView()
   }, [message])
   return (
      <div className="ml-[5rem] text-gray-700 lg:ml-[17rem] relative min-h-screen px-2 md:px-6 py-4 md:py-6 w-[100%] my-0 flex flex-col items-center">
         <h1 className='text-xl w-full md:w-[95%] max-w-[900px] font-bold mt-8 text-left mb-2'>Message: {chatId}</h1>
         <div className='relative w-full md:w-[95%] max-w-[900px] h-[85vh] overflow-hidden bg-white p-10 lg:px-6 lg:py-12 rounded-2xl'>
            <div className="overflow-y-scroll h-[75%] space-y-4 md:space-y-8 lg:space-y-16 w-full h-full mb-[40px] border-b">
               <div className='flex gap-x-2 ml-auto pl-4 lg:pl-6'>
                  <p className='p-4 lg:p-6 ml-auto border text-sm rounded-tl-xl rounded-tr-xl rounded-bl-xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus nostrum quia cupiditate vel deserunt molestiae officiis ipsam optio quis placeat.</p>
                  <img className='bg-gray-200 rounded-lg h-[2rem] w-[2rem] mt-auto' src={profileImg.src} alt="Your Profile" />
               </div>
               <div className='flex gap-x-2 mr-auto'>
                  <img className='bg-gray-200 rounded-lg h-[2rem] w-[2rem] mt-auto' src={profileImg.src} alt="Your Profile" />
                  <p className='p-4 lg:p-6 mr-auto border text-sm rounded-tl-xl rounded-tr-xl rounded-br-xl'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima vero illo aliquid ut enim corporis quia obcaecati quisquam animi perspiciatis magni quaerat accusamus ipsa, possimus suscipit quae laborum totam doloribus!</p>
               </div>
               {message.map(item => {
                  return <div className='flex gap-x-2 ml-auto pl-4 lg:pl-6'>
                     <p className='p-4 lg:p-6 border ml-auto text-sm rounded-tl-xl rounded-tr-xl rounded-bl-xl'>{item.text}</p>
                     <img className='bg-gray-200 rounded-lg h-[2rem] w-[2rem] mt-auto' src={profileImg.src} alt="Your Profile" />
                  </div>
               })}
               <div ref={scrollRef} />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full flex items-center justify-between">
               <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className='border outline-none bg-white rounded-xl p-4 w-[85%]'
                  type="text" placeholder='Send message...' />
               <button title='send' onClick={handleQuery} className='w-[10%]' >
                  <BsFillSendFill className='text-lg' />
               </button>
            </form>
         </div>
      </div>
   )
}

export default Chat
