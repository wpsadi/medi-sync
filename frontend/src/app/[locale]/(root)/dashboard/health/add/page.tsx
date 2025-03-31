"use client"

import { ArrowLeft, Loader2,Save } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from 'sonner'

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function AddHealthMetricPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [metricType, setMetricType] = useState("bloodPressure")
  const [formData, setFormData] = useState({
    // Blood Pressure
    systolic: "",
    diastolic: "",
    // Blood Glucose
    bloodGlucose: "",
    measurementType: "fasting", // fasting, random, post-meal
    // Heart Rate
    heartRate: "",
    // Temperature
    temperature: "",
    // Weight
    weight: "",
    // Cholesterol
    totalCholesterol: "",
    hdl: "",
    ldl: "",
    triglycerides: "",
    // Common fields
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().split(" ")[0].slice(0, 5),
    notes: ""
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      toast.success("Measurement saved successfully!")

      router.push("/dashboard/health")
    } catch {
        toast.error("Failed to save measurement. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
  

      <div className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <DashboardHeader />

          <div className="mb-6">
            <Link href="/dashboard/health">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Health Metrics
              </Button>
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Add Health Measurement</CardTitle>
                <CardDescription>Record a new health metric measurement</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="metricType">Metric Type</Label>
                    <Select value={metricType} onValueChange={setMetricType}>
                      <SelectTrigger id="metricType">
                        <SelectValue placeholder="Select metric type" />
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

                  <Tabs value={metricType} onValueChange={setMetricType}>
                    <TabsList className="grid grid-cols-3 md:grid-cols-6">
                      <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
                      <TabsTrigger value="bloodGlucose">Blood Glucose</TabsTrigger>
                      <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
                      <TabsTrigger value="temperature">Temperature</TabsTrigger>
                      <TabsTrigger value="weight">Weight</TabsTrigger>
                      <TabsTrigger value="cholesterol">Cholesterol</TabsTrigger>
                    </TabsList>

                    {/* Blood Pressure Form */}
                    <TabsContent value="bloodPressure" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="systolic">Systolic (mmHg)</Label>
                          <Input
                            id="systolic"
                            name="systolic"
                            type="number"
                            placeholder="120"
                            value={formData.systolic}
                            onChange={handleChange}
                            required={metricType === "bloodPressure"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                          <Input
                            id="diastolic"
                            name="diastolic"
                            type="number"
                            placeholder="80"
                            value={formData.diastolic}
                            onChange={handleChange}
                            required={metricType === "bloodPressure"}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Blood Glucose Form */}
                    <TabsContent value="bloodGlucose" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodGlucose">Blood Glucose (mg/dL)</Label>
                        <Input
                          id="bloodGlucose"
                          name="bloodGlucose"
                          type="number"
                          placeholder="100"
                          value={formData.bloodGlucose}
                          onChange={handleChange}
                          required={metricType === "bloodGlucose"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="measurementType">Measurement Type</Label>
                        <Select 
                          value={formData.measurementType} 
                          onValueChange={(value) => handleSelectChange("measurementType", value)}
                        >
                          <SelectTrigger id="measurementType">
                            <SelectValue placeholder="Select measurement type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fasting">Fasting</SelectItem>
                            <SelectItem value="random">Random</SelectItem>
                            <SelectItem value="post-meal">Post-meal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    {/* Heart Rate Form */}
                    <TabsContent value="heartRate" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                        <Input
                          id="heartRate"
                          name="heartRate"
                          type="number"
                          placeholder="72"
                          value={formData.heartRate}
                          onChange={handleChange}
                          required={metricType === "heartRate"}
                        />
                      </div>
                    </TabsContent>

                    {/* Temperature Form */}
                    <TabsContent value="temperature" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Body Temperature (°F)</Label>
                        <Input
                          id="temperature"
                          name="temperature"
                          type="number"
                          step="0.1"
                          placeholder="98.6"
                          value={formData.temperature}
                          onChange={handleChange}
                          required={metricType === "temperature"}
                        />
                      </div>
                    </TabsContent>

                    {/* Weight Form */}
                    <TabsContent value="weight" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (lbs)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          step="0.1"
                          placeholder="165"
                          value={formData.weight}
                          onChange={handleChange}
                          required={metricType === "weight"}
                        />
                      </div>
                    </TabsContent>

                    {/* Cholesterol Form */}
                    <TabsContent value="cholesterol" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="totalCholesterol">Total Cholesterol (mg/dL)</Label>
                          <Input
                            id="totalCholesterol"
                            name="totalCholesterol"
                            type="number"
                            placeholder="180"
                            value={formData.totalCholesterol}
                            onChange={handleChange}
                            required={metricType === "cholesterol"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hdl">HDL (mg/dL)</Label>
                          <Input
                            id="hdl"
                            name="hdl"
                            type="number"
                            placeholder="55"
                            value={formData.hdl}
                            onChange={handleChange}
                            required={metricType === "cholesterol"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ldl">LDL (mg/dL)</Label>
                          <Input
                            id="ldl"
                            name="ldl"
                            type="number"
                            placeholder="110"
                            value={formData.ldl}
                            onChange={handleChange}
                            required={metricType === "cholesterol"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
                          <Input
                            id="triglycerides"
                            name="triglycerides"
                            type="number"
                            placeholder="150"
                            value={formData.triglycerides}
                            onChange={handleChange}
                            required={metricType === "cholesterol"}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      name="notes"
                      placeholder="Any additional information about this measurement"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => router.push("/dashboard/health")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Measurement
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
