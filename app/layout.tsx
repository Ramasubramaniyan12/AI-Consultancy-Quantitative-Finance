import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { PremiumHeader } from '@/components/premium-header'
import { PremiumFooter } from '@/components/premium-footer'
import { SidebarProvider, UnifiedSidebar, SidebarContent } from '@/components/unified-sidebar'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: 'Chronos Quant - AI-Powered Quantitative Finance Platform',
  description: 'AI-powered quantitative finance platform for investors, traders, and wealth managers. Analyze, compare, and track investments across stocks, mutual funds, ETFs, bonds, commodities, crypto, and more.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          storageKey="theme-preference"
        >
          <SidebarProvider>
            <div className="h-screen flex flex-col bg-background text-foreground transition-colors duration-300 box-border">
              <PremiumHeader />
              <div className="flex flex-1 overflow-hidden pt-16 box-border">
                <UnifiedSidebar />
                <SidebarContent>
                  {children}
                  <PremiumFooter />
                </SidebarContent>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
