"use client"

import { ArrowLeft, Bell, BookOpen, Calendar, ChevronRight, FileQuestion, FileText, HelpCircle,Mail, MessageSquare, Phone, QrCode, Search, Shield, Smartphone, User } from 'lucide-react'
import Link from "next/link"
import {  useSearchParams } from "next/navigation"
import { useEffect,useState } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample FAQ data
const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: HelpCircle,
    faqs: [
      {
        id: "what-is-medi-sync",
        question: "What is Medi-Sync?",
        answer: "Medi-Sync is a comprehensive healthcare platform that allows you to store, manage, and share your medical information securely. It provides quick access to your critical medical data in emergencies through QR codes and helps you manage appointments, track health metrics, and receive timely reminders."
      },
      {
        id: "how-to-get-started",
        question: "How do I get started with Medi-Sync?",
        answer: "To get started with Medi-Sync, create an account, complete your medical profile with essential information, and set up your emergency QR code. You can then explore features like appointment scheduling, health metrics tracking, and reminders."
      },
      {
        id: "is-medi-sync-free",
        question: "Is Medi-Sync free to use?",
        answer: "Medi-Sync offers both free and premium plans. The basic features including medical profile management, QR code generation, and limited appointment scheduling are available in the free plan. Premium features include advanced health metrics tracking, unlimited appointment scheduling, and priority support."
      }
    ]
  },
  {
    id: "qr-code",
    name: "QR Code",
    icon: QrCode,
    faqs: [
      {
        id: "what-is-medical-qr",
        question: "What is a Medical QR Code?",
        answer: "A Medical QR Code is a quick response code that contains your essential medical information. When scanned by healthcare providers in emergencies, it provides immediate access to critical details like allergies, medical conditions, medications, and emergency contacts."
      },
      {
        id: "how-to-use-qr",
        question: "How do I use my Medical QR Code?",
        answer: "You can print your Medical QR Code and keep it in your wallet, wear it as a medical bracelet, or save it on your phone. In emergencies, healthcare providers can scan this code to access your vital medical information."
      },
      {
        id: "qr-code-security",
        question: "How secure is my Medical QR Code?",
        answer: "Your Medical QR Code is designed with security in mind. It only displays essential information needed in emergencies. For additional security, you can generate temporary links with expiration times when sharing with healthcare providers."
      }
    ]
  },
  {
    id: "appointments",
    name: "Appointments",
    icon: Calendar,
    faqs: [
      {
        id: "schedule-appointment",
        question: "How do I schedule a medical appointment?",
        answer: "To schedule an appointment, go to the Appointments page, click on 'Book New Appointment', select a healthcare provider or facility, choose an available date and time, and confirm your booking. You'll receive a confirmation notification and reminder."
      },
      {
        id: "cancel-appointment",
        question: "How can I cancel or reschedule an appointment?",
        answer: "To cancel or reschedule, go to the Appointments page, find the appointment you want to modify, and click on 'Cancel' or 'Reschedule'. Follow the prompts to complete the process. Please note that some facilities may have specific cancellation policies."
      },
      {
        id: "appointment-reminders",
        question: "Will I receive reminders for my appointments?",
        answer: "Yes, Medi-Sync automatically sends reminders for upcoming appointments. You can customize how and when you receive these reminders in the Notifications settings."
      }
    ]
  },
  {
    id: "health-metrics",
    name: "Health Metrics",
    icon: FileText,
    faqs: [
      {
        id: "track-metrics",
        question: "What health metrics can I track?",
        answer: "Medi-Sync allows you to track various health metrics including blood pressure, heart rate, blood glucose, weight, temperature, cholesterol levels, and more. You can also create custom metrics based on your specific health needs."
      },
      {
        id: "add-metrics",
        question: "How do I add new health measurements?",
        answer: "To add a new measurement, go to the Health Metrics page, select the metric you want to update, enter the new value and date/time, and save. You can also import data from compatible health devices and apps."
      },
      {
        id: "metrics-insights",
        question: "How can I understand my health metrics trends?",
        answer: "Medi-Sync provides visual graphs and charts to help you understand trends in your health metrics over time. The system also highlights values outside normal ranges and provides basic insights about your health data."
      }
    ]
  },
  {
    id: "account",
    name: "Account",
    icon: User,
    faqs: [
      {
        id: "update-profile",
        question: "How do I update my medical profile?",
        answer: "To update your medical profile, go to the Profile section in your dashboard, click on 'Edit Profile', make the necessary changes, and save. Remember to keep your medical information current for accuracy in emergencies."
      },
      {
        id: "change-password",
        question: "How can I change my password?",
        answer: "To change your password, go to Settings > Security, click on 'Change Password', enter your current password and your new password twice, then confirm the change."
      },
      {
        id: "delete-account",
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account by going to Settings > Account > Delete Account. Please note that this action is permanent and will remove all your data from our systems after a 30-day grace period."
      }
    ]
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    icon: Shield,
    faqs: [
      {
        id: "data-security",
        question: "How is my medical data secured?",
        answer: "Medi-Sync employs end-to-end encryption for all sensitive data, follows HIPAA compliance standards, and implements strict access controls. Your data is stored in secure, redundant servers with regular security audits and updates."
      },
      {
        id: "data-sharing",
        question: "Who can access my medical information?",
        answer: "Only you have full access to your medical information by default. You control who can access your data through QR codes, temporary links, or direct sharing. Healthcare providers can only access information you've explicitly shared with them."
      },
      {
        id: "data-deletion",
        question: "How can I request deletion of my data?",
        answer: "You can request complete deletion of your data through the Settings > Privacy > Delete My Data option. Upon verification, all your personal and medical data will be permanently removed from our systems within 30 days."
      }
    ]
  },
  {
    id: "mobile",
    name: "Mobile App",
    icon: Smartphone,
    faqs: [
      {
        id: "mobile-app-features",
        question: "What features are available in the mobile app?",
        answer: "The Medi-Sync mobile app includes all features available on the web platform, plus additional mobile-specific features like offline access to your QR code, quick emergency contact dialing, and health device integrations."
      },
      {
        id: "app-download",
        question: "How do I download the mobile app?",
        answer: "The Medi-Sync app is available for both iOS and Android devices. You can download it from the Apple App Store or Google Play Store by searching for 'Medi-Sync'."
      },
      {
        id: "sync-devices",
        question: "Does the app sync across multiple devices?",
        answer: "Yes, Medi-Sync automatically syncs your data across all your devices. Any changes made on one device will be reflected on all others when connected to the internet."
      }
    ]
  }
];

// Sample articles data
const helpArticles = [
  {
    id: "getting-started",
    title: "Getting Started with Medi-Sync",
    description: "Learn the basics of setting up and using your Medi-Sync account",
    category: "Basics",
    readTime: "5 min read",
    url: "/help/articles/getting-started"
  },
  {
    id: "qr-code-guide",
    title: "Complete Guide to Medical QR Codes",
    description: "Everything you need to know about creating and using your medical QR code",
    category: "QR Code",
    readTime: "8 min read",
    url: "/help/articles/qr-code-guide"
  },
  {
    id: "appointment-management",
    title: "Managing Your Medical Appointments",
    description: "Tips for scheduling, tracking, and managing your healthcare appointments",
    category: "Appointments",
    readTime: "6 min read",
    url: "/help/articles/appointment-management"
  },
  {
    id: "health-metrics-tracking",
    title: "Tracking Your Health Metrics",
    description: "How to record, monitor, and understand your health measurements",
    category: "Health Metrics",
    readTime: "7 min read",
    url: "/help/articles/health-metrics-tracking"
  },
  {
    id: "privacy-guide",
    title: "Privacy and Security Guide",
    description: "Understanding how your data is protected and managing your privacy settings",
    category: "Privacy",
    readTime: "10 min read",
    url: "/help/articles/privacy-guide"
  },
  {
    id: "mobile-app-tutorial",
    title: "Mobile App Tutorial",
    description: "Step-by-step guide to using the Medi-Sync mobile application",
    category: "Mobile",
    readTime: "9 min read",
    url: "/help/articles/mobile-app-tutorial"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("faq")
  const [filteredFaqs, setFilteredFaqs] = useState(faqCategories)
  const [filteredArticles, setFilteredArticles] = useState(helpArticles)
 
  const searchParams = useSearchParams()
  
  // Initialize search query from URL if present
  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
      handleSearch(query)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleSearch = (query: string = searchQuery) => {
    if (!query.trim()) {
      setFilteredFaqs(faqCategories)
      setFilteredArticles(helpArticles)
      return
    }

    const lowerQuery = query.toLowerCase()
    
    // Filter FAQs
    const faqs = faqCategories.map(category => {
      const filteredItems = category.faqs.filter(faq => 
        faq.question.toLowerCase().includes(lowerQuery) || 
        faq.answer.toLowerCase().includes(lowerQuery)
      )
      
      return filteredItems.length > 0 ? { ...category, faqs: filteredItems } : null
    }).filter(Boolean) as typeof faqCategories
    
    setFilteredFaqs(faqs)
    
    // Filter articles
    const articles = helpArticles.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) || 
      article.description.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery)
    )
    
    setFilteredArticles(articles)
    
    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", query)
    window.history.pushState({}, "", url)
    
    // Switch to appropriate tab if we have results
    if (faqs.length > 0 && articles.length === 0) {
      setActiveTab("faq")
    } else if (articles.length > 0 && faqs.length === 0) {
      setActiveTab("articles")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

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

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Help & Support Center</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions, browse help articles, or contact our support team
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for help topics, FAQs, or articles..."
                  className="pl-10 py-6 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button 
                  className="absolute right-1 top-1 bottom-1" 
                  onClick={() => handleSearch()}
                  disabled={!searchQuery.trim()}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <Link href="/help?q=qr+code">
                  <Button variant="outline" className="w-full justify-start h-auto py-3">
                    <QrCode className="mr-2 h-4 w-4" />
                    <span>QR Codes</span>
                  </Button>
                </Link>
                <Link href="/help?q=appointment">
                  <Button variant="outline" className="w-full justify-start h-auto py-3">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Appointments</span>
                  </Button>
                </Link>
                <Link href="/help?q=reminder">
                  <Button variant="outline" className="w-full justify-start h-auto py-3">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Reminders</span>
                  </Button>
                </Link>
                <Link href="/help?q=metrics">
                  <Button variant="outline" className="w-full justify-start h-auto py-3">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Health Metrics</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <FileQuestion className="h-4 w-4" />
                  FAQs
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Help Articles
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact Support
                </TabsTrigger>
              </TabsList>

              {/* FAQs Tab */}
              <TabsContent value="faq">
                {searchQuery && filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <FileQuestion className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No FAQs found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any FAQs matching your search. Try different keywords or browse our help articles.
                    </p>
                    <Button variant="outline" onClick={() => setActiveTab("articles")}>
                      Browse Help Articles
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredFaqs.map((category) => (
                      <Card key={category.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center">
                            <category.icon className="h-5 w-5 text-primary mr-2" />
                            {category.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            {category.faqs.map((faq) => (
                              <AccordionItem key={faq.id} value={faq.id}>
                                <AccordionTrigger className="text-left">
                                  {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Help Articles Tab */}
              <TabsContent value="articles">
                {searchQuery && filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any help articles matching your search. Try different keywords or browse our FAQs.
                    </p>
                    <Button variant="outline" onClick={() => setActiveTab("faq")}>
                      Browse FAQs
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <Link href={article.url}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <Badge variant="outline" className="mb-2">
                                {article.category}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {article.readTime}
                              </div>
                            </div>
                            <CardTitle className="text-lg">{article.title}</CardTitle>
                            <CardDescription>{article.description}</CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-0 pb-3">
                            <Button variant="link" className="p-0 h-auto" size="sm">
                              Read article
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Link>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Contact Support Tab */}
              <TabsContent value="contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-primary mr-2" />
                        Chat Support
                      </CardTitle>
                      <CardDescription>
                        Chat with our support team for immediate assistance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Our chat support is available Monday to Friday, 9 AM to 6 PM. 
                        Average response time: 5 minutes.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        Start Chat
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-2" />
                        Email Support
                      </CardTitle>
                      <CardDescription>
                        Send us an email and we'll get back to you
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        For non-urgent issues, email us at support@medi-sync.com. 
                        We typically respond within 24 hours.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Send Email
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="h-5 w-5 text-primary mr-2" />
                        Phone Support
                      </CardTitle>
                      <CardDescription>
                        Call our support team for urgent assistance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        For urgent matters, call our support line at +1 (800) 123-4567. 
                        Available Monday to Friday, 9 AM to 6 PM.
                      </p>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Before you call</h4>
                        <p className="text-sm text-muted-foreground">
                          Please have your account information ready. For technical issues, 
                          be prepared to describe the problem in detail and any error messages you've encountered.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Call Support
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
