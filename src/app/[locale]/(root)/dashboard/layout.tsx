import React from 'react'

// import { DashboardHeader } from '@/components/dashboard/dashboard-header'    
import { Sidebar } from '@/components/dashboard/sidebar'

function DashLayout({
    children
}:{
    children: React.ReactNode
}) {
  return (
   <>

   <div className="flex min-h-screen">
       <Sidebar />
 
       <div className="flex-1 flex flex-col">
         <div className="container mx-auto">
           {/* <DashboardHeader /> */}
              {children}

            </div>
            </div>
            </div>
        
   
   </>
  )
}

export default DashLayout