import BioData from 'features/BioData'
import HeaderFooter from 'layouts/HeaderFooter'
import { SITE_NAME } from 'lib/constants'
import React from 'react'

const BiodataPage = () => {
   return (
      <HeaderFooter title={`Biodata | ${SITE_NAME}`}>
         <BioData />
      </HeaderFooter>
   )
}

export default BiodataPage