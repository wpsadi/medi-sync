import { ArrowLeft,Home, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="text-[10rem] font-bold text-muted/20 leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-24 w-24 text-muted-foreground/50" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist or has been moved.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

