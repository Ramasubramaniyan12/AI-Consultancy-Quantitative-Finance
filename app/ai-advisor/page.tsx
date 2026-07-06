'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Send, Bot, MessageSquare, Lightbulb, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const advisorSuggestions = [
  {
    id: 1,
    title: 'Rebalance Portfolio for Better Diversification',
    description: 'Your equity concentration is 65%. Consider reducing to 55% for optimal risk-adjusted returns.',
    priority: 'High',
    action: 'View Plan',
  },
  {
    id: 2,
    title: 'Tax-Loss Harvesting Opportunity',
    description: 'Identified 3 positions with unrealized losses. Harvest them to offset capital gains.',
    priority: 'Medium',
    action: 'Learn More',
  },
  {
    id: 3,
    title: 'Emerging Growth Stocks to Watch',
    description: 'Based on your profile, these mid-cap tech stocks show strong momentum and valuations.',
    priority: 'Low',
    action: 'Explore',
  },
  {
    id: 4,
    title: 'Sector Rotation Signal',
    description: 'IT sector showing signs of consolidation. Consider rotating to Pharma and FMCG.',
    priority: 'Medium',
    action: 'Analyze',
  },
]

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI Financial Advisor. I can help you with portfolio analysis, investment recommendations, risk assessment, and financial planning. What would you like to know?',
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', content: input }])
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            content: 'I\'ve analyzed your query. Based on your portfolio and risk profile, here are my recommendations...',
          },
        ])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Financial Consultant</h1>
        <p className="text-muted-foreground">
          Get personalized investment advice from our AI advisor powered by quantitative analysis.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chat Panel */}
          <Card className="flex flex-col h-96">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Chat with AI Advisor
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="border-t p-4 flex gap-2">
              <Input
                placeholder="Ask me about your portfolio..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Quick Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                'How can I improve my portfolio returns?',
                'What is my current risk exposure?',
                'Should I invest in this stock?',
                'How to plan for retirement?',
              ].map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setInput(q)}
                >
                  {q}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Recommendations */}
        <div className="space-y-6">
          {/* Advisor Status */}
          <Card className="bg-gradient-to-br from-blue-50/10 to-cyan-50/10 border-blue-200/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <CardDescription>4 active recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Your portfolio needs attention. Review the recommendations below.</p>
              <Button variant="outline" className="w-full" size="sm">
                View All
              </Button>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="space-y-3">
            {advisorSuggestions.slice(0, 3).map((suggestion) => (
              <Card key={suggestion.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge
                      variant={
                        suggestion.priority === 'High'
                          ? 'destructive'
                          : suggestion.priority === 'Medium'
                            ? 'default'
                            : 'secondary'
                      }
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium mb-1">{suggestion.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{suggestion.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {suggestion.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
