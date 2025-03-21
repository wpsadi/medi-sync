import { ArrowRight,Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CampsPage() {
  // Sample health camp data
  const healthCamps = [
    {
      id: 1,
      title: "General Health Checkup Camp",
      location: "City Community Center, 123 Main St",
      date: "April 15, 2025",
      time: "9:00 AM - 4:00 PM",
      organizer: "City Health Department",
      services: ["Blood Pressure", "Blood Sugar", "BMI", "Eye Checkup", "Dental Screening"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Women's Health Awareness Camp",
      location: "Women's Hospital, 456 Park Avenue",
      date: "April 22, 2025",
      time: "10:00 AM - 3:00 PM",
      organizer: "Women's Health Foundation",
      services: ["Mammography", "Pap Smear", "Bone Density", "Nutritional Counseling"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Diabetes Screening Camp",
      location: "Diabetes Care Center, 789 Health Blvd",
      date: "May 5, 2025",
      time: "8:00 AM - 2:00 PM",
      organizer: "Diabetes Association",
      services: ["Blood Glucose", "HbA1c", "Foot Examination", "Dietary Consultation"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Children's Vaccination Drive",
      location: "Pediatric Hospital, 321 Child Care Lane",
      date: "May 12, 2025",
      time: "9:00 AM - 5:00 PM",
      organizer: "Child Welfare Association",
      services: ["Routine Vaccinations", "Growth Assessment", "Developmental Screening"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Heart Health Checkup Camp",
      location: "Cardiac Care Institute, 654 Heart Street",
      date: "May 20, 2025",
      time: "10:00 AM - 4:00 PM",
      organizer: "Heart Foundation",
      services: ["ECG", "Blood Pressure", "Cholesterol Test", "Cardiac Risk Assessment"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Senior Citizens Health Camp",
      location: "Elder Care Center, 987 Golden Years Road",
      date: "June 2, 2025",
      time: "9:00 AM - 3:00 PM",
      organizer: "Senior Care Society",
      services: ["General Checkup", "Arthritis Screening", "Memory Assessment", "Medication Review"],
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Health Camps Near You</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover upcoming health camps in your area. Regular checkups and preventive care are essential for
          maintaining good health.
        </p>
      </div>

      {/* Location Filter (UI only, not functional) */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <div className="bg-muted p-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Enter your location to find nearby camps"
            className="flex-1 p-3 bg-background focus:outline-none"
          />
          <Button className="rounded-none h-full">Search</Button>
        </div>
      </div>

      {/* Health Camps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthCamps.map((camp) => (
          <Card key={camp.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-video bg-muted">
              <Image src={ "https://images.pexels.com/photos/30872819/pexels-photo-30872819/free-photo-of-elegant-coffee-set-on-a-sunlit-table-in-ankara.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} width={40} height={40} alt={camp.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{camp.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {camp.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {camp.date}, {camp.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Organized by: {camp.organizer}</span>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Services Offered:</h4>
                <div className="flex flex-wrap gap-2">
                  {camp.services.map((service, index) => (
                    <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Register for this Camp
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-16 bg-muted/30 rounded-lg p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Why Attend Health Camps?</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="font-bold text-primary text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold">Early Detection</h3>
                <p className="text-muted-foreground">
                  Regular health screenings can detect potential health issues before they become serious problems.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="font-bold text-primary text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Free or Low-Cost Services</h3>
                <p className="text-muted-foreground">
                  Many health camps offer essential services at no or minimal cost, making healthcare accessible to all.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="font-bold text-primary text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold">Health Education</h3>
                <p className="text-muted-foreground">
                  Learn about preventive measures and healthy lifestyle choices from healthcare professionals.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <span className="font-bold text-primary text-sm">4</span>
              </div>
              <div>
                <h3 className="font-semibold">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with others in your community who are also focused on improving their health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Can't Find a Camp Near You?</h2>
        <p className="text-muted-foreground mb-6">
          Register with Medi-Sync to receive notifications when new health camps are scheduled in your area.
        </p>
        <Link href="/auth/signup">
          <Button size="lg">
            Create Your Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

