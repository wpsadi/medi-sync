"use client"

import { format } from "date-fns"
import {
  Activity,
  ArrowLeft,
  Bell,
  Calendar,
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Pill,
  Plus,
} from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Sample reminders data
const remindersData = [
  {
    id: 1,
    title: "Take Blood Pressure Medication",
    type: "medication",
    date: "2025-04-10",
    time: "08:00",
    recurrence: "daily",
    notes: "Take with food",
    completed: false,
  },
  {
    id: 2,
    title: "Annual Health Checkup",
    type: "appointment",
    date: "2025-04-15",
    time: "10:30",
    recurrence: "none",
    notes: "Bring previous test reports",
    completed: false,
  },
  {
    id: 3,
    title: "Take Vitamin D Supplement",
    type: "medication",
    date: "2025-04-10",
    time: "20:00",
    recurrence: "daily",
    notes: "",
    completed: false,
  },
  {
    id: 4,
    title: "Measure Blood Glucose",
    type: "measurement",
    date: "2025-04-11",
    time: "07:30",
    recurrence: "daily",
    notes: "Before breakfast",
    completed: false,
  },
  {
    id: 5,
    title: "Dental Checkup",
    type: "appointment",
    date: "2025-04-20",
    time: "14:00",
    recurrence: "none",
    notes: "",
    completed: false,
  },
  {
    id: 6,
    title: "30 Minutes Walking",
    type: "exercise",
    date: "2025-04-10",
    time: "18:00",
    recurrence: "daily",
    notes: "",
    completed: false,
  },
  {
    id: 7,
    title: "Eye Examination",
    type: "appointment",
    date: "2025-05-05",
    time: "11:15",
    recurrence: "none",
    notes: "Bring glasses",
    completed: false,
  },
  {
    id: 8,
    title: "Take Thyroid Medication",
    type: "medication",
    date: "2025-04-10",
    time: "07:00",
    recurrence: "daily",
    notes: "Take on empty stomach",
    completed: true,
  },
]

// Group reminders by date
const groupRemindersByDate = (reminders: typeof remindersData) => {
  const grouped: Record<string, typeof remindersData> = {}

  reminders.forEach((reminder) => {
    if (!grouped[reminder.date]) {
      grouped[reminder.date] = []
    }
    grouped[reminder.date].push(reminder)
  })

  return grouped
}

export default function RemindersPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    title: "",
    type: "medication",
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    recurrence: "none",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setFormData((prev) => ({ ...prev, date: format(date, "yyyy-MM-dd") }))
    }
  }

  const handleAddReminder = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

        
      toast.success("Reminder added successfully!")

      setShowAddDialog(false)
      setFormData({
        title: "",
        type: "medication",
        date: format(new Date(), "yyyy-MM-dd"),
        time: format(new Date(), "HH:mm"),
        recurrence: "none",
        notes: "",
      })
    } catch  {
        toast.error("Failed to add reminder. Please try again.")
      
    } finally {
      setIsLoading(false)

    }
  }

  const handleMarkAsComplete = (id: number) => {
    // Simulate marking reminder as complete
    const updatedReminders = remindersData.map((reminder) =>
      reminder.id === id ? { ...reminder, completed: true } : reminder
    )
    toast.success("Reminder marked as complete!")
    // Update state or re-fetch reminders if needed
    console.log(updatedReminders)
  }

  // Filter reminders based on active tab
  const filteredReminders = remindersData.filter((reminder) => {
    if (activeTab === "upcoming") {
      return !reminder.completed
    } else if (activeTab === "completed") {
      return reminder.completed
    }
    return true
  })

  // Group filtered reminders by date
  const groupedReminders = groupRemindersByDate(filteredReminders)

  // Sort dates
  const sortedDates = Object.keys(groupedReminders).sort()

  // Get reminders for selected date in calendar view
  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
  const selectedDateReminders = groupedReminders[selectedDateStr] || []

  // Get dates with reminders for calendar highlighting
  const datesWithReminders = Object.keys(groupRemindersByDate(remindersData)).map((date) => new Date(date))

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
            <h1 className="text-3xl font-bold">Reminders</h1>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Reminder
            </Button>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
            </div>

            {/* Upcoming Reminders Tab */}
            <TabsContent value="upcoming" className="space-y-6">
              {sortedDates.length > 0 ? (
                sortedDates.map((date) => (
                  <div key={date}>
                    <h2 className="text-lg font-semibold mb-3">
                      {new Date(date).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {date === format(new Date(), "yyyy-MM-dd") && (
                        <Badge className="ml-2 bg-primary/10 text-primary">Today</Badge>
                      )}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupedReminders[date].map((reminder) => (
                        <Card key={reminder.id} className={reminder.completed ? "opacity-60" : ""}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{reminder.title}</CardTitle>
                              <Badge
                                variant="outline"
                                className={
                                  reminder.type === "medication"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                    : reminder.type === "appointment"
                                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                      : reminder.type === "measurement"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                }
                              >
                                {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {new Date(`2000-01-01T${reminder.time}`).toLocaleTimeString(undefined, {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                {reminder.recurrence !== "none" && (
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {reminder.recurrence.charAt(0).toUpperCase() + reminder.recurrence.slice(1)}
                                  </Badge>
                                )}
                              </div>
                              {reminder.notes && <div className="text-sm text-muted-foreground">{reminder.notes}</div>}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-auto"
                              onClick={() => handleMarkAsComplete(reminder.id)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Mark as Complete
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming reminders</h3>
                  <p className="text-muted-foreground mb-6">You don't have any upcoming reminders scheduled.</p>
                  <Button onClick={() => setShowAddDialog(true)}>Add New Reminder</Button>
                </div>
              )}
            </TabsContent>

            {/* Completed Reminders Tab */}
            <TabsContent value="completed" className="space-y-6">
              {sortedDates.length > 0 ? (
                sortedDates.map((date) => (
                  <div key={date}>
                    <h2 className="text-lg font-semibold mb-3">
                      {new Date(date).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupedReminders[date].map((reminder) => (
                        <Card key={reminder.id} className="bg-muted/20">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                <CardTitle className="text-lg line-through opacity-70">{reminder.title}</CardTitle>
                              </div>
                              <Badge variant="outline" className="opacity-70">
                                {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {new Date(`2000-01-01T${reminder.time}`).toLocaleTimeString(undefined, {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              {reminder.notes && <div className="text-sm text-muted-foreground">{reminder.notes}</div>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Check className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed reminders</h3>
                  <p className="text-muted-foreground mb-6">You haven't completed any reminders yet.</p>
                </div>
              )}
            </TabsContent>

            {/* Calendar View Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                    <CardDescription>View reminders for a specific date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="rounded-md border"
                      modifiers={{
                        highlighted: datesWithReminders,
                      }}
                      modifiersStyles={{
                        highlighted: {
                          backgroundColor: "hsl(var(--primary) / 0.1)",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}</CardTitle>
                    <CardDescription>
                      {selectedDateReminders.length} reminder{selectedDateReminders.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedDateReminders.length > 0 ? (
                      <div className="space-y-4">
                        {selectedDateReminders.map((reminder) => (
                          <div key={reminder.id} className="flex items-start gap-4 p-3 border rounded-lg">
                            <div
                              className={`p-2 rounded-full ${
                                reminder.type === "medication"
                                  ? "bg-blue-100 dark:bg-blue-900/30"
                                  : reminder.type === "appointment"
                                    ? "bg-purple-100 dark:bg-purple-900/30"
                                    : reminder.type === "measurement"
                                      ? "bg-green-100 dark:bg-green-900/30"
                                      : "bg-amber-100 dark:bg-amber-900/30"
                              }`}
                            >
                              {reminder.type === "medication" ? (
                                <Pill
                                  className={`h-5 w-5 ${
                                    reminder.type === "medication"
                                      ? "text-blue-600 dark:text-blue-400"
                                      : reminder.type === "appointment"
                                        ? "text-purple-600 dark:text-purple-400"
                                        : reminder.type === "measurement"
                                          ? "text-green-600 dark:text-green-400"
                                          : "text-amber-600 dark:text-amber-400"
                                  }`}
                                />
                              ) : reminder.type === "appointment" ? (
                                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                              ) : reminder.type === "measurement" ? (
                                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                              ) : (
                                <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{reminder.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(`2000-01-01T${reminder.time}`).toLocaleTimeString(undefined, {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                    {reminder.recurrence !== "none" && (
                                      <span className="ml-2">
                                        • {reminder.recurrence.charAt(0).toUpperCase() + reminder.recurrence.slice(1)}
                                      </span>
                                    )}
                                  </p>
                                </div>
                                {!reminder.completed && (
                                  <Button variant="ghost" size="sm" onClick={() => handleMarkAsComplete(reminder.id)}>
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                              {reminder.notes && <p className="text-sm text-muted-foreground mt-1">{reminder.notes}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <h3 className="font-medium mb-1">No reminders for this date</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select a different date or add a new reminder
                        </p>
                        <Button size="sm" onClick={() => setShowAddDialog(true)}>
                          Add Reminder
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedDate((prev) => {
                          if (!prev) return new Date()
                          const newDate = new Date(prev)
                          newDate.setDate(newDate.getDate() - 1)
                          return newDate
                        })
                      }
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous Day
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedDate((prev) => {
                          if (!prev) return new Date()
                          const newDate = new Date(prev)
                          newDate.setDate(newDate.getDate() + 1)
                          return newDate
                        })
                      }
                    >
                      Next Day
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Reminder Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Reminder</DialogTitle>
            <DialogDescription>
              Create a new reminder for medications, appointments, or other health activities
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Reminder Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Take Blood Pressure Medication"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Reminder Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select reminder type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="appointment">Appointment</SelectItem>
                  <SelectItem value="measurement">Measurement</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(new Date(formData.date), "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.date ? new Date(formData.date) : undefined}
                      onSelect={(date) =>
                        date && setFormData((prev) => ({ ...prev, date: format(date, "yyyy-MM-dd") }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recurrence">Recurrence</Label>
              <Select value={formData.recurrence} onValueChange={(value) => handleSelectChange("recurrence", value)}>
                <SelectTrigger id="recurrence">
                  <SelectValue placeholder="Select recurrence pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">One-time only</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Additional information or instructions"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReminder} disabled={isLoading || !formData.title}>
              {isLoading ? "Adding..." : "Add Reminder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

