'use client'

import { useState } from 'react'
import { UploadCloud, FileText, CheckCircle, Loader2, Sparkles, Target, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { apiClient, type ResumeData } from '@/lib/api'
import ResumePreview from '@/components/ResumePreview'
import JobMatcher from '@/components/JobMatcher'

type Step = 'upload' | 'polish' | 'preview' | 'job_match' | 'download'

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<Step>('upload')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState<string>('')
  const [polishedContent, setPolishedContent] = useState<ResumeData | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0);
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
        }
      }, 200);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
    })
      
      clearInterval(interval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Upload failed')
      }
      
      const data = await response.json()
      setUploadedFile(file)
      setExtractedText(data.full_text)
      setCurrentStep('polish')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setUploadProgress(0);
    } finally {
      setIsUploading(false)
    }
  }

  const handlePolishResume = async () => {
    if (!extractedText) return
    
    setIsProcessing(true)
    setError(null)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/polish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: extractedText }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Polish failed')
      }
      
      const data = await response.json()
      setPolishedContent(data.polished_content)
      setCurrentStep('preview')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Polish failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleNextToJobMatch = () => {
    setCurrentStep('job_match')
  }

  const handleBackToUpload = () => {
    setUploadedFile(null)
    setExtractedText('')
    setPolishedContent(null)
    setCurrentStep('upload')
    setError(null)
  }

  const StepIndicator = ({ step, label, icon: Icon }: { step: Step, label: string, icon: any }) => (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      currentStep === step 
        ? 'bg-[#10B981] text-white' 
        : currentStep > step
        ? 'bg-[#10B981]/20 text-[#10B981]'
        : 'bg-gray-800 text-gray-400'
    }`}>
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#10B981] opacity-20"></div>
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-[#10B981] opacity-20"></div>
        <div className="absolute top-60 left-1/4 w-2 h-2 rounded-full bg-[#10B981] opacity-20"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 rounded-full bg-[#10B981] opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-2 h-2 rounded-full bg-[#10B981] opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 rounded-full bg-[#10B981] opacity-20"></div>
      </div>

      {/* Main Content */}
      <section className="relative w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-xl">
              <StepIndicator step="upload" label="Upload" icon={UploadCloud} />
              <div className="h-6 w-px bg-gray-600 mx-2"></div>
              <StepIndicator step="polish" label="Polish" icon={Sparkles} />
              <div className="h-6 w-px bg-gray-600 mx-2"></div>
              <StepIndicator step="preview" label="Preview" icon={FileText} />
              <div className="h-6 w-px bg-gray-600 mx-2"></div>
              <StepIndicator step="job_match" label="Job Match" icon={Target} />
              <div className="h-6 w-px bg-gray-600 mx-2"></div>
              <StepIndicator step="download" label="Download" icon={CheckCircle} />
            </div>
          </div>

          <div className="flex flex-col gap-12 lg:gap-16 items-center">
            
            {/* Hero Content - Only shown during upload and polish steps */}
            {['upload', 'polish'].includes(currentStep) && (
              <div className="flex flex-col justify-center space-y-8 w-full max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-xs font-semibold text-[#10B981] uppercase tracking-wide">AI-Powered</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl leading-tight">
                  Make Your Resume Standout
                </h1>
                <p className="text-lg text-[#A3A3A3] md:text-xl max-w-[600px] leading-relaxed">
                  Our intelligent ai-powered Genie Magically fix your Resume in one click. Get started for free!
                </p>
              </div>

              {/* Step-specific guidance */}
              {currentStep === 'upload' && (
                <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-4">
                  <p className="text-sm text-[#10B981]">
                    📝 Upload your resume to get started. We support PDF, DOCX, and TXT files.
                  </p>
                </div>
              )}

              {currentStep === 'polish' && (
                <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-4">
                  <p className="text-sm text-[#10B981]">
                    ✨ Your resume has been uploaded! Click "Polish with AI" to enhance it.
                  </p>
                </div>
              )}

              {currentStep === 'preview' && (
                <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-4">
                  <p className="text-sm text-[#10B981]">
                    👀 Review your polished resume. You can edit any section before proceeding.
                  </p>
                </div>
              )}

              {currentStep === 'job_match' && (
                <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-4">
                  <p className="text-sm text-[#10B981]">
                    🎯 Analyze how well your resume matches specific job descriptions.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep !== 'upload' && (
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleBackToUpload}
                    className="border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10"
                  >
                    Start Over
                  </Button>
                  {currentStep === 'polish' && (
                    <Button 
                      onClick={handlePolishResume}
                      disabled={isProcessing}
                      className="bg-[#10B981] hover:bg-[#059669] text-white"
                    >
                      {isProcessing ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Polishing...</>
                      ) : (
                        <><Sparkles className="mr-2 h-4 w-4" /> Polish with AI</>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>
            )}

            {/* Main Content Card - Always full width */}
            <Card className="border-2 border-dashed border-[#10B981]/50 bg-[#121212] shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl">
              <CardContent className="p-8">
                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30">
                    <p className="text-sm text-[#EF4444]">{error}</p>
                  </div>
                )}

                {currentStep === 'upload' && (
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
                    <input
                      type="file"
                      id="file-upload-input"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file)
                      }}
                      accept=".txt,.pdf,.docx"
                      disabled={isUploading}
                    />

                    {!isUploading && (
                      <div
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-6 hover:bg-[#1A1A1A] rounded-xl transition-colors p-8"
                        onClick={() => document.getElementById('file-upload-input')?.click()}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#10B981]/10 blur-xl rounded-full"></div>
                          <UploadCloud className="relative h-20 w-20 text-[#10B981] stroke-[1.5]" />
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-2xl font-semibold text-white">
                            Drop your resume here
                          </h3>
                          
                          <div className="flex items-center gap-4 py-2">
                            <div className="h-px w-16 bg-[#262626]"></div>
                            <span className="text-sm text-[#737373] font-medium">or</span>
                            <div className="h-px w-16 bg-[#262626]"></div>
                          </div>

                          <div className="pt-2">
                            <div className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#10B981] text-white font-medium rounded-lg hover:bg-[#10B981]/10 transition-colors">
                              Browse Files
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-[#737373]">
                          PDF, DOCX, TXT • Maximum 10MB
                        </p>
                      </div>
                    )}

                    {isUploading && (
                      <div className="w-full space-y-4">
                        <Loader2 className="h-12 w-12 text-[#10B981] animate-spin mx-auto" />
                        <p className="text-base font-medium text-white">
                          {uploadProgress < 100 ? `Uploading your resume... (${uploadProgress}%)` : 'Upload Complete!'}
                        </p>
                        <Progress value={uploadProgress} className="w-full h-2" />
                        {uploadProgress < 100 && <p className="text-sm text-[#737373]">Processing...</p>}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 'polish' && (
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#10B981]/20 blur-xl rounded-full"></div>
                      <CheckCircle className="relative h-16 w-16 text-[#10B981]" />
                    </div>

                    <p className="text-xl font-semibold text-white">Upload Successful!</p>

                    <div className="flex w-full max-w-md items-center gap-4 rounded-xl border border-[#262626] bg-[#0A0A0A] p-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-[#10B981]/10">
                        <FileText className="h-6 w-6 text-[#10B981]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate text-sm">
                          {uploadedFile?.name}
                        </p>
                        <p className="text-xs text-[#737373] mt-1">
                          {((uploadedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <div className="w-full max-w-md flex flex-col gap-3 pt-2">
                      <Button
                        onClick={handlePolishResume}
                        disabled={isProcessing}
                        size="lg"
                        className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-medium h-12 rounded-lg"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Polishing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Polish with AI
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 'preview' && polishedContent && (
                  <ResumePreview
                    originalText={extractedText}
                    polishedContent={polishedContent}
                    onPolish={handlePolishResume}
                    onNext={handleNextToJobMatch}
                    isLoading={isProcessing}
                    setPolishedContent={setPolishedContent}
                  />
                )}

                {currentStep === 'job_match' && polishedContent && (
                  <JobMatcher
                    resumeContent={polishedContent}
                    onNext={() => setCurrentStep('download')}
                  />
                )}

                {currentStep === 'download' && (
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#10B981]/20 blur-xl rounded-full"></div>
                      <CheckCircle className="relative h-16 w-16 text-[#10B981]" />
                    </div>

                    <p className="text-xl font-semibold text-white">Process Complete!</p>
                    <p className="text-[#A3A3A3]">Your resume has been enhanced and is ready for download.</p>

                    <Button
                      onClick={handleBackToUpload}
                      className="bg-[#10B981] hover:bg-[#059669] text-white"
                    >
                      Start Over with New Resume
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
