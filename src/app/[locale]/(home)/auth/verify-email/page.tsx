"use client"

import { ArrowRight,CheckCircle, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect,useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const token = searchParams.get("token") || ""


  // Auto-verify if token is present
  useEffect(() => {
    if (token) {
      handleVerify()
    }
  }, [token])

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0 && !isVerified) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, isVerified])

  const handleVerify = async () => {
    setIsVerifying(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsVerified(true)

      toast.success("Email verified successfully")
      
    } catch {

      toast.error("Failed to verify email. The link may have expired or is invalid.")
      
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setCountdown(60)

      toast.success("Verification email sent successfully")
      
    } catch  {

      toast.error("Failed to send verification email. Please try again")
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>
            {isVerified ? "Your email has been successfully verified" : "Check your inbox for the verification link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isVerified ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email verified successfully</h3>
              <p className="text-muted-foreground mb-6">
                Your email address has been verified. You can now access all features of Medi-Sync.
              </p>
              <Link href="/auth/login">
                <Button>
                  Continue to login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Check your inbox</h3>
              <p className="text-muted-foreground mb-4">
                We've sent a verification link to <span className="font-medium">{email || "your email address"}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Click the link in the email to verify your account. If you don't see it, check your spam folder.
              </p>

              {token && isVerifying ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Verifying your email...</span>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleResend}
                  disabled={isLoading || countdown > 0}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : countdown > 0 ? (
                    `Resend email (${countdown}s)`
                  ) : (
                    "Resend verification email"
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isVerified && (
            <div className="text-center text-sm">
              <Link href="/auth/login" className="text-primary hover:underline">
                Back to login
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

