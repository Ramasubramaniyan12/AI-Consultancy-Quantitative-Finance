'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Play, FileText, MessageSquare, Users } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'Introduction to Stock Market',
    category: 'Beginner',
    lessons: 12,
    duration: '4 hours',
    progress: 45,
  },
  {
    id: 2,
    title: 'Fundamental Analysis Deep Dive',
    category: 'Intermediate',
    lessons: 15,
    duration: '6 hours',
    progress: 20,
  },
  {
    id: 3,
    title: 'Quantitative Trading Strategies',
    category: 'Advanced',
    lessons: 18,
    duration: '8 hours',
    progress: 0,
  },
  {
    id: 4,
    title: 'Portfolio Construction & Management',
    category: 'Intermediate',
    lessons: 10,
    duration: '5 hours',
    progress: 60,
  },
]

const blogPosts = [
  {
    id: 1,
    title: 'Understanding P/E Ratio: A Comprehensive Guide',
    date: 'Mar 15, 2026',
    readTime: '5 min',
    category: 'Fundamental Analysis',
  },
  {
    id: 2,
    title: 'How to Build a Diversified Investment Portfolio',
    date: 'Mar 10, 2026',
    readTime: '7 min',
    category: 'Portfolio Management',
  },
  {
    id: 3,
    title: 'Cryptocurrency Basics for Beginners',
    date: 'Mar 8, 2026',
    readTime: '6 min',
    category: 'Crypto',
  },
  {
    id: 4,
    title: 'Tax-Efficient Investing Strategies',
    date: 'Mar 5, 2026',
    readTime: '8 min',
    category: 'Tax Planning',
  },
]

const glossaryItems = [
  { term: 'P/E Ratio', definition: 'Price-to-Earnings ratio measures company valuation relative to earnings.' },
  { term: 'Beta', definition: 'Measures stock volatility relative to the overall market.' },
  { term: 'Dividend Yield', definition: 'Annual dividend payment divided by stock price.' },
  { term: 'Market Cap', definition: 'Total market value of a company shares.' },
]

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Education & Knowledge Hub</h1>
        <p className="text-muted-foreground">
          Learn about investing, finance, and build your financial literacy.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Academy</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Academy */}
        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {course.category}
                      </Badge>
                      <CardTitle className="text-base">{course.title}</CardTitle>
                    </div>
                    <Play className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{course.lessons} Lessons</span>
                    <span>{course.duration}</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <Button className="w-full" variant={course.progress > 0 ? 'outline' : 'default'}>
                    {course.progress > 0 ? 'Continue' : 'Start Course'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Blog */}
        <TabsContent value="blog" className="space-y-4">
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2">
                        {post.category}
                      </Badge>
                      <CardTitle className="text-base">{post.title}</CardTitle>
                      <CardDescription className="text-xs mt-2">
                        {post.date} • {post.readTime}
                      </CardDescription>
                    </div>
                    <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Glossary */}
        <TabsContent value="glossary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {glossaryItems.map((item, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base">{item.term}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.definition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Community */}
        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="h-5 w-5" />
                  Discussion Forum
                </CardTitle>
                <CardDescription>Join discussions with other investors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Discuss market trends, share strategies, and learn from experienced investors.
                </p>
                <Button className="w-full">Join Forum</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5" />
                  Expert Sessions
                </CardTitle>
                <CardDescription>Live Q&A with financial experts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Attend live sessions with industry experts and get your questions answered.
                </p>
                <Button className="w-full">View Schedule</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
