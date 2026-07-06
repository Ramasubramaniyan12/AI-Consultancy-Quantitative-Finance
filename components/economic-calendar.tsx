"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface EconomicEvent {
  date: string
  time: string
  country: string
  event: string
  importance: "High" | "Medium" | "Low"
  forecast: string
  previous: string
  actual?: string
}

export function EconomicCalendar() {
  const events: EconomicEvent[] = [
    {
      date: "Today",
      time: "14:30",
      country: "India",
      event: "Manufacturing PMI",
      importance: "High",
      forecast: "52.1",
      previous: "51.8",
      actual: "52.3",
    },
    {
      date: "Today",
      time: "16:00",
      country: "US",
      event: "Consumer Confidence",
      importance: "High",
      forecast: "108.5",
      previous: "108.2",
    },
    {
      date: "Tomorrow",
      time: "10:00",
      country: "India",
      event: "Inflation (CPI)",
      importance: "High",
      forecast: "5.8%",
      previous: "5.9%",
    },
    {
      date: "Tomorrow",
      time: "13:30",
      country: "US",
      event: "Initial Jobless Claims",
      importance: "Medium",
      forecast: "215K",
      previous: "218K",
    },
    {
      date: "Friday",
      time: "11:30",
      country: "India",
      event: "RBI Rate Decision",
      importance: "High",
      forecast: "5.75%",
      previous: "5.75%",
    },
    {
      date: "Friday",
      time: "15:00",
      country: "EU",
      event: "Inflation (CPI)",
      importance: "High",
      forecast: "2.4%",
      previous: "2.3%",
    },
  ]

  const importanceColor = {
    High: "bg-[var(--icon-red-bg)] text-[var(--icon-red-text)]",
    Medium: "bg-[var(--icon-amber-bg)] text-[var(--icon-amber-text)]",
    Low: "bg-[var(--icon-blue-bg)] text-[var(--icon-blue-text)]",
  }

  return (
    <Card className="bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-[var(--text-primary)]">
          <Calendar className="h-5 w-5" />
          Economic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {events.map((event, idx) => (
            <div key={idx} className="border border-[var(--border-color)] rounded-lg p-3 bg-[var(--bg-card-inner)] hover:bg-[var(--bg-hover)] transition-colors">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">{event.date} • {event.time}</p>
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{event.event}</p>
                  <p className="text-xs text-[var(--text-muted)]">{event.country}</p>
                </div>
                <Badge className="text-xs bg-[var(--cal-high-badge)] text-[var(--cal-high-text)] border border-[var(--cal-high-text)]/50">
                  {event.importance}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-[var(--cal-forecast-bg)] p-2 rounded">
                  <p className="text-[var(--text-muted)]">Forecast</p>
                  <p className="font-semibold text-[var(--cal-forecast-text)]">{event.forecast}</p>
                </div>
                <div className="bg-[var(--cal-previous-bg)] p-2 rounded">
                  <p className="text-[var(--text-muted)]">Previous</p>
                  <p className="font-semibold text-[var(--cal-previous-text)]">{event.previous}</p>
                </div>
                {event.actual && (
                  <div className="bg-[var(--cal-actual-bg)] p-2 rounded">
                    <p className="text-[var(--text-muted)]">Actual</p>
                    <p className="font-semibold text-[var(--cal-actual-text)]">{event.actual}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
