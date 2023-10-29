import BioData from 'features/BioData'
import CreateJobForm from 'features/CreateJobForm'
import HeaderFooter from 'layouts/HeaderFooter'
import { SITE_NAME } from 'lib/constants'
import React from 'react'

const CreateJobPage = () => {
   return (
      <HeaderFooter title={`Create Job  | ${SITE_NAME}`}>
         <CreateJobForm />
      </HeaderFooter>
   )
}

export default CreateJobPage