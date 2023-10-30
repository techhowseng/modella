import SetNotifcation from 'features/SetNotification'
import HeaderFooter from 'layouts/HeaderFooter'
import { SITE_NAME } from 'lib/constants'
import React from 'react'

const AccountInformation = () => {
   return (
      <HeaderFooter title={`Notification Settings | ${SITE_NAME}`}>
         <SetNotifcation />
      </HeaderFooter>
   )
}

export default AccountInformation