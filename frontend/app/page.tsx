'use client'

import { useState } from 'react'
import { Sparkles, Upload, Target, Download, CheckCircle, FileText, Briefcase, Award } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ResumePreview from '@/components/ResumePreview'
import JobMatcher from '@/components/JobMatcher'
import { apiClient, ResumeData } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Step = 'upload' | 'polish' | 'match' | 'complete'

interface ResumeUploadData {
  filename: string
  text_preview: string
  full_text: string
  character_count: number
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<Step>('upload')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadData, setUploadData] = useState<ResumeUploadData | null>(null)
  const [polishedContent, setPolishedContent] = useState<ResumeData | null>(null)

  const handleUploadSuccess = (data: ResumeUploadData) => {
    setUploadData(data)
    setCurrentStep('polish')
  }

  const handlePolish = async () => {
    if (!uploadData) return

    setIsLoading(true)
    try {
      const result = await apiClient.polishResume(uploadData.full_text)
      setPolishedContent(result.polished_content)
    } catch (error) {
      console.error('Polish failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextToMatching = () => {
    setCurrentStep('match')
  }

  const handleComplete = () => {
    setCurrentStep('complete')
  }

  const resetFlow = () => {
    setCurrentStep('upload')
    setUploadData(null)
    setPolishedContent(null)
    setIsLoading(false)
  }

  const stepConfig = [
    { id: 'upload', label: 'Upload Resume', icon: Upload },
    { id: 'polish', label: 'Polish Content', icon: Sparkles },
    { id: 'match', label: 'Job Matching', icon: Target },
    { id: 'complete', label: 'Download', icon: Download },
  ] as const;

  const currentStepNumber = stepConfig.findIndex(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold">Resume Genie</h1>
                <p className="text-sm opacity-90">Your personal AI-powered resume assistant</p>
              </div>
            </div>
            <div className="text-sm opacity-90 hidden md:block">
              No signup required • 100% free
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center overflow-x-auto">
              {stepConfig.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center min-w-[100px]">
                  <div className={cn(
                    "rounded-full p-3",
                    index <= currentStepNumber ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                  )}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-center">{step.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Welcome Message */}
        {currentStep === 'upload' && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Supercharge Your Resume in Seconds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI will analyze your resume, suggest powerful improvements, and help you tailor it to your dream job. No accounts, no fees, just results.
            </p>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white p-8 rounded-xl shadow-md min-h-[400px] transition-all duration-300 hover:shadow-lg">
          {currentStep === 'upload' && (
            <FileUpload
              onUploadSuccess={handleUploadSuccess}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}

          {currentStep === 'polish' && uploadData && (
            <ResumePreview
              originalText={uploadData.full_text}
              polishedContent={polishedContent}
              onPolish={handlePolish}
              onNext={handleNextToMatching}
              isLoading={isLoading}
              setPolishedContent={setPolishedContent}
            />
          )}

          {currentStep === 'match' && polishedContent && (
            <JobMatcher
              resumeContent={polishedContent}
              onNext={handleComplete}
            />
          )}

          {currentStep === 'complete' && polishedContent && (
            <div className="text-center space-y-8">
              <div className="bg-green-50 rounded-xl p-8 border border-green-200 transition-all duration-300 hover:shadow-md">
                <Award className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Resume is Ready to Shine!
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  You've successfully enhanced your resume. Download the final version and start applying with confidence.
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={async () => {
                      try {
                        if (!polishedContent) {
                          alert('No resume content available for download.')
                          return
                        }
                        const pdfBlob = await apiClient.generatePDF(polishedContent)
                        const url = URL.createObjectURL(pdfBlob)
                        const a = document.createElement('a')
                        a.href = url
                        // Clean filename - replace spaces with underscores and remove special characters
                        const cleanName = polishedContent.contact_info.name
                          .replace(/[^a-zA-Z0-9\s]/g, '')
                          .replace(/\s+/g, '_')
                          .toLowerCase()
                        a.download = `${cleanName}_resume_final.pdf`
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        URL.revokeObjectURL(url)
                      } catch (error) {
                        console.error('Download failed:', error)
                        alert('Failed to download PDF. Please try again.')
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Polished Resume
                  </button>
                  <button
                    onClick={resetFlow}
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  >
                    Start Over
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary of Enhancements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                    <FileText className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="font-semibold text-gray-800">Resume Uploaded</span>
                    <span className="text-sm text-green-600 font-medium">✓ Completed</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <Sparkles className="h-8 w-8 text-yellow-500 mb-2" />
                    <span className="font-semibold text-gray-800">AI Enhancement</span>
                    <span className="text-sm text-green-600 font-medium">✓ Completed</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                    <Briefcase className="h-8 w-8 text-purple-500 mb-2" />
                    <span className="font-semibold text-gray-800">Job Analysis</span>
                    <span className="text-sm text-green-600 font-medium">✓ Completed</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} Resume Genie. All rights reserved.
            </p>
            <p>
              Your data is processed in-memory and never stored. Your privacy is our priority.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}