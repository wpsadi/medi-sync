import React from 'react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

function HomeLayout({
    children
}:{
    children: React.ReactNode
}) {
  return (
   <> <div className="flex min-h-screen flex-col">
   <Navbar />
   <main className="flex-1">{children}</main>
   <Footer />
 </div>
   
   </>
  )
}

export default HomeLayout