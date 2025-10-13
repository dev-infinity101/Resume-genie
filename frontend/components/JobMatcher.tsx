'use client'

import React, { useState } from 'react'
import { Target, TrendingUp, AlertTriangle, CheckCircle, Download, ArrowRight, FileText, Briefcase, BookOpen, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { apiClient, ResumeData, JobAnalysis } from '@/lib/api'

interface JobMatcherProps {
  resumeContent: ResumeData
  onNext: () => void
}

export default function JobMatcher({ resumeContent, onNext }: JobMatcherProps) {
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description to analyze.')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const result = await apiClient.analyzeJobMatch(resumeContent, jobDescription)
      setAnalysis(result.analysis)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during analysis.'
      setError(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const downloadTailoredPDF = async () => {
    try {
      const pdfBlob = await apiClient.generatePDF(resumeContent)
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      // Clean filename - replace spaces with underscores and remove special characters
      const cleanName = resumeContent.contact_info.name
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase()
      a.download = `${cleanName}_tailored_resume.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF download failed:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  const getScoreRingColor = (score: number) => {
    if (score >= 80) return 'stroke-success'
    if (score >= 60) return 'stroke-warning'
    return 'stroke-destructive'
  }

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-destructive'
  }

  const AnalysisResultCard = ({ icon, title, children, colorClass }: {
    icon: React.ReactNode, title: string, children: React.ReactNode, colorClass: string
  }) => (
    <Card className="transform hover:scale-105 transition-transform duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className={`text-sm font-medium ${colorClass}`}>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Input */}
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-6 w-6 mr-3 text-primary" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to see how your resume stacks up..."
              className="w-full h-48 p-3 border rounded-md resize-y focus:ring-2 focus:ring-ring focus:border-transparent transition bg-background text-foreground"
              disabled={isAnalyzing}
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || jobDescription.length < 50}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <><Target className="h-5 w-5 mr-2" /> Analyze Match</>
              )}
            </Button>
            {error && (
              <div className="flex items-center text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Results */}
        <div className="space-y-8">
          {!analysis && !isAnalyzing && (
            <Card className="flex flex-col items-center justify-center text-center py-16 px-6 bg-muted/50 border-dashed">
              <Target className="h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">Match Analysis</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your results will appear here once you analyze a job description.
              </p>
            </Card>
          )}

          {analysis && (
            <>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Overall Match Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-32 h-32">
                      <circle className="stroke-current text-muted" strokeWidth="8" fill="transparent" r="54" cx="64" cy="64" />
                      <circle 
                        className={`stroke-current ${getScoreRingColor(analysis.match_score)}`}
                        strokeWidth="8"
                        strokeDasharray={`${(analysis.match_score / 100) * 339.29}, 339.29`}
                        strokeLinecap="round"
                        fill="transparent" 
                        r="54" 
                        cx="64" 
                        cy="64"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                      />
                    </svg>
                    <span className={`absolute text-4xl font-bold ${getScoreTextColor(analysis.match_score)}`}>
                      {analysis.match_score}<span className="text-2xl">%</span>
                    </span>
                  </div>
                  <p className="mt-4 text-base text-muted-foreground max-w-md mx-auto">{analysis.overall_assessment}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.strengths && analysis.strengths.length > 0 && (
                  <AnalysisResultCard icon={<CheckCircle className="h-5 w-5 text-success" />} title="Strengths" colorClass="text-success">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 mr-2 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </AnalysisResultCard>
                )}

                {analysis.concerns && analysis.concerns.length > 0 && (
                  <AnalysisResultCard icon={<AlertTriangle className="h-5 w-5 text-destructive" />} title="Potential Concerns" colorClass="text-destructive">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {analysis.concerns.map((concern, index) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </AnalysisResultCard>
                )}
              </div>

              {analysis.missing_keywords && analysis.missing_keywords.length > 0 && (
                <AnalysisResultCard icon={<FileText className="h-5 w-5 text-warning" />} title="Missing Keywords" colorClass="text-warning">
                  <div className="flex flex-wrap gap-2">
                    {analysis.missing_keywords.slice(0, 15).map((keyword, index) => (
                      <span key={index} className="bg-warning/10 text-warning text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </AnalysisResultCard>
              )}

              {analysis.knowledge_gaps && analysis.knowledge_gaps.length > 0 && (
                <AnalysisResultCard icon={<BookOpen className="h-5 w-5 text-info" />} title="Knowledge Gaps" colorClass="text-info">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {analysis.knowledge_gaps.map((gap, index) => (
                      <li key={index} className="flex items-start">
                        <BookOpen className="h-4 w-4 text-info mt-0.5 mr-2 flex-shrink-0" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </AnalysisResultCard>
              )}

              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <AnalysisResultCard icon={<TrendingUp className="h-5 w-5 text-primary" />} title="Improvement Suggestions" colorClass="text-primary">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </AnalysisResultCard>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={downloadTailoredPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Tailored Resume
                </Button>
                <Button onClick={onNext} size="lg">
                  Finish & Complete
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}