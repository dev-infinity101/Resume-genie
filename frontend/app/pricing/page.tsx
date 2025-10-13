'use client'

import { Check, Sparkles, Shield, Zap, Users, Heart } from 'lucide-react'

export default function PricingPage() {
  const features = [
    "Unlimited resume uploads",
    "AI-powered content enhancement",
    "Job description matching",
    "Keyword analysis & suggestions",
    "Professional PDF generation",
    "100% private & secure",
    "No account required",
    "Instant processing",
    "High-quality templates",
    "ATS-optimized output"
  ]

  const faqs = [
    {
      question: "Is Resume Genie really free?",
      answer: "Yes! Resume Genie is completely free with no hidden costs, no premium tiers, and no credit card required. We believe everyone deserves access to professional resume tools."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account needed! Resume Genie works entirely in your browser session. Upload your resume, enhance it with AI, and download the result—all without signing up."
    },
    {
      question: "How is my data kept private?",
      answer: "All processing happens in your browser session using sessionStorage. Once you close your tab or browser, all your data is automatically discarded. We never store your personal information on our servers."
    },
    {
      question: "How many resumes can I create?",
      answer: "There are no limits! Create and enhance as many resumes as you need, whenever you need them. Perfect for tailoring your resume to different job applications."
    },
    {
      question: "Will there be paid features in the future?",
      answer: "Our core features will always remain free. We're committed to providing accessible resume tools to everyone, regardless of their financial situation."
    }
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 mb-6">
              <Heart className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981] uppercase tracking-wide">100% Free Forever</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed">
              Everything you need to create a professional resume. No credit card. No hidden fees. Just free.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-[#121212] border-2 border-[#10B981] rounded-3xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border-b border-[#10B981] p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#10B981]/20 border-2 border-[#10B981] mb-6">
                <Sparkles className="w-10 h-10 text-[#10B981]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Free Plan
              </h2>
              <div className="mb-4">
                <span className="text-6xl md:text-7xl font-bold text-white">$0</span>
                <span className="text-2xl text-[#A3A3A3]">/forever</span>
              </div>
              <p className="text-lg text-[#A3A3A3] max-w-md mx-auto">
                All features included. No limits. No expiration.
              </p>
            </div>

            {/* Card Body */}
            <div className="p-12">
              <h3 className="text-xl font-semibold text-white mb-6">Everything included:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-[#10B981]" />
                    </div>
                    <span className="text-[#A3A3A3]">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="/"
                className="block w-full text-center px-8 py-4 text-lg font-medium text-white bg-[#10B981] hover:bg-[#059669] rounded-xl transition-colors"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Is Resume Genie Free?
            </h2>
            <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto">
              We believe everyone deserves access to professional career tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 mb-6">
                <Users className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Accessible to All</h3>
              <p className="text-[#A3A3A3]">
                Job searching is stressful enough. We remove financial barriers so everyone can present their best self.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 mb-6">
                <Shield className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
              <p className="text-[#A3A3A3]">
                No accounts mean no data collection. Your privacy is worth more than any subscription fee.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 mb-6">
                <Zap className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Simple & Fast</h3>
              <p className="text-[#A3A3A3]">
                No paywalls or upsells means a cleaner, faster experience focused on what matters—your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#A3A3A3]">
              Everything you need to know about our free service
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#121212] border border-[#262626] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-[#A3A3A3] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border-2 border-[#10B981] rounded-3xl p-12 text-center">
            <Sparkles className="w-16 h-16 text-[#10B981] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Your Perfect Resume?
            </h2>
            <p className="text-lg text-[#A3A3A3] mb-8 max-w-2xl mx-auto">
              No signup required. No credit card needed. Just upload and enhance your resume in minutes.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors"
            >
              Start Building Now
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}