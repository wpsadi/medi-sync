"use client"

import { Activity, AlertTriangle, ArrowLeft, Calendar, ChevronLeft,ChevronRight, Clock, Download, Droplet, Heart, LineChart, Plus, Thermometer, Upload, Weight } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample health metrics data
const healthMetricsData = {
  bloodPressure: {
    current: { systolic: 120, diastolic: 80 },
    history: [
      { date: "2025-03-01", systolic: 122, diastolic: 82 },
      { date: "2025-03-05", systolic: 118, diastolic: 78 },
      { date: "2025-03-10", systolic: 121, diastolic: 81 },
      { date: "2025-03-15", systolic: 120, diastolic: 80 },
      { date: "2025-03-20", systolic: 119, diastolic: 79 },
    ],
    unit: "mmHg",
    normalRange: { min: { systolic: 90, diastolic: 60 }, max: { systolic: 120, diastolic: 80 } },
    status: "normal"
  },
  bloodGlucose: {
    current: 98,
    history: [
      { date: "2025-03-01", value: 100 },
      { date: "2025-03-05", value: 102 },
      { date: "2025-03-10", value: 99 },
      { date: "2025-03-15", value: 98 },
      { date: "2025-03-20", value: 97 },
    ],
    unit: "mg/dL",
    normalRange: { min: 70, max: 99 },
    status: "normal"
  },
  heartRate: {
    current: 72,
    history: [
      { date: "2025-03-01", value: 74 },
      { date: "2025-03-05", value: 76 },
      { date: "2025-03-10", value: 73 },
      { date: "2025-03-15", value: 72 },
      { date: "2025-03-20", value: 71 },
    ],
    unit: "bpm",
    normalRange: { min: 60, max: 100 },
    status: "normal"
  },
  temperature: {
    current: 98.6,
    history: [
      { date: "2025-03-01", value: 98.4 },
      { date: "2025-03-05", value: 98.7 },
      { date: "2025-03-10", value: 98.5 },
      { date: "2025-03-15", value: 98.6 },
      { date: "2025-03-20", value: 98.6 },
    ],
    unit: "°F",
    normalRange: { min: 97.8, max: 99.1 },
    status: "normal"
  },
  weight: {
    current: 165,
    history: [
      { date: "2025-03-01", value: 168 },
      { date: "2025-03-05", value: 167 },
      { date: "2025-03-10", value: 166 },
      { date: "2025-03-15", value: 165 },
      { date: "2025-03-20", value: 165 },
    ],
    unit: "lbs",
    normalRange: { min: 140, max: 180 },
    status: "normal"
  },
  cholesterol: {
    current: { total: 180, hdl: 55, ldl: 110 },
    history: [
      { date: "2025-01-15", total: 190, hdl: 50, ldl: 120 },
      { date: "2025-02-15", total: 185, hdl: 52, ldl: 115 },
      { date: "2025-03-15", total: 180, hdl: 55, ldl: 110 },
    ],
    unit: "mg/dL",
    normalRange: { 
      total: { min: 0, max: 200 }, 
      hdl: { min: 40, max: 60 }, 
      ldl: { min: 0, max: 100 } 
    },
    status: "normal"
  }
};

// Sample health insights
const healthInsights = [
  {
    id: 1,
    title: "Blood Pressure Trend",
    description: "Your blood pressure has been stable over the past month, staying within the normal range.",
    type: "positive",
    metric: "Blood Pressure"
  },
  {
    id: 2,
    title: "Weight Management",
    description: "You've maintained a consistent weight over the past month. Keep up the good work!",
    type: "positive",
    metric: "Weight"
  },
  {
    id: 3,
    title: "Cholesterol Improvement",
    description: "Your LDL cholesterol has decreased by 8% over the past 3 months, showing good progress.",
    type: "positive",
    metric: "Cholesterol"
  }
];

export default function HealthMetricsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("bloodPressure")
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 dark:text-green-400"
      case "elevated":
        return "text-amber-600 dark:text-amber-400"
      case "high":
        return "text-red-600 dark:text-red-400"
      case "low":
        return "text-blue-600 dark:text-blue-400"
      default:
        return "text-muted-foreground"
    }
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

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Health Metrics</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/dashboard/health/add")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Measurement
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detailed View</TabsTrigger>
              <TabsTrigger value="insights">Health Insights</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Heart className="h-5 w-5 text-primary mr-2" />
                      Blood Pressure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {healthMetricsData.bloodPressure.current.systolic}/{healthMetricsData.bloodPressure.current.diastolic}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {healthMetricsData.bloodPressure.unit}
                      </span>
                    </div>
                    <div className={`text-sm ${getStatusColor(healthMetricsData.bloodPressure.status)}`}>
                      Normal
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last updated: Today
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Droplet className="h-5 w-5 text-primary mr-2" />
                      Blood Glucose
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {healthMetricsData.bloodGlucose.current}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {healthMetricsData.bloodGlucose.unit}
                      </span>
                    </div>
                    <div className={`text-sm ${getStatusColor(healthMetricsData.bloodGlucose.status)}`}>
                      Normal
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last updated: Today
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Activity className="h-5 w-5 text-primary mr-2" />
                      Heart Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {healthMetricsData.heartRate.current}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {healthMetricsData.heartRate.unit}
                      </span>
                    </div>
                    <div className={`text-sm ${getStatusColor(healthMetricsData.heartRate.status)}`}>
                      Normal
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last updated: Today
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Thermometer className="h-5 w-5 text-primary mr-2" />
                      Body Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {healthMetricsData.temperature.current}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {healthMetricsData.temperature.unit}
                      </span>
                    </div>
                    <div className={`text-sm ${getStatusColor(healthMetricsData.temperature.status)}`}>
                      Normal
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last updated: Today
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Weight className="h-5 w-5 text-primary mr-2" />
                      Weight
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {healthMetricsData.weight.current}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {healthMetricsData.weight.unit}
                      </span>
                    </div>
                    <div className={`text-sm ${getStatusColor(healthMetricsData.weight.status)}`}>
                      Normal
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last updated: Today
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Add New Metric</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center h-[calc(100%-60px)]">
                    <Button variant="outline" className="rounded-full h-12 w-12 mb-2" onClick={() => router.push("/dashboard/health/add")}>
                      <Plus className="h-6 w-6" />
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Track additional health metrics
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Cholesterol Levels</CardTitle>
                  <CardDescription>Last measured on {new Date(healthMetricsData.cholesterol.history[healthMetricsData.cholesterol.history.length - 1].date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Total Cholesterol</span>
                        <span className="text-sm">{healthMetricsData.cholesterol.current.total} mg/dL</span>
                      </div>
                      <Progress 
                        value={(healthMetricsData.cholesterol.current.total / healthMetricsData.cholesterol.normalRange.total.max) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>Desirable: &lt;200</span>
                        <span>240+</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">HDL (Good)</span>
                        <span className="text-sm">{healthMetricsData.cholesterol.current.hdl} mg/dL</span>
                      </div>
                      <Progress 
                        value={(healthMetricsData.cholesterol.current.hdl / healthMetricsData.cholesterol.normalRange.hdl.max) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>Good: 40-60</span>
                        <span>60+</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">LDL (Bad)</span>
                        <span className="text-sm">{healthMetricsData.cholesterol.current.ldl} mg/dL</span>
                      </div>
                      <Progress 
                        value={(healthMetricsData.cholesterol.current.ldl / healthMetricsData.cholesterol.normalRange.ldl.max) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>Optimal: &lt;100</span>
                        <span>160+</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Detailed View Tab */}
            <TabsContent value="details">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bloodPressure">Blood Pressure</SelectItem>
                      <SelectItem value="bloodGlucose">Blood Glucose</SelectItem>
                      <SelectItem value="heartRate">Heart Rate</SelectItem>
                      <SelectItem value="temperature">Body Temperature</SelectItem>
                      <SelectItem value="weight">Weight</SelectItem>
                      <SelectItem value="cholesterol">Cholesterol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {selectedMetric === "bloodPressure" && "Blood Pressure History"}
                    {selectedMetric === "bloodGlucose" && "Blood Glucose History"}
                    {selectedMetric === "heartRate" && "Heart Rate History"}
                    {selectedMetric === "temperature" && "Body Temperature History"}
                    {selectedMetric === "weight" && "Weight History"}
                    {selectedMetric === "cholesterol" && "Cholesterol History"}
                  </CardTitle>
                  <CardDescription>
                    Tracking changes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <LineChart className="h-12 w-12 mx-auto mb-4" />
                      <p>Chart visualization would appear here</p>
                      <p className="text-sm">Showing data for the last {timeRange === "week" ? "7 days" : timeRange === "month" ? "30 days" : timeRange === "3months" ? "3 months" : timeRange === "6months" ? "6 months" : "year"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Measurement History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted px-4 py-2 flex items-center font-medium">
                      <div className="w-1/3">Date</div>
                      <div className="w-1/3">Value</div>
                      <div className="w-1/3">Status</div>
                    </div>
                    <div className="divide-y">
                      {selectedMetric === "bloodPressure" ? (
                        healthMetricsData.bloodPressure.history.map((record, index) => (
                          <div key={index} className="px-4 py-3 flex items-center">
                            <div className="w-1/3">{new Date(record.date).toLocaleDateString()}</div>
                            <div className="w-1/3">{record.systolic}/{record.diastolic} {healthMetricsData.bloodPressure.unit}</div>
                            <div className="w-1/3">
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Normal
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : selectedMetric === "bloodGlucose" ? (
                        healthMetricsData.bloodGlucose.history.map((record, index) => (
                          <div key={index} className="px-4 py-3 flex items-center">
                            <div className="w-1/3">{new Date(record.date).toLocaleDateString()}</div>
                            <div className="w-1/3">{record.value} {healthMetricsData.bloodGlucose.unit}</div>
                            <div className="w-1/3">
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Normal
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : selectedMetric === "heartRate" ? (
                        healthMetricsData.heartRate.history.map((record, index) => (
                          <div key={index} className="px-4 py-3 flex items-center">
                            <div className="w-1/3">{new Date(record.date).toLocaleDateString()}</div>
                            <div className="w-1/3">{record.value} {healthMetricsData.heartRate.unit}</div>
                            <div className="w-1/3">
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Normal
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-center text-muted-foreground">
                          Select a metric to view history
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Health Insights Tab */}
            <TabsContent value="insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthInsights.map((insight) => (
                  <Card key={insight.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <Badge variant="outline" className={
                          insight.type === "positive" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                            : insight.type === "warning"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }>
                          {insight.metric}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{insight.description}</p>
                    </CardContent>
                  </Card>
                ))}

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Health Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                          <Heart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Maintain Healthy Blood Pressure</h3>
                          <p className="text-sm text-muted-foreground">
                            Continue with your current lifestyle habits that are helping maintain your blood pressure in the normal range.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Regular Exercise</h3>
                          <p className="text-sm text-muted-foreground">
                            Aim for at least 150 minutes of moderate-intensity exercise per week to maintain heart health.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Schedule Regular Check-ups</h3>
                          <p className="text-sm text-muted-foreground">
                            Your next recommended health check-up is due in 3 months. Consider scheduling an appointment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Health Insights Disclaimer</h4>
                    <p className="text-sm text-muted-foreground">
                      These insights are generated based on your health data and general medical guidelines. They are not a substitute for professional medical advice. Always consult with your healthcare provider before making any changes to your health regimen.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
