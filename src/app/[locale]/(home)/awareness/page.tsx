"use client"

import {
  Activity,
  BookOpen,
  Brain,
  ChevronRight,
  Clock,
  Heart,
  Pill,
  Search,
  Tag,
  ThumbsUp,
  Utensils,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample articles data
const articles = [
  {
    id: 1,
    title: "Understanding Diabetes: Symptoms, Causes, and Management",
    snippet:
      "Diabetes is a chronic condition that affects how your body turns food into energy. Learn about the symptoms, causes, and how to manage diabetes effectively.",
    url: "/awareness/articles/understanding-diabetes",
    category: "Diseases",
    date: "March 15, 2025",
    readTime: "8 min read",
    likes: 245,
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    tags: ["Diabetes", "Chronic Disease", "Blood Sugar"],
  },
  {
    id: 2,
    title: "10 Tips for Managing High Blood Pressure Naturally",
    snippet:
      "High blood pressure can lead to serious health problems. Discover natural ways to lower your blood pressure and improve your heart health.",
    url: "/awareness/articles/managing-high-blood-pressure",
    category: "Prevention",
    date: "March 10, 2025",
    readTime: "6 min read",
    likes: 189,
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    tags: ["Hypertension", "Heart Health", "Natural Remedies"],
  },
  {
    id: 3,
    title: "The Importance of Regular Health Check-ups",
    snippet:
      "Regular health check-ups can help detect potential health issues before they become serious. Learn why preventive care is essential for your well-being.",
    url: "/awareness/articles/importance-of-checkups",
    category: "Prevention",
    date: "March 5, 2025",
    readTime: "5 min read",
    likes: 132,
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    tags: ["Preventive Care", "Health Screening", "Wellness"],
  },
  {
    id: 4,
    title: "Understanding COVID-19 Vaccines and Boosters",
    snippet:
      "Stay informed about the latest developments in COVID-19 vaccines and booster shots. Learn about their effectiveness, side effects, and who should get them.",
    url: "/awareness/articles/covid-vaccines-boosters",
    category: "Treatments",
    date: "February 28, 2025",
    readTime: "10 min read",
    likes: 310,
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    tags: ["COVID-19", "Vaccines", "Immunity"],
  },
  {
    id: 5,
    title: "Nutrition Basics: Building a Balanced Diet",
    snippet:
      "A balanced diet is essential for good health. Learn about the different food groups, portion sizes, and how to create nutritious meals for you and your family.",
    url: "/awareness/articles/nutrition-basics",
    category: "Nutrition",
    date: "February 25, 2025",
    readTime: "7 min read",
    likes: 178,
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    tags: ["Nutrition", "Diet", "Healthy Eating"],
  },
  {
    id: 6,
    title: "Mental Health Awareness: Recognizing Signs of Depression",
    snippet:
      "Depression is a common but serious mood disorder. Learn how to recognize the signs and symptoms of depression and when to seek help.",
    url: "/awareness/articles/depression-signs",
    category: "Mental Health",
    date: "February 20, 2025",
    readTime: "9 min read",
    likes: 267,
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    tags: ["Mental Health", "Depression", "Wellness"],
  },
]

// Categories for filtering
const categories = [
  { name: "All", icon: BookOpen },
  { name: "Diseases", icon: Pill },
  { name: "Prevention", icon: Heart },
  { name: "Treatments", icon: Activity },
  { name: "Nutrition", icon: Utensils },
  { name: "Mental Health", icon: Brain },
]

export default function AwarenessPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter articles based on search query and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get featured articles
  const featuredArticles = articles.filter((article) => article.featured)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Health Awareness Center</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Stay informed with the latest health information, articles, and resources to help you make better health
          decisions.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for health topics, diseases, symptoms..."
              className="pl-10 pr-4 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-1 top-1 bottom-1" disabled={!searchQuery.trim()}>
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Link key={article.id} href={article.url}>
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-muted">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                        layout="responsive"

                        width={400}
                        height={200}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.snippet}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="mr-4">{article.readTime}</span>
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{article.likes}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="mb-8">
        <Tabs defaultValue="All" onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name} className="flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={article.url}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-muted">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}

                        className="w-full h-full object-cover"
                        layout="responsive"
                        width={400}
                        height={200}
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {article.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{article.snippet}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="mr-3">{article.readTime}</span>
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span>{article.likes}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any articles matching your search criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Browse by Tags */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Browse by Tags</h2>
          <Link href="/awareness/tags">
            <Button variant="ghost" className="gap-1">
              View all tags
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(articles.flatMap((article) => article.tags))).map((tag, index) => (
            <Link key={index} href={`/search/results?q=${encodeURIComponent(tag)}`}>
              <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-secondary/80">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Reading */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {articles.slice(0, 4).map((article) => (
            <Link key={article.id} href={article.url}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted">
                  <Image
                    layout="responsive"
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={200}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 shadow-lg mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Subscribe to our newsletter to receive the latest health articles, tips, and updates directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input type="email" placeholder="Your email address" className="flex-1" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

