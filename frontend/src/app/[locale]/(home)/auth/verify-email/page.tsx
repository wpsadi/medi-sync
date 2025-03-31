"use client"

import { ArrowRight, CheckCircle, Loader2, Mail, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Auth } from "@/services/Auth.service"
import { User } from "@/services/User.service"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const [countdown, setCountdown] = useState(0);
  // to enable counter
  const timerVal = 60
  const [countdownEnabled, setCountdownEnabled] = useState(false)

  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const userId = searchParams.get("userId") || ""
  const secret = searchParams.get("secret") || ""

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0 && !isVerified && countdownEnabled) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, isVerified,countdownEnabled])

  // Dummy verification function
  

  const handleVerify = async () => {
    setIsVerifying(true)
    setIsError(false)

    try {
      const {error} = await Auth.verify(userId, secret)

      if (error) {
        setIsError(true)
        toast.error(error)
        return;
      }

      setIsVerified(true)
      toast.success("Email verified successfully")
    } catch  {
      setIsError(true)
      toast.error("Failed to verify email. The link may have expired or is invalid.")
    } finally {
      setIsVerifying(false)
    }
  }


  const handleBack = async () => {

    try {
      // Simulate API call
      const {error} = await User.logout()

      if (error) {
        toast.error(error)
        return;
      }

      toast.success("Redirecting to login page")
      router.push("/auth")
    } catch {
      toast.error("An error occurred. Please try again.")
    } 
  }

  const handleResend = async () => {
    setIsLoading(true)
    setCountdownEnabled(true)
    setCountdown(timerVal)

    try {
      // Simulate API call
      const {error} = await Auth.resendVerify()

      if (error) {
        toast.error(error)
        return;
      }

      setCountdown(60)
      toast.success("Verification email sent successfully")
    } catch {
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
            {isVerified
              ? "Your email has been successfully verified"
              : userId && secret
                ? "Click the button below to verify your email"
                : "Check your inbox for the verification link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isVerified ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email verified successfully</h3>
              <p className="text-muted-foreground mb-6">
                Your email address has been verified. You can now access all features of Medi-Sync.
              </p>
              <Link href="/dashboard">
                <Button>
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <XCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verification failed</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't verify your email. The link may have expired or is invalid.
              </p>
              <Button variant="outline" onClick={handleBack} className="w-full">
              Back to login
              </Button>
            </div>
          ) : userId && secret ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Verify your email address</h3>

              <Button onClick={handleVerify} disabled={isVerifying} className="w-full">
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify me!"
                )}
              </Button>
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

              <Button variant="outline" onClick={handleResend} disabled={isLoading || countdown > 0} className="w-full">
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
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isVerified && !isError && !userId && !secret && (
            <div className="text-center text-sm">
              {/* <Link href="/auth/login" className="text-primary hover:underline"> */}
              <Button variant="outline" onClick={handleBack} className="w-full">
              Back to login
              </Button>
          
              {/* </Link> */}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

