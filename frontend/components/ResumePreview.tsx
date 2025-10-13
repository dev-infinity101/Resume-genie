'use client'

import React, { useState } from 'react'
import { Sparkles, Download, Edit3, Check, X, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { apiClient, ResumeData } from '@/lib/api'

interface ResumePreviewProps {
  originalText: string
  polishedContent: ResumeData | null
  onPolish: () => void
  onNext: () => void
  isLoading: boolean
  setPolishedContent: (content: ResumeData | null) => void
}

export default function ResumePreview({ 
  originalText, 
  polishedContent, 
  onPolish, 
  onNext,
  isLoading,
  setPolishedContent
}: ResumePreviewProps) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [showDiff, setShowDiff] = useState<boolean>(false)

  const handlePolish = async () => {
    await onPolish()
  }

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field)
    setEditValue(currentValue)
  }

  const handleSaveEdit = () => {
    if (!polishedContent || !editingField) return

    const fieldPath = editingField.split('.')
    let updatedContent = { ...polishedContent };

    let currentLevel: any = updatedContent;
    for (let i = 0; i < fieldPath.length - 1; i++) {
      currentLevel = currentLevel[fieldPath[i]];
    }
    currentLevel[fieldPath[fieldPath.length - 1]] = editValue;

    setPolishedContent(updatedContent)
    setEditingField(null)
  }

  const handleCancelEdit = () => {
    setEditingField(null)
  }

  const downloadPDF = async () => {
    if (!polishedContent) return
    try {
      const pdfBlob = await apiClient.generatePDF(polishedContent)
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${polishedContent.contact_info.name.replace(/\s+/g, '_')}_resume.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF download failed:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  const renderDiff = (original: string, polished: string) => {
    // Simple diff logic (for demonstration; use a proper diff library for production)
    const origLines = original.split('\n')
    const polLines = polished.split('\n')
    return (
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-destructive/10 rounded-md">
          <h4 className="font-semibold mb-2">Original</h4>
          {origLines.map((line, i) => (
            <p key={i} className="text-sm text-destructive">{line}</p>
          ))}
        </div>
        <div className="p-4 bg-success/10 rounded-md">
          <h4 className="font-semibold mb-2">Polished</h4>
          {polLines.map((line, i) => (
            <p key={i} className="text-sm text-success">{line}</p>
          ))}
        </div>
      </div>
    )
  }

  const renderEditableField = (field: string, value: string, label: string, originalValue?: string) => {
    if (editingField === field) {
      return (
        <div className="mt-1">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-2 border border-ring rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            rows={field.includes('summary') ? 4 : 2}
          />
          <div className="flex items-center space-x-2 mt-2">
            <Button size="sm" onClick={handleSaveEdit} className="bg-success hover:bg-success/90 transition-transform transform hover:scale-105">
              <Check className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancelEdit} className="hover:bg-muted/50 transition-colors">
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="group relative p-2 -m-2 rounded-md hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:shadow-sm" onClick={() => handleEdit(field, value)}>
        <p className="text-sm text-foreground whitespace-pre-wrap">{value}</p>
        <Edit3 className="h-4 w-4 text-muted-foreground absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    )
  }

  return (
    <div className="w-full mx-auto space-y-8">
      {!polishedContent ? (
        <div className="text-center py-12 bg-muted/50 rounded-xl border border-dashed">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-medium text-foreground">Ready to Polish</h3>
          <p className="mt-1 text-sm text-muted-foreground">Your resume is loaded. Let our AI enhance it for you.</p>
          <div className="mt-6">
            <Button onClick={handlePolish} disabled={isLoading} size="lg">
              {isLoading ? (
                <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Polishing...</>
              ) : (
                <><Sparkles className="h-5 w-5 mr-2" /> Polish My Resume</>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Professional Resume Preview */}
          <div className="bg-card rounded-lg shadow-lg overflow-hidden border">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-8 text-center">
              <h1 className="text-3xl font-bold mb-2">
                {editingField === 'contact_info.name' ? (
                  <div className="inline-block">
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="bg-transparent border-b-2 border-primary-foreground text-primary-foreground placeholder-primary-foreground/80 text-center text-3xl font-bold focus:outline-none"
                      onBlur={handleSaveEdit}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      autoFocus
                    />
                  </div>
                ) : (
                  <span 
                    className="cursor-pointer hover:bg-primary/80 px-2 py-1 rounded transition-colors"
                    onClick={() => handleEdit('contact_info.name', polishedContent.contact_info.name)}
                  >
                    {polishedContent.contact_info.name}
                  </span>
                )}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-primary-foreground/90">
                {polishedContent.contact_info.email && (
                  <span className="flex items-center">
                    📧 {polishedContent.contact_info.email}
                  </span>
                )}
                {polishedContent.contact_info.phone && (
                  <span className="flex items-center">
                    📞 {polishedContent.contact_info.phone}
                  </span>
                )}
                {polishedContent.contact_info.location && (
                  <span className="flex items-center">
                    📍 {polishedContent.contact_info.location}
                  </span>
                )}
                {polishedContent.contact_info.linkedin && (
                  <span className="flex items-center">
                    💼 LinkedIn
                  </span>
                )}
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Professional Summary */}
              {polishedContent.summary && (
                <section>
                  <h2 className="text-xl font-bold text-primary mb-4 border-b-2 border-border pb-2">
                    Professional Summary
                  </h2>
                  <div className="text-foreground leading-relaxed">
                    {showDiff ? renderDiff(originalText.split('Summary:')[1]?.split('Experience:')[0] || '', polishedContent.summary) : renderEditableField('summary', polishedContent.summary, 'Summary')}
                  </div>
                </section>
              )}

              {/* Experience */}
              {polishedContent.experience && polishedContent.experience.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-primary mb-4 border-b-2 border-border pb-2">
                    Professional Experience
                  </h2>
                  <div className="space-y-6">
                    {polishedContent.experience.map((exp, index) => (
                      <div key={index} className="bg-muted/50 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <p>{exp.duration}</p>
                            <p>{exp.location}</p>
                          </div>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-foreground mt-3">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm leading-relaxed">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {polishedContent.education && polishedContent.education.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-primary mb-4 border-b-2 border-border pb-2">
                    Education
                  </h2>
                  <div className="space-y-4">
                    {polishedContent.education.map((edu, index) => (
                      <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="font-semibold text-foreground flex justify-between">
                            <span>{edu.degree} - {edu.school}</span>
                            <span className="text-sm text-muted-foreground">{edu.graduation} - {edu.location}</span>
                          </CardTitle>
                        </CardHeader>
                        {edu.details && <CardContent><p className="text-sm text-muted-foreground">{edu.details}</p></CardContent>}
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {polishedContent.skills && polishedContent.skills.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-primary mb-4 border-b-2 border-border pb-2">
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {polishedContent.skills.map((skill, i) => (
                      <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {polishedContent.certifications && polishedContent.certifications.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-primary mb-4 border-b-2 border-border pb-2">
                    Certifications
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {polishedContent.certifications.map((cert, i) => (
                      <span key={i} className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium hover:bg-success/20 transition-colors">
                        {cert}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-muted-foreground">
              <p>✨ Your resume has been enhanced with AI improvements</p>
              <p>Click on any section to edit before proceeding</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={downloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={onNext} size="lg">
                Continue to Job Matching
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}