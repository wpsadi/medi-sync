import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-muted animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Loading Medi-Sync</h3>
          <p className="text-muted-foreground">Please wait while we prepare your health dashboard...</p>
        </div>
      </div>
    </div>
  )
}

