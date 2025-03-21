"use client"

import {
  Activity,
  Bell,
  Calendar,
  FileText,
  Heart,
  HelpCircle,
  Home,
  Key,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  QrCode,
  Settings,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect,useState } from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const routes = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
      variant: "default",
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/dashboard/documents",
      variant: "ghost",
    },
    {
      title: "QR Code",
      icon: QrCode,
      href: "/dashboard/qr-code",
      variant: "ghost",
    },
    {
      title: "Reminders",
      icon: Bell,
      href: "/dashboard/reminders",
      variant: "ghost",
    },
    {
      title: "Health Metrics",
      icon: Activity,
      href: "/dashboard/health",
      variant: "ghost",
    },
    {
      title: "Appointments",
      icon: Calendar,
      href: "/dashboard/appointments",
      variant: "ghost",
    },
    {
      title: "Health Camps",
      icon: Heart,
      href: "/camps",
      variant: "ghost",
    },
    {
      title: "Geo Assistance",
      icon: MapPin,
      href: "/geo-assistance",
      variant: "ghost",
    },
    {
      title: "AI Chat",
      icon: MessageSquare,
      href: "/dashboard/chat",
      variant: "ghost",
    },
  ]

  const accountRoutes = [
    {
      title: "Profile",
      icon: User,
      href: "/dashboard/profile",
      variant: "ghost",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      variant: "ghost",
    },
    {
      title: "Developer",
      icon: Key,
      href: "/dashboard/developer",
      variant: "ghost",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      href: "/help",
      variant: "ghost",
    },
  ]

  const SidebarContent = () => (
    <div className={cn("h-full flex flex-col py-4", className)}>
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-6">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Medi-Sync
          </span>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} onClick={() => setIsMobileOpen(false)}>
              <Button variant={pathname === route.href ? "secondary" : "ghost"} className="w-full justify-start">
                <route.icon className="mr-2 h-5 w-5" />
                {route.title}
                {route.href === "/dashboard/chat" && (
                  <span className="ml-auto flex h-2 w-2 rounded-full bg-primary"></span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Account</h3>
          <div className="space-y-1">
            {accountRoutes.map((route) => (
              <Link key={route.href} href={route.href} onClick={() => setIsMobileOpen(false)}>
                <Button variant={pathname === route.href ? "secondary" : "ghost"} className="w-full justify-start">
                  <route.icon className="mr-2 h-5 w-5" />
                  {route.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="mt-auto px-3 py-2">
        <div className="space-y-1">
          <Link href="/auth/login">
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
              <LogOut className="mr-2 h-5 w-5" />
              Log out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )

  // Mobile sidebar (Sheet)
  if (isMobile) {
    return (
      <>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className="hidden lg:block border-r h-screen sticky top-0 w-64 overflow-y-auto">
      <SidebarContent />
    </div>
  )
}

