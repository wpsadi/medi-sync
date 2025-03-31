import { Calendar, Clock, Pill } from "lucide-react"

import { Badge } from "@/components/ui/badge"

// Sample upcoming reminders
const upcomingReminders = [
  {
    id: 1,
    title: "Annual Health Checkup",
    location: "City Hospital",
    date: "April 10, 2025",
    time: "10:30 AM",
    type: "appointment",
    urgent: true,
  },
  {
    id: 2,
    title: "Take Medication",
    description: "Vitamin D Supplement",
    time: "8:00 AM",
    type: "medication",
    recurring: "daily",
    urgent: false,
  },
  {
    id: 3,
    title: "Dental Checkup",
    location: "Smile Dental Clinic",
    date: "April 15, 2025",
    time: "2:00 PM",
    type: "appointment",
    urgent: false,
  },
]

export function UpcomingReminders() {
  return (
    <div className="space-y-3">
      {upcomingReminders.map((reminder) => (
        <div
          key={reminder.id}
          className={`p-3 rounded-md border ${
            reminder.urgent
              ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
              : "hover:bg-muted/50"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-full ${
                reminder.urgent ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-primary/10"
              }`}
            >
              {reminder.type === "appointment" ? (
                <Calendar
                  className={`h-4 w-4 ${reminder.urgent ? "text-yellow-600 dark:text-yellow-400" : "text-primary"}`}
                />
              ) : (
                <Pill
                  className={`h-4 w-4 ${reminder.urgent ? "text-yellow-600 dark:text-yellow-400" : "text-primary"}`}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{reminder.title}</h4>
                  <p className="text-xs text-muted-foreground">{reminder.location || reminder.description}</p>
                </div>
                {reminder.urgent && (
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                  >
                    Soon
                  </Badge>
                )}
                {reminder.recurring && <Badge variant="outline">{reminder.recurring}</Badge>}
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                {reminder.date && (
                  <>
                    <Calendar className="h-3 w-3" />
                    <span>{reminder.date}</span>
                  </>
                )}
                {reminder.time && (
                  <>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{reminder.time}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {upcomingReminders.length === 0 && (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No upcoming reminders</p>
        </div>
      )}
    </div>
  )
}

