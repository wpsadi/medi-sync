"use client"

import {
  ArrowLeft,
  Bell,
  Calendar,
  Check,
  Cloud,
  Database,
  Globe,
  LinkIcon,
  Loader2,
  Lock,
  Plus,
  Save,
  Smartphone,
  X,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

// Sample connected apps data
const connectedApps = [
  {
    id: 1,
    name: "Google Calendar",
    icon: Calendar,
    category: "Calendars",
    status: "connected",
    lastSync: "2 hours ago",
  },
  {
    id: 2,
    name: "Apple Health",
    icon: Smartphone,
    category: "Health Apps",
    status: "connected",
    lastSync: "1 day ago",
  },
  {
    id: 3,
    name: "Dropbox",
    icon: Cloud,
    category: "Cloud Storage",
    status: "disconnected",
    lastSync: "Never",
  },
  {
    id: 4,
    name: "National Health Portal",
    icon: Database,
    category: "Govt Apps",
    status: "connected",
    lastSync: "1 week ago",
  },
  {
    id: 5,
    name: "Google Drive",
    icon: Cloud,
    category: "Cloud Storage",
    status: "connected",
    lastSync: "3 days ago",
  },
  {
    id: 6,
    name: "Aarogya Setu",
    icon: Database,
    category: "Govt Apps",
    status: "disconnected",
    lastSync: "Never",
  },
]

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const router = useRouter()

  const [settings, setSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    smsNotifications: false,
    appNotifications: true,
    twoFactorAuth: true,
    shareAnonymousData: false,
    autoSync: true,
    language: "English",
  })

  const handleToggle = (setting: string) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      toast.success("Settings saved successfully")
      
    }, 1500)
  }

  const handleConnectApp = (appId: number) => {
    // In a real app, this would open OAuth flow or connection dialog
    console.log(appId)
    toast.loading("Connecting app...")
  }

  const handleDisconnectApp = (appId: number) => {
    console.log(appId)
    // In a real app, this would disconnect the app
    toast.info("Disconnecting app...")
  }

  // Group apps by category
  const appsByCategory = connectedApps.reduce(
    (acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = []
      }
      acc[app.category].push(app)
      return acc
    },
    {} as Record<string, typeof connectedApps>,
  )

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
            {/* Settings Sidebar */}
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <div className="space-y-1">
                  <Button
                    variant={activeTab === "general" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("general")}
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    General
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                  </Button>
                  <Button
                    variant={activeTab === "security" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("security")}
                  >
                    <Lock className="mr-2 h-5 w-5" />
                    Security & Privacy
                  </Button>
                  <Button
                    variant={activeTab === "connected" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("connected")}
                  >
                    <LinkIcon className="mr-2 h-5 w-5" />
                    Connected Apps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Settings Content */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>
                  {activeTab === "general" && "General Settings"}
                  {activeTab === "notifications" && "Notification Preferences"}
                  {activeTab === "security" && "Security & Privacy"}
                  {activeTab === "connected" && "Connected Applications"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "general" && "Manage your account preferences"}
                  {activeTab === "notifications" && "Control how you receive notifications"}
                  {activeTab === "security" && "Manage your security settings and privacy preferences"}
                  {activeTab === "connected" && "Manage applications connected to your Medi-Sync account"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                      </div>
                      <Switch
                        id="darkMode"
                        checked={settings.darkMode}
                        onCheckedChange={() => handleToggle("darkMode")}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="language">Language</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                      </div>
                      <select
                        id="language"
                        className="rounded-md border border-input bg-background px-3 py-2"
                        value={settings.language}
                        onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoSync">Auto Sync</Label>
                        <p className="text-sm text-muted-foreground">Automatically sync your data across devices</p>
                      </div>
                      <Switch
                        id="autoSync"
                        checked={settings.autoSync}
                        onCheckedChange={() => handleToggle("autoSync")}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={() => handleToggle("emailNotifications")}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={() => handleToggle("smsNotifications")}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="appNotifications">App Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                      </div>
                      <Switch
                        id="appNotifications"
                        checked={settings.appNotifications}
                        onCheckedChange={() => handleToggle("appNotifications")}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        id="twoFactorAuth"
                        checked={settings.twoFactorAuth}
                        onCheckedChange={() => handleToggle("twoFactorAuth")}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="shareAnonymousData">Share Anonymous Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Help improve Medi-Sync by sharing anonymous usage data
                        </p>
                      </div>
                      <Switch
                        id="shareAnonymousData"
                        checked={settings.shareAnonymousData}
                        onCheckedChange={() => handleToggle("shareAnonymousData")}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Account Security</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start">
                          <Lock className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Smartphone className="mr-2 h-4 w-4" />
                          Manage Devices
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "connected" && (
                  <div className="space-y-6">
                    {Object.entries(appsByCategory).map(([category, apps]) => (
                      <div key={category} className="space-y-4">
                        <h3 className="font-medium">{category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {apps.map((app) => (
                            <div key={app.id} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                    <app.icon className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{app.name}</h4>
                                    <p className="text-xs text-muted-foreground">Last sync: {app.lastSync}</p>
                                  </div>
                                </div>
                                <Badge
                                  variant={app.status === "connected" ? "outline" : "secondary"}
                                  className={`${
                                    app.status === "connected"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {app.status === "connected" ? (
                                    <Check className="h-3 w-3 mr-1" />
                                  ) : (
                                    <X className="h-3 w-3 mr-1" />
                                  )}
                                  {app.status === "connected" ? "Connected" : "Disconnected"}
                                </Badge>
                              </div>
                              <div className="mt-4">
                                {app.status === "connected" ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => handleDisconnectApp(app.id)}
                                  >
                                    Disconnect
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => handleConnectApp(app.id)}
                                  >
                                    Connect
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center text-center">
                            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                            <h4 className="font-medium">Connect New App</h4>
                            <p className="text-xs text-muted-foreground mb-4">
                              Add another application to your account
                            </p>
                            <Button variant="outline" size="sm">
                              Browse Apps
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

