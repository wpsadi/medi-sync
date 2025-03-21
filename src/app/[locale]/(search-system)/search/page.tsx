"use client"

import {
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  FileText,
  Heart,
  Info,
  Newspaper,
  Pill,
  SearchIcon,
  Stethoscope,
  Tag,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useEffect,useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample search suggestions
const searchSuggestions = [
  "Diabetes",
  "Blood pressure",
  "Vaccination",
  "Heart disease",
  "COVID-19",
  "Mental health",
  "Nutrition",
  "Exercise",
  "Sleep disorders",
]

// Sample trending searches
const trendingSearches = [
  "COVID-19 symptoms",
  "Diabetes management",
  "Heart health tips",
  "Stress reduction",
  "Healthy diet plans",
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filtered = searchSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredSuggestions(filtered)
    setShowSuggestions(true)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search/results?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    window.location.href = `/search/results?q=${encodeURIComponent(suggestion)}`
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Medi-Sync Search</h1>
          <p className="text-muted-foreground">Find health information, articles, and resources</p>
        </div>

        <div className="relative mb-8">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for health topics, diseases, symptoms..."
                className="pl-10 pr-4 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay hiding suggestions to allow for clicks
                  setTimeout(() => setShowSuggestions(false), 200)
                }}
              />
              <Button type="submit" className="absolute right-1 top-1 bottom-1" disabled={!searchQuery.trim()}>
                Search
              </Button>
            </div>
          </form>

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
              <ul className="py-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <SearchIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute right-16 top-2">
                  <Info className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Search for health topics, diseases, symptoms, or treatments. You can also search for specific articles
                  or blogs.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Tabs defaultValue="categories" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent Searches</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/search/results?category=diseases">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Pill className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="font-medium">Diseases</h3>
                    <p className="text-xs text-muted-foreground">Information about conditions</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/search/results?category=prevention">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Heart className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="font-medium">Prevention</h3>
                    <p className="text-xs text-muted-foreground">Tips to stay healthy</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/search/results?category=treatments">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Stethoscope className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="font-medium">Treatments</h3>
                    <p className="text-xs text-muted-foreground">Medical procedures & therapies</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/search/results?category=nutrition">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <FileText className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="font-medium">Nutrition</h3>
                    <p className="text-xs text-muted-foreground">Diet and food information</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/search/results?category=mental-health">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Newspaper className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="font-medium">Mental Health</h3>
                    <p className="text-xs text-muted-foreground">Psychological wellbeing</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/search/results?category=fitness">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Calendar className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="font-medium">Fitness</h3>
                    <p className="text-xs text-muted-foreground">Exercise and activity</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="pt-4">
            <div className="space-y-4">
              {trendingSearches.map((search, index) => (
                <Link key={index} href={`/search/results?q=${encodeURIComponent(search)}`}>
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-3">
                        {index + 1}
                      </Badge>
                      <span>{search}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{Math.floor(Math.random() * 1000) + 100}</span>
                      <Eye className="h-4 w-4 ml-3 mr-1" />
                      <span>{Math.floor(Math.random() * 10000) + 1000}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="pt-4">
            <div className="space-y-2">
              {/* This would normally be populated from user's search history */}
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Diabetes management</span>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Hypertension symptoms</span>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>COVID-19 vaccination</span>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center mt-4">
                <Button variant="link" size="sm">
                  Clear search history
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Search Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <Tag className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Use specific keywords</h3>
                <p className="text-sm text-muted-foreground">
                  Instead of "heart", try "heart disease symptoms" for better results.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <SearchIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Filter by categories</h3>
                <p className="text-sm text-muted-foreground">
                  Use the category tabs to narrow down your search results.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Search within results</h3>
                <p className="text-sm text-muted-foreground">
                  After searching, you can further filter results by date or relevance.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Verify information</h3>
                <p className="text-sm text-muted-foreground">
                  Always consult healthcare professionals for medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

