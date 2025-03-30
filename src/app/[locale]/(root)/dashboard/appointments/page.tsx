"use client"

import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Edit,
  FileText,
  Filter,
  Loader2,
  MapPin,
  Phone,
  Plus,
  Search,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Sample appointments data
const appointmentsData = [
  {
    id: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    hospital: "City Hospital",
    address: "123 Medical Center Blvd, Mumbai",
    date: "2025-04-15",
    time: "10:30",
    status: "upcoming",
    notes: "Annual heart checkup",
    contactNumber: "+91 9876543210",
  },
  {
    id: 2,
    doctorName: "Dr. Rajesh Patel",
    specialty: "Dermatologist",
    hospital: "Skin & Care Clinic",
    address: "456 Health Street, Mumbai",
    date: "2025-04-22",
    time: "14:00",
    status: "upcoming",
    notes: "Follow-up for skin condition",
    contactNumber: "+91 9876543211",
  },
  {
    id: 3,
    doctorName: "Dr. Priya Sharma",
    specialty: "General Physician",
    hospital: "Community Health Center",
    address: "789 Wellness Road, Mumbai",
    date: "2025-03-10",
    time: "09:15",
    status: "completed",
    notes: "Regular checkup",
    contactNumber: "+91 9876543212",
  },
  {
    id: 4,
    doctorName: "Dr. Michael Chen",
    specialty: "Neurologist",
    hospital: "Neuro Care Institute",
    address: "321 Brain Avenue, Mumbai",
    date: "2025-02-28",
    time: "11:45",
    status: "completed",
    notes: "Headache consultation",
    contactNumber: "+91 9876543213",
  },
  {
    id: 5,
    doctorName: "Dr. Ananya Gupta",
    specialty: "Gynecologist",
    hospital: "Women's Health Clinic",
    address: "567 Care Lane, Mumbai",
    date: "2025-01-15",
    time: "16:30",
    status: "cancelled",
    notes: "Annual checkup",
    contactNumber: "+91 9876543214",
  },
]

// Sample nearby hospitals data
const nearbyHospitalsData = [
  {
    id: 1,
    name: "City Hospital",
    address: "123 Medical Center Blvd, Mumbai",
    distance: "2.5 km",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "General Medicine"],
    rating: 4.5,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    name: "Apollo Hospitals",
    address: "456 Health Street, Mumbai",
    distance: "3.8 km",
    specialties: ["Oncology", "Pediatrics", "Dermatology", "Gastroenterology"],
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    name: "Lilavati Hospital",
    address: "789 Wellness Road, Mumbai",
    distance: "5.2 km",
    specialties: ["Cardiology", "Urology", "ENT", "Ophthalmology"],
    rating: 4.6,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 4,
    name: "Fortis Hospital",
    address: "321 Care Avenue, Mumbai",
    distance: "6.7 km",
    specialties: ["Neurology", "Orthopedics", "Pulmonology", "Nephrology"],
    rating: 4.4,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 5,
    name: "Kokilaben Dhirubhai Ambani Hospital",
    address: "567 Health Park, Mumbai",
    distance: "8.3 km",
    specialties: ["Oncology", "Cardiology", "Neurosurgery", "Transplant"],
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=200",
  },
]

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showBookDialog, setShowBookDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null)
  console.log("selectedAppointment", selectedAppointment)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bookingFormData, setBookingFormData] = useState({
    doctorName: "",
    specialty: "",
    hospital: "",
    date: "",
    time: "",
    notes: "",
  })


  const handleBookingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBookingFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setBookingFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBookAppointment = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Appointment booked successfully!")

      setShowBookDialog(false)
      setBookingFormData({
        doctorName: "",
        specialty: "",
        hospital: "",
        date: "",
        time: "",
        notes: "",
      })
    } catch  {
      toast.error("Failed to book appointment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelAppointment = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

        toast.success("Appointment cancelled successfully!")

      setShowCancelDialog(false)
      setSelectedAppointment(null)
    } catch  {
        toast.error("Failed to cancel appointment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAppointments = appointmentsData.filter((appointment) => {
    // Filter by tab
    if (activeTab !== "all" && appointment.status !== activeTab) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        appointment.doctorName.toLowerCase().includes(query) ||
        appointment.specialty.toLowerCase().includes(query) ||
        appointment.hospital.toLowerCase().includes(query)
      )
    }

    return true
  })

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

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Appointments</h1>
            <Button onClick={() => setShowBookDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Past</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search appointments..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="upcoming" className="space-y-6">
              {filteredAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{appointment.doctorName}</CardTitle>
                            <CardDescription>{appointment.specialty}</CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          >
                            Upcoming
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(appointment.date).toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString(undefined, {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {appointment.hospital}, {appointment.address}
                            </span>
                          </div>
                          {appointment.notes && (
                            <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{appointment.notes}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-4">
                        <Button variant="outline" size="sm">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setSelectedAppointment(appointment.id)
                              setShowCancelDialog(true)
                            }}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                  <p className="text-muted-foreground mb-6">You don't have any upcoming appointments scheduled.</p>
                  <Button onClick={() => setShowBookDialog(true)}>Book New Appointment</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              {filteredAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{appointment.doctorName}</CardTitle>
                            <CardDescription>{appointment.specialty}</CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          >
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(appointment.date).toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString(undefined, {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {appointment.hospital}, {appointment.address}
                            </span>
                          </div>
                          {appointment.notes && (
                            <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{appointment.notes}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-4">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          View Summary
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Follow-up
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Check className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No past appointments</h3>
                  <p className="text-muted-foreground mb-6">You don't have any past appointments in your history.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-6">
              {filteredAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{appointment.doctorName}</CardTitle>
                            <CardDescription>{appointment.specialty}</CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          >
                            Cancelled
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(appointment.date).toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString(undefined, {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {appointment.hospital}, {appointment.address}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-4">
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Reschedule
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <X className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No cancelled appointments</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any cancelled appointments in your history.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              {filteredAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{appointment.doctorName}</CardTitle>
                            <CardDescription>{appointment.specialty}</CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              appointment.status === "upcoming"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : appointment.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }
                          >
                            {appointment.status === "upcoming"
                              ? "Upcoming"
                              : appointment.status === "completed"
                                ? "Completed"
                                : "Cancelled"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(appointment.date).toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString(undefined, {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {appointment.hospital}, {appointment.address}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-4">
                        {appointment.status === "upcoming" ? (
                          <>
                            <Button variant="outline" size="sm">
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                setSelectedAppointment(appointment.id)
                                setShowCancelDialog(true)
                              }}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                          </>
                        ) : appointment.status === "completed" ? (
                          <Button variant="outline" size="sm" className="ml-auto">
                            <FileText className="mr-2 h-4 w-4" />
                            View Summary
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="ml-auto">
                            <Calendar className="mr-2 h-4 w-4" />
                            Reschedule
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No appointments found</h3>
                  <p className="text-muted-foreground mb-6">No appointments match your search criteria.</p>
                  <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Nearby Hospitals & Clinics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyHospitalsData.map((hospital) => (
                <Card key={hospital.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <Image
                      src={hospital.image || "/placeholder.svg"}
                      alt={hospital.name}
                        width={400}
                        height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{hospital.name}</CardTitle>
                      <Badge variant="outline">{hospital.distance}</Badge>
                    </div>
                    <CardDescription>{hospital.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {hospital.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {hospital.specialties.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hospital.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(hospital.rating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1">{hospital.rating.toFixed(1)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setBookingFormData((prev) => ({
                          ...prev,
                          hospital: hospital.name,
                        }))
                        setShowBookDialog(true)
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline">
                View More Hospitals
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Appointment Dialog */}
      <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book New Appointment</DialogTitle>
            <DialogDescription>Fill in the details to schedule a new medical appointment</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="doctorName">Doctor's Name</Label>
              <Input
                id="doctorName"
                name="doctorName"
                placeholder="Dr. John Doe"
                value={bookingFormData.doctorName}
                onChange={handleBookingFormChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select
                value={bookingFormData.specialty}
                onValueChange={(value) => handleSelectChange("specialty", value)}
              >
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="general">General Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospital">Hospital/Clinic</Label>
              <Input
                id="hospital"
                name="hospital"
                placeholder="City Hospital"
                value={bookingFormData.hospital}
                onChange={handleBookingFormChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={bookingFormData.date}
                  onChange={handleBookingFormChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={bookingFormData.time}
                  onChange={handleBookingFormChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Reason for visit or any special requirements"
                value={bookingFormData.notes}
                onChange={handleBookingFormChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBookAppointment} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                "Book Appointment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Appointment Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>Are you sure you want to cancel this appointment?</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-start gap-3 bg-muted/30 p-3 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Cancellation Policy</p>
                <p className="text-sm text-muted-foreground">
                  Appointments cancelled less than 24 hours before the scheduled time may incur a cancellation fee.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancelAppointment} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Appointment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

