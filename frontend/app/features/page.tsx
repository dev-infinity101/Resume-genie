'use client'

import { 
  Sparkles, 
  Shield, 
  Zap, 
  FileText, 
  Target, 
  Download, 
  Eye, 
  BarChart3, 
  RefreshCw, 
  Lock,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Sparkles,
      title: "AI-Powered Enhancement",
      description: "Transform your resume with Google Gemini AI. Our advanced language model rewrites and optimizes your content with professional language, action verbs, and industry-standard formatting.",
      highlights: [
        "Professional tone & language",
        "Action verb optimization",
        "Structured JSON output",
        "Context-aware improvements"
      ]
    },
    {
      icon: Target,
      title: "Job Matching & Analysis",
      description: "Get a detailed match score by comparing your resume against any job description. Identify missing keywords and receive actionable suggestions to improve your chances.",
      highlights: [
        "Real-time match scoring",
        "Keyword gap analysis",
        "Smart improvement suggestions",
        "ATS optimization tips"
      ]
    },
    {
      icon: FileText,
      title: "Professional PDF Generation",
      description: "Download high-quality, professionally formatted PDF resumes. Our Jinja2 templates ensure your resume looks perfect on any device or ATS system.",
      highlights: [
        "Clean, modern templates",
        "ATS-friendly formatting",
        "High-resolution output",
        "Instant download"
      ]
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description: "Your data never leaves your browser session. All processing happens client-side using sessionStorage, and everything is automatically deleted when you close your tab.",
      highlights: [
        "No data storage",
        "Session-based processing",
        "Auto-delete on close",
        "Zero tracking"
      ]
    }
  ]

  const additionalFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Complete the entire process in minutes with instant AI processing and PDF generation."
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "See your extracted resume content immediately before AI enhancement begins."
    },
    {
      icon: BarChart3,
      title: "Match Score",
      description: "Get a percentage-based score showing how well your resume matches the job description."
    },
    {
      icon: RefreshCw,
      title: "Unlimited Revisions",
      description: "Create and enhance as many versions as you need for different job applications."
    },
    {
      icon: Lock,
      title: "No Account Required",
      description: "Start immediately without sign-ups, passwords, or personal information."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "What used to take hours now takes minutes with AI-powered automation."
    }
  ]

  const technicalFeatures = [
    {
      name: "PDF Text Extraction",
      tech: "PyMuPDF",
      description: "Advanced PDF parsing that preserves formatting and structure"
    },
    {
      name: "AI Processing",
      tech: "Google Gemini",
      description: "State-of-the-art language model for professional content generation"
    },
    {
      name: "Template Engine",
      tech: "Jinja2",
      description: "Flexible templating system for beautiful, consistent layouts"
    },
    {
      name: "PDF Generation",
      tech: "WeasyPrint",
      description: "High-quality PDF rendering with pixel-perfect accuracy"
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
              <span className="text-sm font-semibold text-[#10B981] uppercase tracking-wide">Powerful Features</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Everything You Need to Create a Winning Resume
            </h1>
            <p className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed">
              AI-powered tools, professional templates, and complete privacy—all in one free platform.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="bg-[#121212] border border-[#262626] rounded-2xl p-8 hover:border-[#10B981]/50 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-[#10B981]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-[#A3A3A3] leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                          <span className="text-[#A3A3A3]">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              More Features to Love
            </h2>
            <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto">
              Packed with everything you need for a professional resume experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-[#0A0A0A] border border-[#262626] rounded-xl p-6 hover:border-[#10B981]/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto">
              Powered by industry-leading tools and frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {technicalFeatures.map((feature, index) => (
              <div key={index} className="bg-[#121212] border border-[#262626] rounded-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{feature.name}</h3>
                  <span className="px-3 py-1 rounded-md bg-[#10B981]/20 text-[#10B981] text-xs font-semibold">
                    {feature.tech}
                  </span>
                </div>
                <p className="text-[#A3A3A3] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Compares */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Resume Genie Stands Out
            </h2>
          </div>

          <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#262626]">
                    <th className="text-left p-6 text-white font-semibold">Feature</th>
                    <th className="text-center p-6 text-[#10B981] font-semibold">Resume Genie</th>
                    <th className="text-center p-6 text-[#737373] font-semibold">Others</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AI Enhancement", true, false],
                    ["No Account Required", true, false],
                    ["100% Free", true, false],
                    ["Complete Privacy", true, false],
                    ["Job Matching", true, true],
                    ["PDF Generation", true, true],
                    ["Unlimited Use", true, false]
                  ].map(([feature, hasFeature, othersHave], index) => (
                    <tr key={index} className="border-b border-[#262626] last:border-b-0">
                      <td className="p-6 text-[#A3A3A3]">{feature as string}</td>
                      <td className="p-6 text-center">
                        {hasFeature ? (
                          <CheckCircle className="w-6 h-6 text-[#10B981] mx-auto" />
                        ) : (
                          <span className="text-[#737373]">—</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {othersHave ? (
                          <CheckCircle className="w-6 h-6 text-[#737373] mx-auto" />
                        ) : (
                          <span className="text-[#737373]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border-2 border-[#10B981] rounded-3xl p-12 text-center">
            <Sparkles className="w-16 h-16 text-[#10B981] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience All Features Free
            </h2>
            <p className="text-lg text-[#A3A3A3] mb-8 max-w-2xl mx-auto">
              No credit card. No sign-up. Start creating your perfect resume right now.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}