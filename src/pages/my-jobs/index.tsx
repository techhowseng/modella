import MyJobs from "features/MyJobs"
import BioData from 'features/BioData'
import HeaderFooter from 'layouts/HeaderFooter'
import { SITE_NAME } from 'lib/constants'
import React from 'react'

const BiodataPage = () => {
   return (
      <HeaderFooter title={`My Jobs | ${SITE_NAME}`}>
         <MyJobs />
      </HeaderFooter>
   )
}

export default BiodataPage