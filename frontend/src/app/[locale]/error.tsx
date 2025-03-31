"use client"

import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="max-w-md w-full p-6 text-center">
        <div className="bg-destructive/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Return home
            </Button>
          </Link>
        </div>
        {error.digest && <p className="text-xs text-muted-foreground mt-6">Error ID: {error.digest}</p>}
      </div>
    </div>
  )
}

