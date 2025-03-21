"use client"

import { AlertTriangle,ArrowLeft, Camera, Loader2, Save, Shield, Stethoscope, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  console.log(activeTab)
  const router = useRouter()
  

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    bloodGroup: "O+",
    address: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  })

  const [medicalInfo, setMedicalInfo] = useState({
    allergies: "Penicillin, Peanuts",
    chronicConditions: "Asthma, Hypertension",
    currentMedications: "Albuterol, Lisinopril",
    emergencyContact: "+91 9876543211",
    emergencyRelation: "Spouse",
    primaryDoctor: "Dr. Sarah Johnson",
    primaryDoctorContact: "+91 9876543212",
    insuranceProvider: "Health Insurance Co.",
    policyNumber: "HI123456789",
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleMedicalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMedicalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Profile information saved successfully")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen">


      <div className="flex-1">
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Sidebar */}
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full bg-background h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>

                  <Separator className="my-4" />

                  <div className="w-full space-y-2">
                    <Link href="/dashboard/profile/update">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard/profile/security">
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                      </Button>
                    </Link>
                    <Link href="/dashboard/profile/delete">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-destructive hover:text-destructive"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Content */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal and medical information</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </TabsTrigger>
                    <TabsTrigger value="medical" className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Medical Information
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={personalInfo.fullName}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={personalInfo.dateOfBirth}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Input
                          id="gender"
                          name="gender"
                          value={personalInfo.gender}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Input
                          id="bloodGroup"
                          name="bloodGroup"
                          value={personalInfo.bloodGroup}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={personalInfo.address}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={personalInfo.city} onChange={handlePersonalInfoChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={personalInfo.state} onChange={handlePersonalInfoChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={personalInfo.pincode}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="medical" className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies (if any)</Label>
                        <Input
                          id="allergies"
                          name="allergies"
                          value={medicalInfo.allergies}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chronicConditions">Chronic Conditions (if any)</Label>
                        <Input
                          id="chronicConditions"
                          name="chronicConditions"
                          value={medicalInfo.chronicConditions}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentMedications">Current Medications (if any)</Label>
                        <Input
                          id="currentMedications"
                          name="currentMedications"
                          value={medicalInfo.currentMedications}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primaryDoctor">Primary Doctor</Label>
                        <Input
                          id="primaryDoctor"
                          name="primaryDoctor"
                          value={medicalInfo.primaryDoctor}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primaryDoctorContact">Doctor's Contact</Label>
                        <Input
                          id="primaryDoctorContact"
                          name="primaryDoctorContact"
                          value={medicalInfo.primaryDoctorContact}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          name="emergencyContact"
                          value={medicalInfo.emergencyContact}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelation">Relationship</Label>
                        <Input
                          id="emergencyRelation"
                          name="emergencyRelation"
                          value={medicalInfo.emergencyRelation}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                        <Input
                          id="insuranceProvider"
                          name="insuranceProvider"
                          value={medicalInfo.insuranceProvider}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="policyNumber">Policy Number</Label>
                        <Input
                          id="policyNumber"
                          name="policyNumber"
                          value={medicalInfo.policyNumber}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

