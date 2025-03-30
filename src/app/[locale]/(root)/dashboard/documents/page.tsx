import React from 'react'

import { User } from '@/services/User.service'

import DocumentsPage from './documentsPage'

async function Page() {
    const {data,error} = await User.getUserData()
  
    if (error) {
      return <div>{error}</div>
    }
  
  return (
    <DocumentsPage data={data!}/>
  )
}

export default Page