import { Activity, ArrowRight, Clock, Heart, MapPin,QrCode, Shield } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 w-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 -z-10" />

        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Medi-Sync: Emergency Medical Data on the Go
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 md:mb-12">
              Instant access to critical medical information when seconds count. Save lives with faster, more accurate
              emergency response.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-6 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">QR-Based Access</h3>
                <p className="text-muted-foreground">
                  Scan a QR code to instantly access critical medical information in emergencies.
                </p>
              </div>

              <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-6 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your medical data is encrypted and only accessible to authorized healthcare providers.
                </p>
              </div>

              <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-6 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Alerts</h3>
                <p className="text-muted-foreground">
                  Automatic notifications to emergency contacts when your QR code is scanned.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Medi-Sync Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides a seamless experience for managing your medical data and ensuring it's available
              when needed most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-lg overflow-hidden border shadow-lg">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Activity className="h-24 w-24 text-muted-foreground/40" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="bg-primary/10 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h3 className="text-2xl font-semibold">Upload Your Medical History</h3>
                <p className="text-muted-foreground">
                  Easily upload and organize your medical records, test results, and prescriptions in a secure digital
                  vault.
                </p>
              </div>

              <div className="space-y-2">
                <div className="bg-primary/10 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h3 className="text-2xl font-semibold">Generate Your QR Code</h3>
                <p className="text-muted-foreground">
                  Create a unique QR code that links to your essential medical information for emergency situations.
                </p>
              </div>

              <div className="space-y-2">
                <div className="bg-primary/10 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h3 className="text-2xl font-semibold">Emergency Access</h3>
                <p className="text-muted-foreground">
                  Healthcare providers can scan your QR code to access critical information when you need treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 w-full bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Medi-Sync?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique benefits that make managing your health data simple and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-8 shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Better Emergency Care</h3>
              <p className="text-muted-foreground">
                Provide healthcare providers with instant access to your allergies, medications, and medical conditions
                in emergencies.
              </p>
            </div>

            <div className="bg-background rounded-lg p-8 shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Insights</h3>
              <p className="text-muted-foreground">
                Track your health trends and receive personalized insights based on your medical history and test
                results.
              </p>
            </div>

            <div className="bg-background rounded-lg p-8 shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Nearby Health Camps</h3>
              <p className="text-muted-foreground">
                Discover and register for health camps in your area for preventive care and regular check-ups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health Data?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users who trust Medi-Sync with their critical medical information. Sign up today and
                create your secure health profile.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Create Your Account
                  </Button>
                </Link>
                <Link href="/camps">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Find Health Camps
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

