'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react'

export function PremiumFooter() {
  return (
    <footer className="relative w-full bg-background dark:bg-[#0D1117] border-t border-border transition-colors duration-300 mt-auto">
      {/* Main Footer Content */}
      <div className="w-full px-6 py-12 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CQ</span>
              </div>
              <span className="font-bold text-foreground text-lg">Chronos Quant</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered quantitative finance platform for investors, traders, and wealth managers.
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground/80 mb-1">Bangalore, Karnataka, India</p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Markets */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Markets</h3>
            <ul className="space-y-2">
              {['Indian Stocks', 'US Stocks', 'ETFs', 'Mutual Funds', 'Bonds', 'Commodities', 'Cryptocurrency', 'IPOs'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Tools */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Tools</h3>
            <ul className="space-y-2">
              {[
                'Portfolio Tracker',
                'Stock Screener',
                'Risk Management',
                'Quantitative Analytics',
                'Backtesting Engine',
                'Portfolio Optimizer',
                'AI Financial Consultant',
                'Financial Calculator',
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Learn & Research */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Learn & Research</h3>
            <ul className="space-y-2">
              {['Academy', 'Blog', 'News', 'Glossary', 'Market Insights', 'Documentation', 'Community'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Pricing', 'Contact', 'Privacy Policy', 'Terms & Conditions', 'Disclaimer'].map(
                (item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full border-t border-border bg-muted/30 transition-colors duration-300">
        <div className="w-full px-6 py-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Chronos Quant. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
              <Link href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                SEBI Disclaimer
              </Link>
              <span className="text-border">|</span>
              <Link href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Data Privacy
              </Link>
              <span className="text-border">|</span>
              <Link href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Security
              </Link>
              <span className="text-border">|</span>
              <Link href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Ratings & Downloads
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
