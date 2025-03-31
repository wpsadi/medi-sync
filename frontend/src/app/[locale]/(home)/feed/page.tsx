"use client"

import { Bell, Bookmark, ExternalLink, Filter, MessageSquare, Plus,Share, ThumbsUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample feed data
const feedItems = [
  {
    id: 1,
    type: "article",
    title: "Understanding Diabetes: Symptoms, Causes, and Management",
    snippet:
      "Diabetes is a chronic condition that affects how your body turns food into energy. Learn about the symptoms, causes, and how to manage diabetes effectively.",
    url: "/awareness/articles/understanding-diabetes",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "March 15, 2025",
    readTime: "8 min read",
    likes: 245,
    comments: 32,
    image: "/placeholder.svg?height=200&width=400",
    isExternal: false,
  },
  {
    id: 2,
    type: "blog",
    title: "My Journey with Type 2 Diabetes: How I Reversed It Through Lifestyle Changes",
    snippet:
      "After being diagnosed with Type 2 diabetes, I made significant changes to my diet and exercise routine. Here's how I managed to reverse my condition.",
    url: "https://healthblog.example.com/diabetes-journey",
    author: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "March 12, 2025",
    readTime: "12 min read",
    likes: 378,
    comments: 56,
    image: "/placeholder.svg?height=200&width=400",
    isExternal: true,
  },
  {
    id: 3,
    type: "article",
    title: "10 Tips for Managing High Blood Pressure Naturally",
    snippet:
      "High blood pressure can lead to serious health problems. Discover natural ways to lower your blood pressure and improve your heart health.",
    url: "/awareness/articles/managing-high-blood-pressure",
    author: {
      name: "Dr. Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "March 10, 2025",
    readTime: "6 min read",
    likes: 189,
    comments: 24,
    image: "/placeholder.svg?height=200&width=400",
    isExternal: false,
  },
  {
    id: 4,
    type: "video",
    title: "Yoga for Beginners: Simple Poses for Stress Relief",
    snippet:
      "This beginner-friendly yoga routine can help reduce stress and improve flexibility. Follow along with our certified yoga instructor.",
    url: "https://youtube.com/example/yoga-beginners",
    author: {
      name: "Yoga with Emma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "March 8, 2025",
    readTime: "15 min video",
    likes: 512,
    comments: 87,
    image: "/placeholder.svg?height=200&width=400",
    isExternal: true,
  },
  {
    id: 5,
    type: "article",
    title: "The Importance of Regular Health Check-ups",
    snippet:
      "Regular health check-ups can help detect potential health issues before they become serious. Learn why preventive care is essential for your well-being.",
    url: "/awareness/articles/importance-of-checkups",
    author: {
      name: "Dr. Lisa Wong",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "March 5, 2025",
    readTime: "5 min read",
    likes: 132,
    comments: 18,
    image: "/placeholder.svg?height=200&width=400",
    isExternal: false,
  },
]

// Sample creators to follow
const creatorsToFollow = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Endocrinologist",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: 12500,
  },
  {
    id: 2,
    name: "Nutrition with Mark",
    title: "Nutritionist",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: 8700,
  },
  {
    id: 3,
    name: "Mental Health Matters",
    title: "Psychology Blog",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: 15300,
  },
]

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("for-you")
  console.log(activeTab)
  const [showExternalAlert, setShowExternalAlert] = useState(false)
  const [externalUrl, setExternalUrl] = useState("")
//   const router = useRouter()

  const handleExternalLink = (url: string) => {
    setExternalUrl(url)
    setShowExternalAlert(true)
  }

  const handleConfirmNavigation = () => {
    window.open(externalUrl, "_blank")
    setShowExternalAlert(false)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Feed</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="md:col-span-2">
            <Tabs defaultValue="for-you" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="for-you">For You</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>

              <TabsContent value="for-you" className="space-y-6">
                {feedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={item.author.avatar} alt={item.author.name} />
                          <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{item.author.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.date} • {item.readTime}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground mb-4">{item.snippet}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </Badge>
                            {item.isExternal && (
                              <Badge variant="outline">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                External
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-1">
                          <div className="aspect-video bg-muted rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                                width={400}
                                height={200}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardFooter className="bg-muted/30 p-4 flex justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{item.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{item.comments}</span>
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Share className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only">Share</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Bookmark className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only">Save</span>
                        </Button>
                        {item.isExternal ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleExternalLink(item.url)}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Read</span>
                          </Button>
                        ) : (
                          <Link href={item.url}>
                            <Button variant="outline" size="sm">
                              Read
                            </Button>
                          </Link>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Follow creators to see their content</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    When you follow health experts and content creators, their articles and posts will appear here.
                  </p>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Discover creators to follow
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved items yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Save articles, blogs, and videos to read later by clicking the bookmark icon.
                  </p>
                  <Button onClick={() => setActiveTab("for-you")}>Browse content</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Creators to Follow</h3>
                  <div className="space-y-4">
                    {creatorsToFollow.map((creator) => (
                      <div key={creator.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={creator.avatar} alt={creator.name} />
                            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{creator.name}</div>
                            <div className="text-xs text-muted-foreground">{creator.title}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="link" size="sm">
                      View all
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Popular Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="cursor-pointer">
                      Diabetes
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Heart Health
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Nutrition
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Mental Health
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Fitness
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      COVID-19
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Wellness
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Preventive Care
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Connect Your Accounts</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Link your external health blogs or platforms to share your content.
                  </p>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect Platform
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* External Link Alert Dialog */}
      <AlertDialog open={showExternalAlert} onOpenChange={setShowExternalAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You are leaving Medi-Sync</AlertDialogTitle>
            <AlertDialogDescription>
              You are being redirected to an external website. We are not responsible for the content of external sites.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmNavigation}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

