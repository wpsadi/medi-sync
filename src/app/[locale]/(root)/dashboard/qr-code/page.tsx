"use client"

import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  FileWarning,
  LinkIcon,
  Loader,
  Printer,
  QrCode,
  Shield,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef,useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QR } from "@/services/QRservice"


// Mock user data - in a real app, this would come from your API/backend
const userData = {
  id: "user-123456",
  fullName: "John Doe",
  dateOfBirth: "1990-05-15",
  gender: "Male",
  bloodGroup: "O+",
  allergies: "Penicillin, Peanuts",
  chronicConditions: "Asthma, Hypertension",
  emergencyContact: "+91 9876543211",
  emergencyRelation: "Spouse",
}

export default function QrCodePage() {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [tempLink, setTempLink] = useState("")
  const [linkExpiry, setLinkExpiry] = useState("24")
  const [includeFullDetails, setIncludeFullDetails] = useState(false)
  const [showQrDialog, setShowQrDialog] = useState(false)
  const [isGeneratingLink, setIsGeneratingLink] = useState(false)

const [qrMetaState, setQrMetaState] = useState({
    qrCodeUrl: undefined as string | undefined,
    success: false,
    error: false,
    loading: false,

})

const storeUrl = async()=>{
    const response = await QR.getOrCreateQR()

    console.log("QR Code Response:", response)

    if (response.error){
        toast.error(response.error)
        setQrMetaState((prev) => ({ ...prev, error: true,
            loading: false,
            qrCodeUrl: undefined,
         }))
        return
    }

    if (response.data){
        console.log("QR Code URL:", response.data)
        setQrMetaState((prev) => ({ ...prev, qrCodeUrl: response.data!,
            success: true,
            loading: false,
         }))
        return
    }
}

useEffect(() => {
    if (!qrMetaState.qrCodeUrl){
        setQrMetaState((prev) => ({ ...prev, loading: true }))
        storeUrl()

    }


},[])

//   const [activeTab, setActiveTab] = useState("qr-code")

  const qrCodeRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
//   const { toast } = useToast()


  // Function to generate a temporary link
  const generateTemporaryLink = () => {
    setIsGeneratingLink(true)

    // Simulate API call to generate link
    setTimeout(() => {
      const baseUrl = window.location.origin
      const randomId = Math.random().toString(36).substring(2, 15)
      const generatedLink = `${baseUrl}/qr/${userData.id}/${randomId}?expires=${Date.now() + Number.parseInt(linkExpiry) * 60 * 60 * 1000}&full=${includeFullDetails ? 1 : 0}`

      setTempLink(generatedLink)
      setShowLinkDialog(true)
      setIsGeneratingLink(false)
    }, 1000)
  }

  // Function to copy link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(tempLink)
    toast.info("The temporary link has been copied to your clipboard.")
  }

  // Function to download QR code as image
  const downloadQrCode = () => {
    // In a real app, you would generate and download the QR code image
    toast("Your QR code has been downloaded successfully.")
  }

  // Function to print QR code
  const printQrCode = () => {
    window.print()
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-6">


          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* QR Code Section */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Your Medical QR Code</CardTitle>
                  <CardDescription>
                    This QR code provides access to your essential medical information in emergencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="qr-code">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="qr-code">QR Code</TabsTrigger>
                      <TabsTrigger value="profile-details">Profile Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="qr-code" className="pt-6">
                      <div className="flex flex-col items-center">
                        <div
                          ref={qrCodeRef}
                          className="border p-4 rounded-lg bg-white mb-6 print:border-2 print:border-black"
                          onClick={() => setShowQrDialog(true)}
                        >
                          <div className="text-center mb-2 print:mb-4">
                            <h3 className="font-bold text-lg print:text-xl">Medi-Sync Emergency Profile</h3>
                            <p className="text-sm text-muted-foreground print:text-base print:text-black">
                              Scan for medical information
                            </p>
                          </div>

                          <div className="w-64 h-64 mx-auto cursor-pointer relative">
                            {/* <Image
                              src={qrMetaState.qrCodeUrl || "/placeholder.svg?height=300&width=300"}
                              alt="Medical QR Code"
                                width={300}
                                height={300}
                              className="w-full h-full"
                            /> */}
                            {
                                qrMetaState.loading && <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/10 rounded-md">
                                <Loader className="h-10 w-10 text-primary animate-spin" />
                              </div>
                            }

                            {
                                qrMetaState.qrCodeUrl && <Image
                                src={qrMetaState.qrCodeUrl}
                                alt="Medical QR Code"
                                  width={300}
                                  height={300}
                                className="w-full h-full"
                              />

                            }
                            {
                                qrMetaState.error && <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/10 rounded-md">
                                <FileWarning className="h-10 w-10 text-primary" />
                              </div>
                            }

                          </div>

                          <div className="text-center mt-4 print:mt-6">
                            <p className="font-medium print:text-lg">{userData.fullName}</p>
                            <p className="text-sm text-muted-foreground print:text-base print:text-black">
                              ID: {userData.id} • Blood: {userData.bloodGroup}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                          <Button variant="outline" onClick={() => setShowQrDialog(true)}>
                            <QrCode className="mr-2 h-4 w-4" />
                            View QR Code
                          </Button>
                          <Button variant="outline" onClick={downloadQrCode}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button variant="outline" onClick={printQrCode}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                          </Button>
                          <Button variant="outline" onClick={() => setShowLinkDialog(true)}>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Share Link
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="profile-details" className="pt-6">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label>Full Name</Label>
                            <div className="font-medium">{userData.fullName}</div>
                          </div>
                          <div className="space-y-1">
                            <Label>Date of Birth</Label>
                            <div className="font-medium">{new Date(userData.dateOfBirth).toLocaleDateString()}</div>
                          </div>
                          <div className="space-y-1">
                            <Label>Gender</Label>
                            <div className="font-medium">{userData.gender}</div>
                          </div>
                          <div className="space-y-1">
                            <Label>Blood Group</Label>
                            <div className="font-medium">{userData.bloodGroup}</div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label>Allergies</Label>
                          <div className="font-medium">{userData.allergies || "None"}</div>
                        </div>

                        <div className="space-y-1">
                          <Label>Chronic Conditions</Label>
                          <div className="font-medium">{userData.chronicConditions || "None"}</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label>Emergency Contact</Label>
                            <div className="font-medium">{userData.emergencyContact}</div>
                          </div>
                          <div className="space-y-1">
                            <Label>Relationship</Label>
                            <div className="font-medium">{userData.emergencyRelation}</div>
                          </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Information Visibility</h4>
                              <p className="text-sm text-muted-foreground">
                                This information will be visible when someone scans your QR code. Make sure it's
                                accurate and up-to-date.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>QR Code Information</CardTitle>
                  <CardDescription>How to use your medical QR code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Shield className="h-5 w-5 text-primary mr-2" />
                      Emergency Access
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      In emergencies, healthcare providers can scan this QR code to access your critical medical
                      information.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      Temporary Links
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Generate temporary links to share your medical profile with healthcare providers for a limited
                      time.
                    </p>
                    <Button onClick={generateTemporaryLink} disabled={isGeneratingLink} className="mt-2">
                      {isGeneratingLink ? "Generating..." : "Generate Temporary Link"}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <AlertTriangle className="h-5 w-5 text-primary mr-2" />
                      Privacy & Security
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your QR code is designed to balance accessibility in emergencies with privacy protection. Only
                      essential information is displayed.
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Usage Tips</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Print your QR code and keep it in your wallet or purse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Share temporary links with new healthcare providers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Update your medical information regularly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Consider wearing a medical bracelet with your QR code</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/profile")}>
                    Update Medical Information
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Temporary Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Temporary Medical Profile Link</DialogTitle>
            <DialogDescription>
              Share this link with healthcare providers for temporary access to your medical profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {tempLink ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input id="link" value={tempLink} readOnly className="font-mono text-sm" />
                  </div>
                  <Button size="sm" variant="outline" onClick={copyLinkToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>This link will expire in {linkExpiry} hours</span>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Link Expiry</Label>
                  <select
                    id="expiry"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={linkExpiry}
                    onChange={(e) => setLinkExpiry(e.target.value)}
                  >
                    <option value="1">1 hour</option>
                    <option value="6">6 hours</option>
                    <option value="12">12 hours</option>
                    <option value="24">24 hours</option>
                    <option value="48">48 hours</option>
                    <option value="72">72 hours</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="include-details" checked={includeFullDetails} onCheckedChange={setIncludeFullDetails} />
                  <Label htmlFor="include-details">Include full medical details</Label>
                </div>
                <div className="bg-muted/30 p-3 rounded-md text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <p>
                      Only share links with trusted healthcare providers. Anyone with this link can access your medical
                      information until it expires.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="sm:justify-between">
            {tempLink ? (
              <>
                <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                  Close
                </Button>
                <Button onClick={copyLinkToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={generateTemporaryLink} disabled={isGeneratingLink}>
                  {isGeneratingLink ? "Generating..." : "Generate Link"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Full View Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Medical QR Code</DialogTitle>
            <DialogDescription>Scan this QR code to access emergency medical information</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="border p-6 rounded-lg bg-white mb-4">
              <Image src={
                qrMetaState.qrCodeUrl || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtd2FybmluZy1pY29uIGx1Y2lkZS1maWxlLXdhcm5pbmciPjxwYXRoIGQ9Ik0xNSAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWN1oiLz48cGF0aCBkPSJNMTIgOXY0Ii8+PHBhdGggZD0iTTEyIDE3aC4wMSIvPjwvc3ZnPg=="
              } alt="Medical QR Code" className="w-64 h-64"
                width={300}
                height={300}
              />
            </div>
            <div className="text-center">
              <p className="font-medium">{userData.fullName}</p>
              <p className="text-sm text-muted-foreground">
                ID: {userData.id} • Blood: {userData.bloodGroup}
              </p>
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-wrap gap-2 w-full justify-between">
              <Button variant="outline" onClick={() => window.open("/qr/preview", "_blank")}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Preview
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={downloadQrCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button onClick={printQrCode}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

