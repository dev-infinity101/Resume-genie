import './globals.css'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resume Genie - AI-Powered Resume Enhancement',
  description: 'Transform your resume with AI. Upload, polish, tailor, and download. No signup required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-gray-50 text-gray-900 antialiased")}>
        {children}
      </body>
    </html>
  )
}