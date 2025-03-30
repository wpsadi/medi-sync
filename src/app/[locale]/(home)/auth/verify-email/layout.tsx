import { redirect } from 'next/navigation';
import React from 'react'

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

    if (profile.data?.emailVerification) {
        return redirect(await Url.extendURL("dashboard"));
    }

  return (
    <>
    {children}
    </>
  )
}

export default Layout