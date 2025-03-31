"use client"

import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  Clock,
  MapPin,
  Mic,
  MicOff,
  MoreVertical,
  Plus,
  Search,
  Send,
  Trash,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect,useRef, useState } from "react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample chat history
const chatHistory = [
  {
    id: 1,
    title: "Blood Pressure Concerns",
    preview: "I've been experiencing high blood pressure...",
    date: "Today",
    time: "10:30 AM",
  },
  {
    id: 2,
    title: "Medication Side Effects",
    preview: "What are the common side effects of...",
    date: "Yesterday",
    time: "3:45 PM",
  },
  {
    id: 3,
    title: "Diet Recommendations",
    preview: "Can you suggest a diet plan for...",
    date: "Mar 18, 2025",
    time: "9:15 AM",
  },
]

// Sample messages for the current chat
const sampleMessages = [
  {
    id: 1,
    sender: "user",
    content:
      "I've been experiencing high blood pressure readings lately. My last reading was 145/95. Should I be concerned?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "ai",
    content:
      "Based on the information you've provided, a blood pressure reading of 145/95 is considered Stage 1 hypertension. This is higher than the normal range (less than 120/80 mmHg).\n\nWhile I can provide general information, I'm not a substitute for professional medical advice. Here are some points to consider:\n\n1. It's important to confirm high blood pressure with multiple readings over time.\n2. A single elevated reading doesn't necessarily mean you have chronic hypertension.\n3. Factors like stress, caffeine, and physical activity can temporarily raise blood pressure.\n\nI would recommend discussing these readings with your healthcare provider, especially since I can see from your medical history that you have a family history of cardiovascular issues.",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    sender: "user",
    content: "Thank you for the information. What lifestyle changes might help lower my blood pressure?",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    sender: "ai",
    content:
      "There are several lifestyle modifications that can help manage blood pressure:\n\n1. **Diet**: Follow the DASH diet (Dietary Approaches to Stop Hypertension)\n   - Reduce sodium intake (aim for less than 2,300mg per day)\n   - Increase fruits, vegetables, and whole grains\n   - Choose low-fat dairy products\n   - Limit saturated fats and cholesterol\n\n2. **Physical Activity**:\n   - Aim for at least 150 minutes of moderate-intensity exercise per week\n   - Activities like walking, swimming, or cycling are beneficial\n\n3. **Weight Management**:\n   - Losing even a small amount of weight can help lower blood pressure\n\n4. **Limit Alcohol**:\n   - No more than one drink per day for women and two for men\n\n5. **Quit Smoking**:\n   - Smoking raises blood pressure and damages blood vessels\n\n6. **Stress Management**:\n   - Practice relaxation techniques like meditation or deep breathing\n   - Ensure adequate sleep\n\nBased on your medical history in our records, I notice you've been managing stress well with your recent meditation practice. Continuing this could be particularly helpful for you.",
    timestamp: "10:38 AM",
  },
]

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<number | null>(1)
  const [messages, setMessages] = useState(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showDisclaimerDialog, setShowDisclaimerDialog] = useState(false)
  const [showFindDoctorDialog, setShowFindDoctorDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        content:
          "I understand your concern. Based on the information you've provided and your medical history in our system, I can offer some general guidance. However, for specific medical advice, I recommend consulting with a healthcare professional. Would you like me to help you locate a doctor near you?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      toast.info("voice call message...")
    } else {
      toast.info("voice call message...")

      // Simulate voice-to-text after a delay
      setTimeout(() => {
        setNewMessage("I've been having headaches and dizziness lately. Could this be related to my blood pressure?")
      }, 1500)
    }
  }

  const startNewChat = () => {
    setShowDisclaimerDialog(true)
  }

  const handleDeleteChat = (chatId: number) => {
    toast.dismiss("chat-deleted")

    if (activeChat === chatId) {
      setActiveChat(null)
      setMessages([])
    }
  }

  const handleAcceptDisclaimer = () => {
    setShowDisclaimerDialog(false)
    setActiveChat(Date.now())
    setMessages([])
    toast.success("Chat started successfully", { id: "chat-deleted" })
  }

  const handleFindDoctor = () => {
    setShowFindDoctorDialog(false)
    router.push("/geo-assistance")
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-6">
        

          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(20vh)]">
            {/* Chat Sidebar */}
            <Card className="lg:col-span-1 flex flex-col h- ">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button variant="ghost" size="icon" onClick={startNewChat}>
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search conversations..." className="pl-8" />
                </div>
              </CardHeader>
              <ScrollArea className="flex-1">
                <CardContent className="space-y-2">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-md cursor-pointer ${
                        activeChat === chat.id ? "bg-secondary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{chat.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{chat.preview}</p>
                        </div>
                        <div className="flex flex-col items-end ml-2">
                          <span className="text-xs text-muted-foreground">{chat.date}</span>
                          <div className="flex items-center mt-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteChat(chat.id)
                              }}
                            >
                              <Trash className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </ScrollArea>
            </Card>

            {/* Chat Content */}
            <Card className="lg:col-span-3 flex flex-col h-full">
              {activeChat ? (
                <>
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">Medi-Sync AI Assistant</CardTitle>
                          <CardDescription className="text-xs">
                            <span className="flex items-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                              Online
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 p-4 overflow-auto" >
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="flex items-start max-w-[80%]">
                            {message.sender === "ai" && (
                              <Avatar className="h-8 w-8 mr-2 mt-1">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                                <AvatarFallback>
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div
                                className={`rounded-lg p-3 ${
                                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <div className="whitespace-pre-line">{message.content}</div>
                              </div>
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {message.timestamp}
                              </div>
                            </div>
                            {message.sender === "user" && (
                              <Avatar className="h-8 w-8 ml-2 mt-1">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex items-start max-w-[80%]">
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                              <AvatarFallback>
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="rounded-lg p-3 bg-muted">
                                <div className="flex items-center">
                                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce animation-delay-200 mx-1"></div>
                                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce animation-delay-400"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  <CardFooter className="border-t p-3">
                    <div className="flex items-center w-full gap-2">
                      <Button variant={isRecording ? "destructive" : "outline"} size="icon" onClick={toggleRecording}>
                        {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                      <div className="relative flex-1">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="pr-10"
                        />
                      </div>
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <Bot className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Medi-Sync AI Assistant</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Chat with our AI assistant to get information about your health, medications, and medical
                    conditions.
                  </p>
                  <Button onClick={startNewChat}>Start New Conversation</Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer Dialog */}
      <AlertDialog open={showDisclaimerDialog} onOpenChange={setShowDisclaimerDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Medical Disclaimer</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    The Medi-Sync AI Assistant provides general health information and is not a substitute for
                    professional medical advice, diagnosis, or treatment.
                  </p>
                </div>
                <p>
                  Always seek the advice of your physician or other qualified health provider with any questions you may
                  have regarding a medical condition.
                </p>
                <p>
                  Never disregard professional medical advice or delay in seeking it because of something you have read
                  or heard from our AI Assistant.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAcceptDisclaimer}>I Understand</AlertDialogAction>
            <Button
              variant="outline"
              className="sm:ml-auto"
              onClick={() => {
                setShowDisclaimerDialog(false)
                setShowFindDoctorDialog(true)
              }}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Locate a Doctor Instead
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Find Doctor Dialog */}
      <AlertDialog open={showFindDoctorDialog} onOpenChange={setShowFindDoctorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Find a Healthcare Provider</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to locate a healthcare provider near you instead of using the AI assistant?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFindDoctor}>
              <MapPin className="mr-2 h-4 w-4" />
              Find Nearby Doctors
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

