import { SITE_NAME } from "lib/constants"
import { APP_ROUTES } from "lib/routes"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import Logo from "./Logo"
import { useAppSelector } from "store/hooks"
import { useSearch } from "features/Jobs/hooks"
import { getJobs } from "features/ClientAccount/slice"
import SearchBar from "./SearchBar"
import { TbAdjustmentsHorizontal } from "react-icons/tb"
import { ImCancelCircle } from "react-icons/im"
import FilterPopup from "./FilterPopup"
import { OnToggle } from "../../types"
import { FiMenu } from "react-icons/fi"
import { LiaTimesSolid } from "react-icons/lia"

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false)
   const {
      data: { jobs },
      loading,
      error,
   } = useAppSelector(getJobs);
   const { handleChange, handleSubmit, search, setSearch } = useSearch();

   useEffect(() => {
      handleSubmit({ preventDefault: () => { } });
   }, []);

   return (
      <nav className="flex items-center justify-between z-50">
         <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black base-color">{SITE_NAME}</h1>
         </div>
         <div className="hidden lg:block">
            <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
         </div>
         <div className="z-50 relative">
            <div onClick={() => setIsOpen(prev => !prev)} className="base-bg-color cursor-pointer p-3 hover:saturation-50 rounded-xl">
               {!isOpen ? <TbAdjustmentsHorizontal className="text-white w-[100%] text-xl" /> :
                  <ImCancelCircle className="text-white w-[100%] text-xl" />}
            </div>
            {isOpen && (<div onMouseLeave={() => setIsOpen(false)}>
               <FilterPopup />
            </div>)}
         </div>
      </nav>
   )
}

export default Navbar