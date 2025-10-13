'use client'

import { Upload, Sparkles, Target, Download, Shield, Zap } from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Upload Your Resume",
      description: "Simply drag and drop your resume PDF, or click to browse. Our system instantly extracts and previews your content.",
      details: [
        "Supports PDF format",
        "Instant text extraction using PyMuPDF",
        "Preview before processing"
      ]
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Enhancement",
      description: "Click 'Polish My Resume' and watch AI transform your content with professional language and optimized structure.",
      details: [
        "Powered by Google Gemini AI",
        "Professional rewriting",
        "Structured JSON output"
      ]
    },
    {
      number: "03",
      icon: Target,
      title: "Job Tailoring (Optional)",
      description: "Paste a job description to get a match score, identify missing keywords, and receive smart suggestions.",
      details: [
        "Match score analysis",
        "Keyword identification",
        "Actionable improvements"
      ]
    },
    {
      number: "04",
      icon: Download,
      title: "Download & Apply",
      description: "Generate your professional PDF resume with a single click. Ready to send to employers immediately.",
      details: [
        "High-quality PDF generation",
        "Professional Jinja2 templates",
        "Instant download"
      ]
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "100% Private",
      description: "All data is handled in your browser session. Nothing is stored permanently. Your information is automatically discarded when you close the tab."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Complete the entire process in minutes. No sign-ups, no waiting. Upload, enhance, and download your resume instantly."
    }
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981] uppercase tracking-wide">Simple Process</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              How Resume Genie Works
            </h1>
            <p className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed">
              Transform your resume in just 4 simple steps. No account required, completely free, and your data stays private.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-16 top-32 w-0.5 h-24 bg-[#262626]"></div>
                )}
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-[#10B981]/10 border-2 border-[#10B981] flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-[#10B981]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#10B981] mb-2">STEP {step.number}</div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
                        <p className="text-lg text-[#A3A3A3] leading-relaxed mb-6">
                          {step.description}
                        </p>
                        <ul className="space-y-3">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                              <span className="text-[#A3A3A3]">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="bg-[#121212] border border-[#262626] rounded-2xl p-12 flex items-center justify-center h-80">
                      <step.icon className="w-32 h-32 text-[#10B981] opacity-20" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Resume Genie?
            </h2>
            <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto">
              Built with your privacy and convenience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-8">
                <div className="w-16 h-16 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-[#10B981]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-lg text-[#A3A3A3] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border-2 border-[#10B981] rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Resume?
            </h2>
            <p className="text-lg text-[#A3A3A3] mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have improved their resumes with AI. Get started in seconds.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}