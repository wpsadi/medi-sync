import React from 'react'

import { Medical } from '@/services/Medical.service'

import DocumentsPage from './documentsPage'

async function Page() {
    const {data,error} = await Medical.listFiles()
  
    if (error) {
      return <div>{error}</div>
    }
  
  return (
    <DocumentsPage  files={data!}/>
  )
}

export default Page