import Navbar from 'components/Navbar'
import React from 'react'

const index = () => {
   return (
      <div className="ml-[5rem] md:ml-[17rem] relative min-h-screen px-6 py-4 w-[100%] my-0">
         <Navbar />
         {/* <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} /> */}
         <div>
            <h1 className='text-4xl mt-32 flex  justify-center items-center'>Notification Page</h1>
         </div>
      </div>
   )
}

export default index