import { User } from '@/services/User.service'
import React from 'react'
import DashboardPage from './dashComponent'

async function Page() {
  const {data,error} = await User.getUserData()

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
    <DashboardPage data={data!}/>
    
    </>
  )
}

export default Page