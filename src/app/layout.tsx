import React from 'react'
import { Toaster } from 'sonner'

function Layout({
    children
}:{
    children: React.ReactNode
}) {
    
  return (<>
  <Toaster/>
  {children}
  </>)
}

export default Layout