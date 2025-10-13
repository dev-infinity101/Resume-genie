import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume Genie - AI-Powered Resume Builder',
  description: 'Transform your resume in minutes with AI. Create professional, ATS-optimized resumes that get you hired.',
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body 
        className={cn('antialiased')}
        style={{
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}
      >
        <div className="min-h-screen bg-[#0A0A0A] text-white">
          {/* Navigation Header */}
          <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#0A0A0A]/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 max-w-7xl">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="flex items-center gap-2 group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 group-hover:bg-[#10B981]/20 transition-colors">
                    <Sparkles className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Resume Genie
                  </span>
                </a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <a 
                  href="/how-it-works" 
                  className="text-sm font-medium text-[#A3A3A3] hover:text-white transition-colors"
                >
                  How It Works
                </a>
                <a 
                  href="/features" 
                  className="text-sm font-medium text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Features
                </a>
                <a 
                  href="/pricing" 
                  className="text-sm font-medium text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </nav>

              {/* CTA Button */}
              <div className="flex items-center">
                <a
                  href="#upload"
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-[#262626] bg-[#0A0A0A] mt-24">
            <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30">
                      <Sparkles className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <span className="text-xl font-bold text-white">
                      Resume Genie
                    </span>
                  </div>
                  <p className="text-sm text-[#737373] max-w-sm leading-relaxed">
                    AI-powered resume builder that helps you create professional, ATS-optimized resumes in minutes.
                  </p>
                </div>

                {/* Product Links */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#features" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="/pricing" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#help" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="#privacy" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-[#262626]">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-[#737373]">
                    © 2025 Resume Genie. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6">
                    <a href="#terms" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                      Terms
                    </a>
                    <a href="#privacy" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                      Privacy
                    </a>
                    <a href="#cookies" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors">
                      Cookies
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}