"use client"

import {
  Activity,
  AlertCircle,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Droplet,
  Heart,
  MessageSquare,
  Pill,
  Plus,
  QrCode,
  Search,
  Thermometer,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HealthMetrics } from "@/components/dashboard/health-metrics"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { UpcomingReminders } from "@/components/dashboard/upcoming-reminders"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [healthScore, setHealthScore] = useState(78)



  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Quick Actions */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link href="/dashboard/upload">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <Upload className="h-6 w-6 text-primary" />
                  <span>Upload Documents</span>
                </Button>
              </Link>
              <Link href="/dashboard/qr-code">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <QrCode className="h-6 w-6 text-primary" />
                  <span>View QR Code</span>
                </Button>
              </Link>
              <Link href="/dashboard/chat">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span>AI Chat</span>
                </Button>
              </Link>
              <Link href="/dashboard/reminders">
                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                  <Bell className="h-6 w-6 text-primary" />
                  <span>Reminders</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Health Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Health Score</CardTitle>
            <CardDescription>Based on your medical records</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-4">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - healthScore / 100)}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold">{healthScore}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Good
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Regular Checkups
              </Badge>
            </div>
            <Link href="/dashboard/health">
              <Button variant="link" size="sm" className="gap-1">
                View detailed health insights
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="health">Health Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Documents</CardTitle>
                  <Link href="/dashboard/documents">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <RecentDocuments />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Reminders</CardTitle>
                  <Link href="/dashboard/reminders">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <UpcomingReminders />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Health Metrics</CardTitle>
                <Link href="/dashboard/health">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <CardDescription>Track your key health indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthMetrics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Your Medical Documents</CardTitle>
              <CardDescription>Manage all your uploaded medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
                  />
                </div>
                <div className="flex gap-2">
                  <Link href="/dashboard/upload">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Upload
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium">Hospital Records</div>
                  <div className="divide-y">
                    {[
                      { name: "Annual Checkup Report", hospital: "City Hospital", date: "15 Mar 2025" },
                      { name: "Blood Test Results", hospital: "City Hospital", date: "15 Mar 2025" },
                      { name: "X-Ray Report", hospital: "City Hospital", date: "15 Mar 2025" },
                    ].map((doc, i) => (
                      <div key={i} className="px-4 py-3 flex justify-between items-center hover:bg-muted/50">
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {doc.hospital} • {doc.date}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium">Test Reports</div>
                  <div className="divide-y">
                    {[
                      { name: "Lipid Profile", type: "Blood Test", date: "10 Feb 2025" },
                      { name: "Thyroid Function Test", type: "Blood Test", date: "10 Feb 2025" },
                    ].map((doc, i) => (
                      <div key={i} className="px-4 py-3 flex justify-between items-center hover:bg-muted/50">
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {doc.type} • {doc.date}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/documents" className="w-full">
                <Button variant="outline" className="w-full">
                  Go to Document Manager
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reminders">
          <Card>
            <CardHeader>
              <CardTitle>Health Reminders</CardTitle>
              <CardDescription>Keep track of your upcoming appointments and medication schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Upcoming</h3>
                <Link href="/dashboard/reminders/add">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Reminder
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Annual Health Checkup</h4>
                          <p className="text-sm text-muted-foreground">City Hospital, Dr. Smith</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                        >
                          Tomorrow
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>April 10, 2025</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>10:30 AM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Pill className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Take Medication</h4>
                          <p className="text-sm text-muted-foreground">Vitamin D Supplement</p>
                        </div>
                        <Badge variant="outline">Daily</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>8:00 AM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Dental Checkup</h4>
                          <p className="text-sm text-muted-foreground">Smile Dental Clinic, Dr. Johnson</p>
                        </div>
                        <Badge variant="outline">Next Week</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>April 15, 2025</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>2:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/reminders" className="w-full">
                <Button variant="outline" className="w-full">
                  Manage All Reminders
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
              <CardDescription>Track your vital health indicators over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Blood Pressure</h4>
                      <p className="text-sm text-muted-foreground">Last updated: 2 days ago</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    120/80 <span className="text-sm font-normal text-muted-foreground">mmHg</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                  >
                    Normal
                  </Badge>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Droplet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Blood Glucose</h4>
                      <p className="text-sm text-muted-foreground">Last updated: 1 week ago</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    98 <span className="text-sm font-normal text-muted-foreground">mg/dL</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                  >
                    Normal
                  </Badge>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Thermometer className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Body Temperature</h4>
                      <p className="text-sm text-muted-foreground">Last updated: 3 days ago</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    98.6 <span className="text-sm font-normal text-muted-foreground">°F</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                  >
                    Normal
                  </Badge>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Body Mass Index (BMI)</h3>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Current: 23.5</span>
                    <span className="text-green-600 dark:text-green-400">Normal</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mb-1 relative">
                    <div className="absolute h-full w-full">
                      <div
                        className="h-full bg-green-200 dark:bg-green-900/50 rounded-l-full"
                        style={{ width: "18.5%" }}
                      ></div>
                      <div
                        className="h-full bg-green-400 dark:bg-green-700 absolute left-[18.5%]"
                        style={{ width: "6.5%" }}
                      ></div>
                      <div
                        className="h-full bg-yellow-400 dark:bg-yellow-700 absolute left-[25%]"
                        style={{ width: "5%" }}
                      ></div>
                      <div
                        className="h-full bg-orange-400 dark:bg-orange-700 absolute left-[30%]"
                        style={{ width: "5%" }}
                      ></div>
                      <div
                        className="h-full bg-red-400 dark:bg-red-700 absolute left-[35%]"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div
                      className="absolute h-4 w-4 bg-primary rounded-full top-1/2 -translate-y-1/2"
                      style={{ left: "calc(23.5% - 8px)" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Cholesterol Levels</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Total Cholesterol</span>
                        <span className="text-sm">180 mg/dL</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">HDL (Good)</span>
                        <span className="text-sm">55 mg/dL</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">LDL (Bad)</span>
                        <span className="text-sm">110 mg/dL</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/health/add" className="w-full">
                <Button variant="outline" className="w-full">
                  Add New Health Metrics
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

