import { Ambulance, Hospital, MapPin, Navigation, Phone } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function GeoAssistancePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Geo AI-Powered Assistance</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find the nearest hospitals and emergency services when you need them most. Our Geo AI technology helps you
          locate medical facilities quickly in critical situations.
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="relative w-full h-[400px] bg-muted rounded-lg overflow-hidden mb-12 border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-primary/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              The interactive map will display nearby hospitals, clinics, and ambulance services based on your current
              location.
            </p>
            <Button>Enable Location Services</Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Hospital className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nearby Hospitals</h3>
            <p className="text-muted-foreground mb-4">
              Quickly locate the nearest hospitals and medical facilities with real-time availability information.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Filter by specialty and services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>View hospital ratings and reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Check bed availability in real-time</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Ambulance className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Emergency Services</h3>
            <p className="text-muted-foreground mb-4">
              Connect with ambulance services and emergency responders with just a tap in critical situations.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>One-tap ambulance request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Track ambulance arrival in real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Automatic sharing of medical QR code</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Navigation className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Navigation Assistance</h3>
            <p className="text-muted-foreground mb-4">
              Get turn-by-turn directions to the nearest medical facility with traffic-aware routing.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Real-time traffic updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Voice-guided directions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Alternative routes suggestions</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contacts Section */}
      <div className="bg-muted/30 rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4 flex items-center gap-4 border">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                <Phone className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold">Ambulance</h3>
                <p className="text-2xl font-bold">102</p>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 flex items-center gap-4 border">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">Police</h3>
                <p className="text-2xl font-bold">100</p>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 flex items-center gap-4 border">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold">Fire</h3>
                <p className="text-2xl font-bold">101</p>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 flex items-center gap-4 border">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Emergency Helpline</h3>
                <p className="text-2xl font-bold">112</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Access Emergency Services?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create your Medi-Sync account today to access Geo AI assistance and ensure you're prepared for any medical
          emergency.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Create Your Account
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

