"use client"

import { Activity, AlertTriangle, ArrowLeft, Heart, Phone, Pill } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock user data - in a real app, this would come from your API/backend
const userData = {
  id: "user-123456",
  fullName: "John Doe",
  dateOfBirth: "1990-05-15",
  gender: "Male",
  bloodGroup: "O+",
  allergies: "Penicillin, Peanuts",
  chronicConditions: "Asthma, Hypertension",
  currentMedications: "Albuterol, Lisinopril",
  emergencyContact: "+91 9876543211",
  emergencyRelation: "Spouse",
}

export default function MedicalProfilePreviewPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          Emergency View
        </Badge>
      </div>

      <Card className="border-2 border-primary">
        <CardHeader className="bg-primary/10">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Medical Emergency Profile</CardTitle>
              <CardDescription>Essential medical information for emergency situations</CardDescription>
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
                This information is provided for emergency purposes only. Please contact the emergency contact or
                healthcare provider for complete medical history.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/20 flex justify-between">
          <div className="text-sm text-muted-foreground">Powered by Medi-Sync</div>
          <div className="text-sm text-muted-foreground">Generated: {new Date().toLocaleDateString()}</div>
        </CardFooter>
      </Card>
    </div>
  )
}

