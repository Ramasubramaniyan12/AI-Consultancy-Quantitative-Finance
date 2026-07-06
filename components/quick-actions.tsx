"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ShoppingCart, 
  Banknote, 
  RefreshCcw, 
  Calculator,
  Scale,
  Filter,
  Zap
} from "lucide-react"
import Link from "next/link"

const actions = [
  { icon: ShoppingCart, label: "Buy", href: "/buy", bgColor: "#F0FDF4", textColor: "#16A34A", hoverBg: "#DCFCE7" },
  { icon: Banknote, label: "Sell", href: "/sell", bgColor: "#FFF1F2", textColor: "#DC2626", hoverBg: "#FFE4E6" },
  { icon: RefreshCcw, label: "Start SIP", href: "/sip", bgColor: "#F8F9FA", textColor: "#374151", hoverBg: "#F1F3F5" },
  { icon: Scale, label: "Compare", href: "/compare", bgColor: "#EFF6FF", textColor: "#2563EB", hoverBg: "#DBEAFE" },
  { icon: Filter, label: "Screener", href: "/screener", bgColor: "#FFFBEB", textColor: "#D97706", hoverBg: "#FEF3C7" },
  { icon: Calculator, label: "Calculator", href: "/calculator", bgColor: "#F5F3FF", textColor: "#7C3AED", hoverBg: "#EDE9FE" },
]

export function QuickActions() {
  return (
    <Card className="bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-[var(--text-primary)]">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 box-border">
          {actions.map((action) => (
            <Link key={action.label} href={action.href} className="min-w-0">
              <button
                className="w-full h-auto flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border border-black/6 transition-all duration-200 hover:scale-102"
                style={{
                  backgroundColor: action.bgColor,
                  color: action.textColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = action.hoverBg
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = action.bgColor
                }}
              >
                <action.icon className="h-6 w-6 flex-shrink-0" />
                <span className="text-sm font-medium text-center">{action.label}</span>
              </button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
