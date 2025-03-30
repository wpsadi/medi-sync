"use client"

import { Activity, AlertTriangle, ArrowLeft, CheckCircle,Clock, Heart, Lock, Phone, Pill } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CombinedUserData } from "@/services/User/getUserApi"



export default function TemporaryProfilePage({userInfo}:{
  userInfo: CombinedUserData 
}) {
  const userData = {
    id: userInfo.id,
    fullName: userInfo.name,
    dateOfBirth: userInfo.dateOfBirth,
    gender: userInfo.gender,
    bloodGroup: userInfo.medicalInformation.bloodGroup,
    allergies: userInfo.medicalInformation.allergies.join(", "),
    chronicConditions: userInfo.medicalInformation.chronicConditions.join(", "),
    currentMedications: userInfo.medicalInformation.currentMedications.join(", "),
    emergencyContact: userInfo.phone,
    emergencyRelation: "Biradar",
  }
//   const params = useParams()
  const searchParams = useSearchParams()
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showFullDetails, setShowFullDetails] = useState(false)
  const [expiryTime, setExpiryTime] = useState<Date | null>(null)


  const expires = "never"
  const fullDetails = searchParams.get("full") === "1"

  useEffect(() => {
    // Simulate API validation of the temporary link
    const validateLink = async () => {
      setIsLoading(true)

      try {
        // In a real app, you would make an API call to validate the token
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (expires !== "never") {
          const expiryTimestamp = Number.parseInt(expires)
          const now = Date.now()

          if (expiryTimestamp > now) {
            setIsValid(true)
            setExpiryTime(new Date(expiryTimestamp))
            setShowFullDetails(fullDetails)
          } else {
            setIsValid(false)
          }
        } else {
          setIsValid(true)
        }
      } catch  {
        setIsValid(false)
      } finally {
        setIsLoading(false)
      }
    }

    validateLink()
  }, [expires, fullDetails])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Validating Medical Profile Link</CardTitle>
            <CardDescription className="text-center">Please wait while we verify this link...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isValid) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Link Expired or Invalid</CardTitle>
            <CardDescription className="text-center">
              This temporary medical profile link has expired or is invalid.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            <Lock className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground mb-4">
              For security reasons, temporary links expire after a set period or can only be used once.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Temporary Access
        </Badge>
      </div>

      {expiryTime && (
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30 py-2 px-4 rounded-md">
          <Clock className="h-4 w-4" />
          <span>This link will expire on {expiryTime.toLocaleString()}</span>
        </div>
      )}

      <Card className="border-2 border-primary">
        <CardHeader className="bg-primary/10">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Medical Profile</CardTitle>
              <CardDescription>Temporary access to medical information</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{userData.bloodGroup}</div>
              <div className="text-sm text-muted-foreground">Blood Type</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold">{userData.fullName}</h2>
            <div className="flex gap-4 text-sm text-muted-foreground mt-1">
              <div>DOB: {new Date(userData.dateOfBirth).toLocaleDateString()}</div>
              <div>Gender: {userData.gender}</div>
              <div>ID: {userData.id}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="py-3 bg-red-50 dark:bg-red-900/20">
                <CardTitle className="text-base flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent className="py-3">
                <p>{userData.allergies || "None reported"}</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="py-3 bg-blue-50 dark:bg-blue-900/20">
                <CardTitle className="text-base flex items-center">
                  <Activity className="h-5 w-5 text-blue-500 mr-2" />
                  Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="py-3">
                <p>{userData.chronicConditions || "None reported"}</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="py-3 bg-green-50 dark:bg-green-900/20">
                <CardTitle className="text-base flex items-center">
                  <Pill className="h-5 w-5 text-green-500 mr-2" />
                  Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="py-3">
                <p>{userData.currentMedications || "None reported"}</p>
              </CardContent>
            </Card>
          </div>

          {showFullDetails && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Additional Medical Details</h3>
              <div className="space-y-4">
                {/* Additional details would be shown here based on what's included in the full profile */}
                <p className="text-muted-foreground">
                  Full medical details are available in this temporary link as requested by the profile owner.
                </p>
              </div>
            </div>
          )}

          <div className="border rounded-lg p-4 bg-muted/20">
            <h3 className="font-medium flex items-center mb-2">
              <Phone className="h-5 w-5 text-primary mr-2" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <div className="text-sm text-muted-foreground">Contact Number:</div>
                <div className="font-medium">{userData.emergencyContact}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Relationship:</div>
                <div className="font-medium">{userData.emergencyRelation}</div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <Heart className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Medical Disclaimer</h4>
              <p className="text-sm">
                This information is provided for healthcare purposes only. Please contact the emergency contact or
                healthcare provider for complete medical history.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/20 flex justify-between">
          <div className="text-sm text-muted-foreground">Powered by Medi-Sync</div>
          <div className="text-sm text-muted-foreground">
            Temporary access granted: {new Date().toLocaleDateString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


