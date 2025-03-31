import React, { Suspense } from 'react'

import Loading from './loading'

function Layout({
    children
}:{
    children:React.ReactNode
}) {
  return (
    <>
    <Suspense fallback={<Loading />}>
        
                {children}
      </Suspense>
    </>
  )
}

export default Layout