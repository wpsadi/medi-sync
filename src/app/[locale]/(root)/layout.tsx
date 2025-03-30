import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

import { User } from '@/services/User.service'
import { Url } from '@/utils/Url';

async function Layout({
    children
}:{
    children:React.ReactNode
}) {

    const profile = await User.me();

    if (profile.error) {
        return redirect(await Url.extendURL("auth"));
    }

    console.log(profile.data?.emailVerification)

    if (!profile.data?.emailVerification) {
        return redirect(await Url.extendURL("/auth/verify-email?email=" + encodeURIComponent(profile.data!.email)));
    }



    // ensuring onboarding is completed

    const onboardingInfo = await User.isOnboardingCompleted();
    if (onboardingInfo.error) {
        return redirect(await Url.extendURL("auth"));
    }

    if (!onboardingInfo.data) {
        return redirect(await Url.extendURL("/auth/onboarding"));
    }


  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
        <div className='flex flex-col h-full'>
            <div className='flex-1'>
            {children}
            </div>
        </div>
    </Suspense>
  
    </>
  )
}

export default Layout