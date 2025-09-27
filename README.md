# Resume Genie MVP 🧞‍♂️

AI-powered resume enhancement tool that transforms any resume into a professional, ATS-optimized document in minutes. No signup required, privacy-focused, session-based processing.

## 🚀 Features

- **Upload & Extract**: Drag & drop PDF resume upload with intelligent text extraction
- **AI Polish**: Google Gemini-powered resume enhancement with professional formatting
- **Job Matching**: Analyze resume compatibility with job descriptions and get match scores
- **PDF Generation**: Download professionally formatted PDF resumes
- **Privacy First**: No user accounts, no data storage, session-only processing

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **react-dropzone** for file upload
- **Lucide React** for icons

### Backend
- **FastAPI** (Python)
- **Google Gemini AI** for content enhancement
- **PyMuPDF & pdfplumber** for PDF text extraction
- **WeasyPrint** for PDF generation
- **Jinja2** for PDF templating

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Google AI API key (Gemini)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd resume-genie
```

### 2. Backend Setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY

# Start the backend server
python main.py
```

The backend will start on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🌟 Usage

1. **Upload Resume**: Drag & drop your PDF resume or click to browse
2. **Polish Content**: Click "Polish Resume" to enhance with AI
3. **Review & Edit**: Preview the improved content and make manual edits if needed
4. **Job Matching**: Paste a job description to analyze compatibility
5. **Download**: Get your professional PDF resume

## 📁 Project Structure

```
resume-genie/
├── frontend/                    # Next.js App
│   ├── app/
│   │   ├── page.tsx            # Main application page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── FileUpload.tsx      # Drag & drop upload
│   │   ├── ResumePreview.tsx   # Content preview/edit
│   │   ├── JobMatcher.tsx      # Job analysis
│   │   └── ui/                 # UI components
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   └── utils.ts            # Utilities
│   └── package.json
│
├── backend/                     # FastAPI App
│   ├── main.py                 # FastAPI entry point
│   ├── services/
│   │   ├── pdf_service.py      # PDF text extraction
│   │   ├── ai_service.py       # Gemini integration
│   │   ├── job_match_service.py # Job analysis
│   │   └── pdf_generator.py    # PDF creation
│   ├── templates/
│   │   └── resume_template.html # PDF template
│   └── requirements.txt
│
├── .env.example
├── README.md
└── Development-checklist.md
```

## 🔧 API Endpoints

- `POST /api/upload` - Upload and extract text from PDF
- `POST /api/polish` - AI-enhance resume content
- `POST /api/analyze` - Analyze job match compatibility
- `POST /api/generate-pdf` - Generate professional PDF
- `GET /health` - Health check

## 🎯 Core User Flow

```
Upload PDF → Extract Text → AI Polish → Preview/Edit → Job Analysis → Download PDF
```

## 🛡️ Privacy & Security

- **No user accounts** - completely anonymous usage
- **Session-only data** - no permanent storage
- **Secure processing** - files processed in memory only
- **GDPR compliant** - no personal data retention

## 🐛 Troubleshooting

### Common Issues

1. **PDF text extraction fails**: Ensure PDF contains selectable text (not scanned images)
2. **AI polish fails**: Check GOOGLE_API_KEY is set correctly in backend/.env
3. **CORS errors**: Ensure backend is running on port 8000 and frontend on 3000
4. **PDF generation fails**: Install system dependencies for WeasyPrint

### WeasyPrint Dependencies

#### Ubuntu/Debian:
```bash
sudo apt-get install build-essential python3-dev python3-pip python3-setuptools python3-wheel python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
```

#### macOS:
```bash
brew install cairo pango gdk-pixbuf libffi
```

## 📊 Performance Metrics

- PDF parsing: < 3 seconds
- AI polish: < 5 seconds  
- Job analysis: < 3 seconds
- PDF generation: < 2 seconds

## 🔄 Development

### Running Tests
```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests  
cd frontend
npm test
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build

# Backend production
cd backend
gunicorn main:app --host 0.0.0.0 --port 8000
```

## 🚀 Deployment

The application is designed to be deployed on:
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, DigitalOcean

## 📈 Future Enhancements

- Multiple resume templates
- Advanced editing features
- Resume scoring metrics
- Integration with job boards
- Team/enterprise features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 💡 Support

For issues and questions:
- Check the troubleshooting section
- Review the Development-checklist.md
- Open an issue on GitHub

---

**Resume Genie** - Transform your career with AI-powered resume enhancement! ✨