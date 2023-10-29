import React from 'react'

const PopUpModal = ({ isVisible, onClose, className, children }) => {
   if (!isVisible) return null

   const handleClose = (e) => {
      if (e.target.id === 'overlay') onClose()
   }
   return (
      <div onClick={handleClose} id='overlay' className='fixed z-20 inset-0 bg-black bg-oapcity-25 bg-opacity-25 backdrop-blur-[3px] flex justify-center items-center'>
         <div className={`bg-white ${className}`}>
            {children}
         </div>
      </div>
   )
}

export default PopUpModal