import { File,FileText, Image } from "lucide-react"

import { Button } from "@/components/ui/button"

// Sample recent documents
const recentDocuments = [
  {
    id: 1,
    name: "Annual Checkup Report.pdf",
    type: "pdf",
    date: "15 Mar 2025",
    hospital: "City Hospital",
  },
  {
    id: 2,
    name: "Blood Test Results.pdf",
    type: "pdf",
    date: "15 Mar 2025",
    hospital: "City Hospital",
  },
  {
    id: 3,
    name: "X-Ray Report.jpg",
    type: "image",
    date: "15 Mar 2025",
    hospital: "City Hospital",
  },
  {
    id: 4,
    name: "Prescription - Antibiotics.pdf",
    type: "pdf",
    date: "10 Feb 2025",
    hospital: "City Hospital",
  },
]

export function RecentDocuments() {
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
      {recentDocuments.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
          <div className="flex items-center gap-3">
            {getFileIcon(doc.type)}
            <div>
              <div className="font-medium">{doc.name}</div>
              <div className="text-xs text-muted-foreground">
                {doc.hospital} • {doc.date}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            View
          </Button>
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

