"use client"

import { ArrowLeft,File, Hospital, Loader2, Stethoscope, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Medical } from "@/services/Medical.service"


export default function UploadPage() {
  const [uploadMethod, setUploadMethod] = useState<"hospital" | "test">("hospital")
  console.log(uploadMethod)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    hospitalName: "",
    testType: "",
    date: "",
    description: "",
    isConfidential: false,
  })

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)

      


      setSelectedFiles([...selectedFiles, ...filesArray])
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isConfidential: checked }))
  }

  const simulateUpload =async () => {

    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file to upload.")
      return
    }

    const totalFiles = selectedFiles.length

    if (totalFiles >1) {
      toast.error("Please select only one file to upload for now.")
      return
    }


    setIsUploading(true)
    setUploadProgress(0)

    // create formdata as this
//     userId:550e8400-e29b-41d4-a716-446655440001
// fileName:MedicalRecords
// testType:Medical Test
// hospitalName:Batra hospital
// visitDate:2024-03-15T10:30:00Z
// description:It was a blood test.
// isConfidential:true
// file:some File

    // get the file from selectedFiles[0]
    const file = selectedFiles[0]



    const myformData= new FormData()




    myformData.append("fileName",file.name)
    myformData.append("testType",formData.testType)
    myformData.append("hospitalName",formData.hospitalName)
    myformData.append("visitDate",(new Date(formData.date)).toISOString())
    myformData.append("description",formData.description)
    myformData.append("isConfidential",formData.isConfidential.toString())
    myformData.append("file",file)

    const {data,error} = await Medical.uploadFile(myformData)

    if (error){
      toast.error(error)
      setIsUploading(false)
      return
    }

    if (!data){
      toast.error("Unable to upload file")
      setIsUploading(false)
      return
    }

    // since its success we can remove the file from the selected files
    setSelectedFiles([])
    setIsUploading(false)
    setUploadProgress(100)
    toast.success("File uploaded successfully")
    router.push("/dashboard/documents")


  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedFiles.length === 0) {
        toast.error("Please select at least one file to upload.")
      return
    }

    simulateUpload()
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Documents</CardTitle>
              <CardDescription>Add your medical records, test results, and prescriptions</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <Tabs defaultValue="hospital" onValueChange={(value) => setUploadMethod(value as "hospital" | "test")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="hospital" className="flex items-center gap-2">
                      <Hospital className="h-4 w-4" />
                      By Hospital/Clinic
                    </TabsTrigger>
                    <TabsTrigger value="test" className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      By Test Type
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="hospital" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="hospitalName">Hospital/Clinic Name</Label>
                      <Input
                        id="hospitalName"
                        name="hospitalName"
                        placeholder="e.g., City Hospital, Apollo Clinic"
                        value={formData.hospitalName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="test" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="testType">Test Type</Label>
                      <Select
                        value={formData.testType}
                        onValueChange={(value) => handleSelectChange("testType", value)}
                      >
                        <SelectTrigger id="testType">
                          <SelectValue placeholder="Select test type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blood-test">Blood Test</SelectItem>
                          <SelectItem value="x-ray">X-Ray</SelectItem>
                          <SelectItem value="mri">MRI</SelectItem>
                          <SelectItem value="ct-scan">CT Scan</SelectItem>
                          <SelectItem value="ultrasound">Ultrasound</SelectItem>
                          <SelectItem value="ecg">ECG/EKG</SelectItem>
                          <SelectItem value="prescription">Prescription</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="date">Date of Record</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Brief description of the documents"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isConfidential"
                    checked={formData.isConfidential}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="isConfidential" className="text-sm font-normal">
                    Mark as confidential (only accessible in emergencies)
                  </Label>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Upload Files</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="file"
                      id="fileUpload"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium mb-1">Drag and drop files here</p>
                      <p className="text-sm text-muted-foreground mb-4">or click to browse from your device</p>
                      <Button type="button" variant="outline" size="sm">
                        Select Files
                      </Button>
                    </label>
                    <p className="text-xs text-muted-foreground mt-4">Supported formats: PDF, JPG, PNG, DOC, DOCX</p>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Files ({selectedFiles.length})</Label>
                      <div className="border rounded-lg divide-y">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3">
                              <File className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                              </div>
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)}>
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove file</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300 ease-in-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading || selectedFiles.length === 0}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Files"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload Tips</CardTitle>
              <CardDescription>Get the most out of your document uploads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Organize by Category</h3>
                <p className="text-sm text-muted-foreground">
                  Choose between organizing by hospital/clinic or by test type for easier retrieval later.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">File Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Upload documents in PDF, JPG, PNG, or DOC formats for best compatibility.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Bulk Upload</h3>
                <p className="text-sm text-muted-foreground">
                  You can select multiple files at once to save time when uploading related documents.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">
                  Mark sensitive documents as confidential to restrict access during normal browsing.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/help/document-upload" className="w-full">
                <Button variant="link" className="w-full">
                  Learn more about document management
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

