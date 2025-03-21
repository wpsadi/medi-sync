import { Activity,Droplet, Heart } from "lucide-react"

import { Progress } from "@/components/ui/progress"

export function HealthMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="text-2xl font-bold">
            120/80 <span className="text-sm font-normal text-muted-foreground">mmHg</span>
          </div>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400">Normal</div>
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
          <div className="text-2xl font-bold">
            98 <span className="text-sm font-normal text-muted-foreground">mg/dL</span>
          </div>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400">Normal</div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Heart Rate</h4>
              <p className="text-sm text-muted-foreground">Last updated: 3 days ago</p>
            </div>
          </div>
          <div className="text-2xl font-bold">
            72 <span className="text-sm font-normal text-muted-foreground">bpm</span>
          </div>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400">Normal</div>
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
  )
}

