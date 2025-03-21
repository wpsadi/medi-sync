import { redirect } from 'next/navigation';
import React from 'react'

import { User } from '@/services/User.service'
import { Url } from '@/utils/Url';

async function Layout({
    children
}:{
    children:React.ReactNode
}) {

    const onboardingInfo = await User.isOnboardingCompleted();

    if (onboardingInfo.error) {
        return redirect(Url.extendURL("auth"));
    }

    if (onboardingInfo.data) {
        return redirect(Url.extendURL("/dashboard"));
    }


  return (
    <>
    {children}
    </>
  )
}

export default Layout