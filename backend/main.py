import os
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict, Any, Optional
from dotenv import load_dotenv

# Import our services
from services.pdf_service import PDFService
from services.ai_service import AIService
from services.job_match_service import JobMatchService
from services.pdf_generator import PDFGenerator

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Resume Genie API",
    description="AI-powered resume enhancement and job matching service",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173","https://*.vercel.app", "https://resume-genie-orpin.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
pdf_service = PDFService()
ai_service = AIService()
job_match_service = JobMatchService()
pdf_generator = PDFGenerator()

# Pydantic models for request bodies
class PolishRequest(BaseModel):
    text: str

class JobAnalysisRequest(BaseModel):
    resume_content: Dict[str, Any]
    job_description: str

class PDFGenerationRequest(BaseModel):
    content: Dict[str, Any]

# API Endpoints
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Resume Genie API"}

@app.post("/api/upload")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload and extract text from PDF resume
    """
    try:
        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(
                status_code=400, 
                detail="Only PDF files are allowed"
            )
        
        # Read file content
        pdf_bytes = await file.read()
        
        # Validate PDF
        if not pdf_service.validate_pdf(pdf_bytes):
            raise HTTPException(
                status_code=400,
                detail="Invalid PDF file or corrupted file"
            )
        
        # Extract text
        extracted_text = pdf_service.extract_text_from_pdf(pdf_bytes)
        
        if len(extracted_text.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="Unable to extract sufficient text from PDF. Please ensure the PDF contains readable text."
            )
        
        # Return response
        return {
            "status": "success",
            "filename": file.filename,
            "text_preview": extracted_text[:500] + "..." if len(extracted_text) > 500 else extracted_text,
            "full_text": extracted_text,
            "character_count": len(extracted_text)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in upload endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process PDF: {str(e)}"
        )

@app.post("/api/polish")
async def polish_resume(request: PolishRequest):
    """
    Polish resume content using AI
    """
    try:
        # Validate input
        if len(request.text.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="Resume text is too short. Please provide more content."
            )
        
        # Polish the resume
        polished_content = await ai_service.polish_resume_content(request.text)
        
        return {
            "status": "success",
            "original_text": request.text,
            "polished_content": polished_content,
            "improvements_made": polished_content.get('improvements_made', [])
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in polish endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to polish resume: {str(e)}"
        )

@app.post("/api/analyze")
async def analyze_job_match(request: JobAnalysisRequest):
    """
    Analyze resume match with job description
    """
    try:
        # Validate inputs
        if not request.resume_content:
            raise HTTPException(
                status_code=400,
                detail="Resume content is required"
            )
        
        if len(request.job_description.strip()) < 100:
            raise HTTPException(
                status_code=400,
                detail="Job description is too short. Please provide a detailed job posting."
            )
        
        # Perform analysis
        analysis = job_match_service.analyze_job_match(
            request.resume_content, 
            request.job_description
        )
        
        return {
            "status": "success",
            "analysis": analysis
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in analyze endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze job match: {str(e)}"
        )

@app.post("/api/generate-pdf")
async def generate_pdf(request: PDFGenerationRequest):
    """
    Generate PDF from resume content
    """
    try:
        # Validate content
        if not pdf_generator.validate_content(request.content):
            raise HTTPException(
                status_code=400,
                detail="Invalid resume content. Please ensure all required fields are provided."
            )
        
        # Generate PDF
        pdf_bytes = pdf_generator.generate_pdf(request.content)
        
        # Return PDF as response
        filename = f"resume_{request.content.get('contact_info', {}).get('name', 'generated').replace(' ', '_').lower()}.pdf"
        
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in generate-pdf endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate PDF: {str(e)}"
        )

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Endpoint not found"}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    logger.error(f"Internal server error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

# Run the application
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("BACKEND_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
