"use client"

import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  LinkIcon,
  MessageSquare,
  Share,
  Tag,
  ThumbsDown,
  ThumbsUp,
  Twitter,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample article data
const articleData = {
  title: "Understanding Diabetes: Symptoms, Causes, and Management",
  content: `
    <p class="lead">Diabetes is a chronic health condition that affects how your body turns food into energy. If you have diabetes, your body either doesn't make enough insulin or can't use the insulin it makes as well as it should.</p>
    
    <p>When there isn't enough insulin or cells stop responding to insulin, too much blood sugar stays in your bloodstream. Over time, that can cause serious health problems, such as heart disease, vision loss, and kidney disease.</p>
    
    <h2>Types of Diabetes</h2>
    
    <p>There are three main types of diabetes: type 1, type 2, and gestational diabetes.</p>
    
    <h3>Type 1 Diabetes</h3>
    
    <p>Type 1 diabetes is thought to be caused by an autoimmune reaction (the body attacks itself by mistake) that stops your body from making insulin. Approximately 5-10% of the people who have diabetes have type 1. Symptoms of type 1 diabetes often develop quickly. It's usually diagnosed in children, teens, and young adults. If you have type 1 diabetes, you'll need to take insulin every day to survive. Currently, no one knows how to prevent type 1 diabetes.</p>
    
    <h3>Type 2 Diabetes</h3>
    
    <p>With type 2 diabetes, your body doesn't use insulin well and can't keep blood sugar at normal levels. About 90-95% of people with diabetes have type 2. It develops over many years and is usually diagnosed in adults (but more and more in children, teens, and young adults). You may not notice any symptoms, so it's important to get your blood sugar tested if you're at risk. Type 2 diabetes can be prevented or delayed with healthy lifestyle changes, such as losing weight, eating healthy food, and being active.</p>
    
    <h3>Gestational Diabetes</h3>
    
    <p>Gestational diabetes develops in pregnant women who have never had diabetes. If you have gestational diabetes, your baby could be at higher risk for health problems. Gestational diabetes usually goes away after your baby is born but increases your risk for type 2 diabetes later in life. Your baby is more likely to have obesity as a child or teen, and more likely to develop type 2 diabetes later in life too.</p>
    
    <h2>Symptoms of Diabetes</h2>
    
    <p>Symptoms of diabetes include:</p>
    
    <ul>
      <li>Urinating often</li>
      <li>Feeling very thirsty</li>
      <li>Feeling very hungry—even though you are eating</li>
      <li>Extreme fatigue</li>
      <li>Blurry vision</li>
      <li>Cuts/bruises that are slow to heal</li>
      <li>Weight loss—even though you are eating more (type 1)</li>
      <li>Tingling, pain, or numbness in the hands/feet (type 2)</li>
    </ul>
    
    <h2>Managing Diabetes</h2>
    
    <p>Managing diabetes means maintaining healthy blood sugar levels. This involves:</p>
    
    <h3>Healthy Eating</h3>
    
    <p>There's no specific diabetes diet, but it's important to center your diet around:</p>
    
    <ul>
      <li>Fruits and vegetables</li>
      <li>Lean proteins</li>
      <li>Whole grains</li>
      <li>Foods with less added sugar</li>
      <li>Foods with less sodium</li>
    </ul>
    
    <h3>Physical Activity</h3>
    
    <p>Regular physical activity is important for everyone, but it's especially important for people with diabetes. Physical activity lowers your blood sugar levels and makes your body more sensitive to insulin, which helps manage your diabetes. Aim for 30 minutes of moderate-intensity physical activity at least 5 days a week.</p>
    
    <h3>Medication and Insulin</h3>
    
    <p>Some people with diabetes need medication to help manage their blood sugar levels. The kind of medication depends on the type of diabetes, your blood sugar levels, and other health conditions you have.</p>
    
    <h3>Regular Check-ups</h3>
    
    <p>Regular check-ups with your healthcare provider are essential for managing diabetes. These visits allow your provider to monitor your condition and make adjustments to your treatment plan as needed.</p>
    
    <h2>Conclusion</h2>
    
    <p>Diabetes is a serious condition, but with proper management, people with diabetes can live long, healthy lives. If you think you might have diabetes, it's important to talk to your healthcare provider. Early diagnosis and treatment can prevent complications and improve quality of life.</p>
  `,
  author: {
    name: "Dr. Sarah Johnson",
    title: "Endocrinologist",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  publishDate: "March 15, 2025",
  readTime: "8 min read",
  category: "Diseases",
  tags: ["Diabetes", "Chronic Disease", "Blood Sugar", "Health Management"],
  likes: 245,
  views: 1892,
  image: "/placeholder.svg?height=400&width=800",
  relatedArticles: [
    {
      id: 1,
      title: "10 Tips for Managing High Blood Pressure Naturally",
      snippet:
        "High blood pressure can lead to serious health problems. Discover natural ways to lower your blood pressure and improve your heart health.",
      url: "/awareness/articles/managing-high-blood-pressure",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "The Importance of Regular Health Check-ups",
      snippet:
        "Regular health check-ups can help detect potential health issues before they become serious. Learn why preventive care is essential for your well-being.",
      url: "/awareness/articles/importance-of-checkups",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "Nutrition Basics: Building a Balanced Diet",
      snippet:
        "A balanced diet is essential for good health. Learn about the different food groups, portion sizes, and how to create nutritious meals for you and your family.",
      url: "/awareness/articles/nutrition-basics",
      image: "/placeholder.svg?height=100&width=200",
    },
  ],
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug
  console.log(slug)

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(null)
  const [showShareOptions, setShowShareOptions] = useState(false)

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleFeedback = (type: "helpful" | "not-helpful") => {
    setFeedback(type)
  }

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions)
  }

  const handleShare = (platform: string) => {
    // In a real app, this would share the article to the specified platform
    console.log(`Sharing to ${platform}`)
    setShowShareOptions(false)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/awareness">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {articleData.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{articleData.publishDate}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{articleData.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{articleData.title}</h1>

          <div className="flex items-center gap-4 mb-8">
            <Avatar>
              <AvatarImage src={articleData.author.avatar} alt={articleData.author.name} />
              <AvatarFallback>{articleData.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{articleData.author.name}</div>
              <div className="text-sm text-muted-foreground">{articleData.author.title}</div>
            </div>
          </div>

          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <Image
              src={articleData.image || "/placeholder.svg"}
              alt={articleData.title}
              className="w-full h-full object-cover"
                layout="responsive"
                height={400}
                width={800}
            />
          </div>

          <div
            className="prose prose-lg max-w-none dark:prose-invert mb-8"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />

          <div className="flex flex-wrap gap-2 mb-8">
            {articleData.tags.map((tag, index) => (
              <Link key={index} href={`/search/results?q=${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="flex items-center gap-1 hover:bg-muted">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant={feedback === "helpful" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFeedback("helpful")}
                  className="gap-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Helpful
                </Button>
                <Button
                  variant={feedback === "not-helpful" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFeedback("not-helpful")}
                  className="gap-1"
                >
                  <ThumbsDown className="h-4 w-4" />
                  Not Helpful
                </Button>
              </div>

              <div className="relative">
                <Button variant="outline" size="sm" onClick={toggleShareOptions} className="gap-1">
                  <Share className="h-4 w-4" />
                  Share
                </Button>

                {showShareOptions && (
                  <div className="absolute top-full left-0 mt-2 bg-background border rounded-md shadow-lg p-2 z-10">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleShare("facebook")} className="h-8 w-8">
                        <Facebook className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleShare("twitter")} className="h-8 w-8">
                        <Twitter className="h-4 w-4 text-blue-400" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleShare("linkedin")} className="h-8 w-8">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleShare("copy")} className="h-8 w-8">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={toggleBookmark} className="gap-1">
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                  Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Bookmark
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{articleData.likes} people found this helpful</span>
              </div>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>0 comments</span>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articleData.relatedArticles.map((article) => (
              <Link key={article.id} href={article.url}>
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-muted">
                    <Image
                      layout="responsive"
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                        height={100}
                        width={200}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{article.snippet}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

