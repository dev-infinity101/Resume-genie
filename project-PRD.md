# Resume-Genie MVP: Core Functionality Only
## No Authentication Required

---

## 📋 MVP Product Requirements Document

### **Executive Summary**
Resume-Genie MVP is a streamlined web application that transforms any resume into a professional, ATS-optimized document in minutes. Users can upload their resume, get AI-powered improvements, tailor it for specific jobs, and download a polished PDF - all without creating an account.

### **Core Value Proposition**
**"Upload. Polish. Tailor. Download. Done."** - No signups, no logins, just instant resume improvement.

---

## 🎯 MVP Feature Set (Ultra-Simplified)

### **Phase 1: Core Flow (2-3 weeks)**
1. **Upload Resume** - Drag & drop PDF upload
2. **AI Polish** - One-click resume enhancement
3. **Preview & Edit** - See and modify improved content
4. **Download PDF** - Get professional PDF output

### **Phase 2: Job Tailoring (1-2 weeks)**
5. **Job Description Input** - Paste job posting
6. **Match Score** - See compatibility percentage
7. **Smart Suggestions** - AI recommendations for improvement
8. **Tailored Download** - Download job-specific version

### **Out of Scope (Future Versions)**
- User accounts or data persistence
- Multiple resume storage
- Templates (just one clean template)
- Advanced editing features

---

## 🚫 What We're NOT Building

- Authentication system
- User dashboards  
- Data persistence beyond session
- Multiple templates
- User management
- Payment integration
- Email features

---

## ✅ Success Metrics

- **Primary**: User completes upload → polish → download flow
- **Secondary**: Average session time > 10 minutes
- **Quality**: User downloads improved resume (not original)

---

## 🧪 User Journey (No Auth)

```
1. Land on homepage
2. Upload PDF resume
3. See extracted text preview
4. Click "Polish My Resume"
5. Review AI improvements
6. [Optional] Paste job description for tailoring
7. Download professional PDF
8. Done! (No account needed)
```

---

# 🏗️ Simplified System Architecture

## **High-Level Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                  USER BROWSER                           │
│  ┌─────────────────────────────────────────────────────┐│
│  │           Next.js Frontend                          ││
│  │  ├── File Upload Component                          ││
│  │  ├── Resume Preview/Edit                            ││
│  │  ├── AI Polish Interface                            ││
│  │  ├── Job Matching Tool                              ││
│  │  └── PDF Download                                   ││
│  │                                                     ││
│  │  State: React useState + sessionStorage             ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP API Calls
                  │ (stateless requests)
┌─────────────────▼───────────────────────────────────────┐
│              FastAPI Backend                            │
│  ├── /upload - PDF text extraction                     │
│  ├── /polish - AI resume enhancement                   │
│  ├── /analyze - Job matching analysis                  │
│  ├── /generate-pdf - PDF creation                      │
│  └── /health - Health check                            │
│                                                         │
│  No Database - Stateless Processing                    │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
    ┌───▼───┐ ┌──▼────┐ ┌──▼────┐
    │Google │ │ PDF   │ │ File  │
    │ AI    │ │ Libs  │ │ Temp  │
    │(Gemini│ │       │ │ Store │
    │ Flash)│ │       │ │       │
    └───────┘ └───────┘ └───────┘
```

---

## 🛠️ Tech Stack (Minimalist)

### **Frontend**
```json
{
  "framework": "Next.js 14+ (App Router)",
  "styling": "Tailwind CSS",
  "ui": "shadcn/ui components",  
  "state": "React useState + sessionStorage",
  "upload": "react-dropzone",
  "pdf-display": "react-pdf"
}
```

### **Backend**
```python
# requirements.txt (Ultra-minimal)
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6

# AI Integration
google-generativeai==0.3.1

# PDF Processing  
PyMuPDF==1.23.8
pdfplumber==0.10.3
weasyprint==60.1
jinja2==3.1.2

# Utilities
pydantic==2.5.0
python-dotenv==1.0.0

# NO DATABASE LIBRARIES!
# NO AUTH LIBRARIES! 
# NO USER MANAGEMENT!
```

---

## 📂 Simplified Project Structure

```
resume-genie-mvp/
├── frontend/                    # Next.js App
│   ├── app/
│   │   ├── page.tsx            # Single page app
│   │   ├── api/                # Optional: Next.js API routes
│   │   └── globals.css
│   ├── components/
│   │   ├── FileUpload.tsx      # Drag & drop
│   │   ├── ResumePreview.tsx   # Show content
│   │   ├── PolishButton.tsx    # AI enhancement
│   │   ├── JobMatcher.tsx      # Job analysis
│   │   └── DownloadPDF.tsx     # PDF generation
│   ├── lib/
│   │   └── api.ts              # API client
│   └── public/
│
├── backend/                     # FastAPI App
│   ├── main.py                 # FastAPI entry point
│   ├── services/
│   │   ├── pdf_service.py      # PDF text extraction
│   │   ├── ai_service.py       # Gemini integration
│   │   ├── job_match_service.py # Job analysis
│   │   └── pdf_generator.py    # PDF creation
│   ├── templates/
│   │   └── resume_template.html # Single PDF template
│   └── temp/                   # Temporary file storage
│
├── .env.example
├── docker-compose.yml          # Optional: Local development
└── README.md
```

---

## 🔧 Core API Endpoints (Stateless)

```python
# backend/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from services.pdf_service import extract_text_from_pdf
from services.ai_service import polish_resume_content
from services.job_match_service import analyze_job_match
from services.pdf_generator import generate_pdf

app = FastAPI(title="Resume Genie MVP", version="1.0.0")

# CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload")
async def upload_resume(file: UploadFile = File(...)):
    """Extract text from uploaded PDF"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(400, "Only PDF files allowed")
    
    pdf_bytes = await file.read()
    extracted_text = extract_text_from_pdf(pdf_bytes)
    
    return {
        "filename": file.filename,
        "text_preview": extracted_text[:500] + "...",
        "full_text": extracted_text,
        "status": "success"
    }

@app.post("/api/polish")
async def polish_resume(data: dict):
    """Polish resume content with AI"""
    raw_text = data.get("text", "")
    
    if len(raw_text) < 50:
        raise HTTPException(400, "Resume text too short")
    
    polished_content = await polish_resume_content(raw_text)
    
    return {
        "original_text": raw_text,
        "polished_content": polished_content,
        "improvements": "Enhanced with action verbs and quantified achievements"
    }

@app.post("/api/analyze")  
async def analyze_job_match(data: dict):
    """Analyze resume match with job description"""
    resume_text = data.get("resume_text", "")
    job_description = data.get("job_description", "")
    
    analysis = analyze_job_match(resume_text, job_description)
    
    return {
        "match_score": analysis["score"],
        "missing_keywords": analysis["missing_keywords"], 
        "suggestions": analysis["suggestions"]
    }

@app.post("/api/generate-pdf")
async def create_pdf(data: dict):
    """Generate PDF from resume content"""
    content = data.get("content", {})
    
    if not content:
        raise HTTPException(400, "No content provided")
    
    pdf_bytes = generate_pdf(content)
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=improved_resume.pdf"
        }
    )

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

---

## 🎨 Frontend Implementation (Single Page App)

```typescript
// app/page.tsx - Main Application
'use client'
import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import ResumePreview from '@/components/ResumePreview' 
import JobMatcher from '@/components/JobMatcher'

interface ResumeData {
  originalText: string
  polishedContent: any
  filename: string
}

export default function HomePage() {
  const [step, setStep] = useState<'upload' | 'polish' | 'match' | 'download'>('upload')
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      setResumeData({
        originalText: data.full_text,
        polishedContent: null,
        filename: data.filename
      })
      setStep('polish')
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePolish = async () => {
    if (!resumeData) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: resumeData.originalText })
      })
      
      const data = await response.json()
      setResumeData(prev => ({
        ...prev!,
        polishedContent: data.polished_content
      }))
      setStep('match')
    } catch (error) {
      console.error('Polish failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Genie ✨
          </h1>
          <p className="text-xl text-gray-600">
            Upload. Polish. Tailor. Download. No signup required.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <StepIndicator step={1} current={step} label="Upload" />
              <StepIndicator step={2} current={step} label="Polish" />
              <StepIndicator step={3} current={step} label="Tailor" />
              <StepIndicator step={4} current={step} label="Download" />
            </div>
          </div>

          {/* Main Content */}
          {step === 'upload' && (
            <FileUpload 
              onUpload={handleFileUpload} 
              isLoading={isLoading} 
            />
          )}
          
          {step === 'polish' && resumeData && (
            <ResumePreview
              originalText={resumeData.originalText}
              polishedContent={resumeData.polishedContent}
              onPolish={handlePolish}
              isLoading={isLoading}
            />
          )}
          
          {step === 'match' && resumeData?.polishedContent && (
            <JobMatcher
              resumeContent={resumeData.polishedContent}
              onNext={() => setStep('download')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Simple step indicator component
function StepIndicator({ step, current, label }: { step: number, current: string, label: string }) {
  const stepMap = { upload: 1, polish: 2, match: 3, download: 4 }
  const isActive = stepMap[current as keyof typeof stepMap] >= step
  const isCurrent = stepMap[current as keyof typeof stepMap] === step
  
  return (
    <div className={`flex items-center ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
        ${isCurrent ? 'bg-blue-600 text-white' : isActive ? 'bg-blue-100' : 'bg-gray-200'}`}>
        {step}
      </div>
      <span className="ml-2 text-sm font-medium">{label}</span>
    </div>
  )
}
```

---

## 💾 Data Flow (Session-Based)

```typescript
// lib/sessionStorage.ts
export const SessionStorage = {
  setResumeData(data: any) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('resume_data', JSON.stringify(data))
    }
  },
  
  getResumeData() {
    if (typeof window !== 'undefined') {
      const data = sessionStorage.getItem('resume_data')
      return data ? JSON.parse(data) : null
    }
    return null
  },
  
  clearResumeData() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('resume_data')
    }
  }
}

// Usage: Data persists only during browser session
// When user closes tab/browser = data is gone
// Perfect for privacy-focused, no-account app
```

---

## 🚀 Development Timeline (3-5 Weeks)

### **Week 1: Core Upload & Polish**
- [ ] Setup Next.js + FastAPI projects
- [ ] PDF upload with text extraction
- [ ] Basic AI polish functionality
- [ ] Simple preview interface

### **Week 2: Polish & UI**
- [ ] Improve AI prompting
- [ ] Better preview/edit interface  
- [ ] PDF generation with template
- [ ] Error handling & validation

### **Week 3: Job Matching**
- [ ] Job description input
- [ ] Basic match scoring
- [ ] Improvement suggestions
- [ ] UI polish & responsive design

### **Week 4-5: Testing & Deployment**
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Deploy to Vercel + Railway
- [ ] Domain setup & monitoring

---

## 🎯 MVP Success Definition

**User can complete this flow in under 10 minutes:**
1. Upload their resume PDF
2. See AI-improved version  
3. Get match score for a job
4. Download professional PDF
5. All without creating any account

**Technical Success:**
- 95% PDF parsing success rate
- AI polish improves 80%+ of resumes noticeably
- Sub-3-second response times
- Works on mobile & desktop

---

## 🔒 Privacy Benefits (No Auth = More Privacy)

- **No data stored permanently**
- **No email collection** 
- **No user tracking beyond session**
- **Complete anonymity**
- **GDPR friendly** (no personal data retention)

---

## 🌟 Future Enhancement Path

Once MVP is proven:

1. **Add optional account system** for resume storage
2. **Multiple PDF templates**
3. **Advanced editing features** 
4. **Job application tracking**
5. **Team/enterprise features**

But for MVP: **Keep it simple, fast, and focused on core value.**

---

This ultra-simplified approach gets you to market in 3-5 weeks with zero authentication complexity while delivering the core value proposition perfectly.