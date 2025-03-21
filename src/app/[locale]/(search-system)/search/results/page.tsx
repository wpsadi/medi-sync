"use client"

import { ArrowLeft, Calendar, ChevronLeft, ChevronRight,Clock, FileText, SearchIcon, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type React from "react"
import { useEffect,useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample search results
const sampleResults = [
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
    hasImage: true,
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
    hasImage: true,
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
    hasImage: false,
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
    hasImage: true,
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
    hasImage: true,
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
    hasImage: false,
    tags: ["Mental Health", "Depression", "Wellness"],
  },
  {
    id: 7,
    title: "The Benefits of Regular Exercise for Heart Health",
    snippet:
      "Regular physical activity can improve your heart health and reduce the risk of cardiovascular disease. Discover the best exercises for a healthy heart.",
    url: "/awareness/articles/exercise-heart-health",
    category: "Fitness",
    date: "February 15, 2025",
    readTime: "6 min read",
    likes: 203,
    hasImage: true,
    tags: ["Exercise", "Heart Health", "Fitness"],
  },
  {
    id: 8,
    title: "Understanding Allergies: Causes, Symptoms, and Treatments",
    snippet:
      "Allergies affect millions of people worldwide. Learn about common allergens, symptoms of allergic reactions, and effective treatment options.",
    url: "/awareness/articles/understanding-allergies",
    category: "Diseases",
    date: "February 10, 2025",
    readTime: "8 min read",
    likes: 156,
    hasImage: false,
    tags: ["Allergies", "Immune System", "Treatments"],
  },
]

// Categories for filtering
const categories = ["All", "Diseases", "Prevention", "Treatments", "Nutrition", "Mental Health", "Fitness"]

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const categoryParam = searchParams.get("category") || "All"

  const [searchQuery, setSearchQuery] = useState(query)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
//   const [results, setResults] = useState(sampleResults)
  const [filteredResults, setFilteredResults] = useState(sampleResults)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const resultsPerPage = 5

  // Filter results based on search query, category, and tags
  useEffect(() => {
    let filtered = [...sampleResults]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((result) => result.category === selectedCategory)
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((result) => selectedTags.some((tag) => result.tags.includes(tag)))
    }

    setFilteredResults(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedTags])

  // Get all unique tags from results
  const allTags = Array.from(new Set(sampleResults.flatMap((result) => result.tags))).sort()

  // Calculate pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const paginatedResults = filteredResults.slice(startIndex, startIndex + resultsPerPage)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/search">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <Button
                      variant={selectedCategory === category ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                      {selectedCategory === category && (
                        <Badge className="ml-auto">
                          {category === "All"
                            ? filteredResults.length
                            : filteredResults.filter((r) => r.category === category).length}
                        </Badge>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="space-y-2">
                {allTags.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${index}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <label
                      htmlFor={`tag-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Date</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last 7 days
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last 30 days
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last 3 months
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last year
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Refine your search..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-1 top-1 bottom-1" disabled={!searchQuery.trim()}>
                  Search
                </Button>
              </div>
            </form>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredResults.length} results {query ? `for "${query}"` : ""}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border rounded-md px-2 py-1 bg-background">
                <option>Relevance</option>
                <option>Date (Newest)</option>
                <option>Date (Oldest)</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Results */}
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any matches for your search. Try adjusting your search terms or filters.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSelectedTags([])
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedResults.map((result) => (
                <TooltipProvider key={result.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={result.url}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {result.hasImage && (
                              <div className="md:col-span-1">
                                <div className="h-full w-full bg-muted">
                                  <Image
                                    src={`/placeholder.svg?height=200&width=200`}
                                    alt={result.title}
                                    className="h-full w-full object-cover"
                                    layout="responsive"
                                    height={200}
                                    width={200}
                                  />
                                </div>
                              </div>
                            )}
                            <div className={`p-4 ${result.hasImage ? "md:col-span-3" : "md:col-span-4"}`}>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                  {result.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{result.date}</span>
                              </div>
                              <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                              <p className="text-muted-foreground mb-3">{result.snippet}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {result.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="mr-4">{result.readTime}</span>
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>{result.likes}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>{result.snippet}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

