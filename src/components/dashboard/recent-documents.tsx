import { File,FileText, Image, Link } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CombinedUserData } from "@/services/User/getUserApi"



export function RecentDocuments({
  data
}:{
  data:CombinedUserData
}) {
  // get first four recent documents
  console.log(data.medicalRecords)
  const recentDocuments = data.medicalRecords.length > 4 ? data.medicalRecords.slice(0, 4) : data.medicalRecords

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "image":
        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image className="h-5 w-5 text-blue-500" />
      default:
        return <File className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-1">
{/* 
      {
        recentDocuments.length == 0 && (<>
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
          <div>
            <div className="font-medium">No recent documents</div>
          </div>
        </div>
          
        </>)
      } */}
      {recentDocuments.length > 0 &&  recentDocuments.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
          <div className="flex items-center gap-3">
            {getFileIcon("unknown")}
            <div>
              <div className="font-medium">{doc.fileName}</div>
              <div className="text-xs text-muted-foreground">
                {doc.hospitalName} • {doc.visitDate}
              </div>
            </div>
          </div>
          <Link href={doc.fileUrl}>
          <Button variant="ghost" size="sm">
            View
          </Button>
          </Link>
          
        </div>
      ))}

      {recentDocuments.length === 0 && (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No recent documents</p>
        </div>
      )}
    </div>
  )
}

