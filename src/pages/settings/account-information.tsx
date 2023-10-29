import AccountInfo from 'features/AccountInfo'
import HeaderFooter from 'layouts/HeaderFooter'
import { SITE_NAME } from 'lib/constants'
import React from 'react'

const AccountInformation = () => {
   return (
      <HeaderFooter title={`Account Information | ${SITE_NAME}`}>
         <AccountInfo />
      </HeaderFooter>
   )
}

export default AccountInformation