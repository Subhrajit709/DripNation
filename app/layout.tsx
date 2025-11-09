import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/app/auth/context"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Search, ShoppingCart, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Drip-Nation | The Future of Smart Shopping",
  description: "Experience futuristic streetwear shopping with AR try-on, AI personalization, and 3D previews.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
              {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-primary">
            DRIP-NATION
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/ar-try-on" className="text-sm font-medium hover:text-primary transition-colors">
              AR Try-On
            </Link>
            <Link href="/recommendations" className="text-sm font-medium hover:text-primary transition-colors">
              AI Recommendations
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 hover:bg-muted rounded-lg transition-all">
              <Search size={20} />
            </button>
            <Link href="/dashboard" className="p-2 hover:bg-muted rounded-lg transition-all">
              <User size={20} />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-muted rounded-lg transition-all relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </nav>

        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
