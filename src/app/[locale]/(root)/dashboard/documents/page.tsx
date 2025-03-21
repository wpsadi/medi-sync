"use client"

import {
  ArrowLeft,
  Calendar,
  Download,
  Edit,
  File,
  FileText,
  Filter,
  Folder,
  Grid,
  Image,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Share,
  SortAsc,
  Star,
  StarOff,
  Tag,
  Trash,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Sample document data
const documents = [
  {
    id: 1,
    name: "Annual Checkup Report.pdf",
    type: "pdf",
    size: "2.4 MB",
    category: "Hospital Records",
    hospital: "City Hospital",
    date: "15 Mar 2025",
    starred: true,
  },
  {
    id: 2,
    name: "Blood Test Results.pdf",
    type: "pdf",
    size: "1.2 MB",
    category: "Test Reports",
    hospital: "City Hospital",
    date: "15 Mar 2025",
    starred: false,
  },
  {
    id: 3,
    name: "X-Ray Report.jpg",
    type: "image",
    size: "3.8 MB",
    category: "Radiology",
    hospital: "City Hospital",
    date: "15 Mar 2025",
    starred: false,
  },
  {
    id: 4,
    name: "Prescription - Antibiotics.pdf",
    type: "pdf",
    size: "0.5 MB",
    category: "Prescriptions",
    hospital: "City Hospital",
    date: "10 Feb 2025",
    starred: true,
  },
  {
    id: 5,
    name: "Dental Checkup.pdf",
    type: "pdf",
    size: "1.1 MB",
    category: "Dental Records",
    hospital: "Smile Dental Clinic",
    date: "05 Jan 2025",
    starred: false,
  },
  {
    id: 6,
    name: "MRI Scan Report.pdf",
    type: "pdf",
    size: "5.2 MB",
    category: "Radiology",
    hospital: "Advanced Imaging Center",
    date: "20 Dec 2024",
    starred: false,
  },
  {
    id: 7,
    name: "Vaccination Record.pdf",
    type: "pdf",
    size: "0.8 MB",
    category: "Immunization",
    hospital: "Community Health Center",
    date: "15 Nov 2024",
    starred: false,
  },
  {
    id: 8,
    name: "Allergy Test Results.pdf",
    type: "pdf",
    size: "1.5 MB",
    category: "Test Reports",
    hospital: "Allergy Specialists",
    date: "10 Oct 2024",
    starred: false,
  },
]

// Sample folders
const folders = [
  { id: 1, name: "Hospital Records", count: 12 },
  { id: 2, name: "Test Reports", count: 8 },
  { id: 3, name: "Prescriptions", count: 15 },
  { id: 4, name: "Radiology", count: 6 },
  { id: 5, name: "Dental Records", count: 3 },
  { id: 6, name: "Immunization", count: 4 },
]

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([])
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)

  const filteredDocuments = documents.filter((doc) => {
    // Filter by search query
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by current folder
    const matchesFolder = currentFolder ? doc.category === currentFolder : true

    return matchesSearch && matchesFolder
  })

  const toggleDocumentSelection = (id: number) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter((docId) => docId !== id))
    } else {
      setSelectedDocuments([...selectedDocuments, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredDocuments.map((doc) => doc.id))
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "image":
        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image className="h-6 w-6 text-blue-500" />
      default:
        return <File className="h-6 w-6 text-muted-foreground" />
    }
  }

  const toggleStarDocument = (id: number) => {
    // In a real app, this would update the document in the database
    console.log(`Toggling star for document ${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader />

      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Documents</CardTitle>
              <CardDescription>Organize and manage your medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Button
                  variant={currentFolder === null ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentFolder(null)}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  All Documents
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  Starred
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Recent
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Folders</h3>
                <div className="space-y-1">
                  {folders.map((folder) => (
                    <Button
                      key={folder.id}
                      variant={currentFolder === folder.name ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setCurrentFolder(folder.name)}
                    >
                      <Folder className="mr-2 h-4 w-4" />
                      {folder.name}
                      <span className="ml-auto text-xs text-muted-foreground">{folder.count}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Link href="/dashboard/upload">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>{currentFolder || "All Documents"}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "list" ? "secondary" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search documents..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Sort by date</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SortAsc className="mr-2 h-4 w-4" />
                        <span>Sort by name</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Tag className="mr-2 h-4 w-4" />
                        <span>Filter by type</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Link href="/dashboard/upload">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Document List */}
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No documents found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? "Try adjusting your search or filters" : "Upload your first document to get started"}
                  </p>
                  <Link href="/dashboard/upload">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Button>
                  </Link>
                </div>
              ) : viewMode === "list" ? (
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2 flex items-center">
                    <div className="flex items-center w-12">
                      <Checkbox
                        checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </div>
                    <div className="flex-1 font-medium">Name</div>
                    <div className="w-32 hidden md:block font-medium">Category</div>
                    <div className="w-32 hidden md:block font-medium">Date</div>
                    <div className="w-20 hidden sm:block font-medium">Size</div>
                    <div className="w-8"></div>
                  </div>

                  <div className="divide-y">
                    {filteredDocuments.map((doc) => (
                      <div key={doc.id} className="px-4 py-3 flex items-center hover:bg-muted/50">
                        <div className="flex items-center w-12">
                          <Checkbox
                            checked={selectedDocuments.includes(doc.id)}
                            onCheckedChange={() => toggleDocumentSelection(doc.id)}
                          />
                        </div>
                        <div className="flex-1 flex items-center min-w-0">
                          {getFileIcon(doc.type)}
                          <div className="ml-3 truncate">
                            <div className="font-medium truncate">{doc.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden">
                              {doc.category} • {doc.date}
                            </div>
                          </div>
                        </div>
                        <div className="w-32 hidden md:block text-sm text-muted-foreground">{doc.category}</div>
                        <div className="w-32 hidden md:block text-sm text-muted-foreground">{doc.date}</div>
                        <div className="w-20 hidden sm:block text-sm text-muted-foreground">{doc.size}</div>
                        <div className="w-8 flex items-center">
                          <Button variant="ghost" size="icon" onClick={() => toggleStarDocument(doc.id)}>
                            {doc.starred ? (
                              <Star className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                        <div className="w-8">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Rename</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden">
                      <div className="p-4 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <div className="font-medium truncate max-w-[150px]">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">{doc.category}</div>
                            <div className="text-xs text-muted-foreground">{doc.date}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => toggleStarDocument(doc.id)}>
                          {doc.starred ? (
                            <Star className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <div className="bg-muted px-4 py-2 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Rename</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

