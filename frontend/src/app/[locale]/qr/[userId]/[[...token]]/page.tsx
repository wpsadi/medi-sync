import React from 'react'

import { User } from '@/services/User.service';

import TemporaryProfilePage from './ui';

async function Page({
    params,
    }: {
    params: Promise<{ userId: string; token: string }>
}) {

    const userParams = await params;

    const userId= userParams.userId

    const profile =await User.getUserData(userId);

    if (profile.error){
        return <div className='text-red-500'>{profile.error}</div>
    }

    if (!profile.data){
        return <div className='text-red-500'>Unable to load user data</div>
    }




  return (
    <TemporaryProfilePage userInfo={profile.data!} />
    
    
  )
}

export default Page