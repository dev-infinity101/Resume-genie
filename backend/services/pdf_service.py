import io
import fitz  # PyMuPDF
import pdfplumber
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class PDFService:
    @staticmethod
    def extract_text_from_pdf(pdf_bytes: bytes) -> str:
        """
        Extract text from PDF using multiple libraries for better accuracy
        """
        try:
            # First try with PyMuPDF
            text = PDFService._extract_with_pymupdf(pdf_bytes)
            if text and len(text.strip()) > 50:
                return text
            
            # Fallback to pdfplumber if PyMuPDF doesn't work well
            text = PDFService._extract_with_pdfplumber(pdf_bytes)
            if text and len(text.strip()) > 50:
                return text
            
            logger.warning("PDF text extraction yielded minimal content")
            return text or "Unable to extract meaningful text from PDF"
            
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {str(e)}")
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
    
    @staticmethod
    def _extract_with_pymupdf(pdf_bytes: bytes) -> str:
        """Extract text using PyMuPDF"""
        try:
            doc = fitz.open(stream=pdf_bytes, filetype="pdf")
            text = ""
            for page in doc:
                text += page.get_text()
            doc.close()
            return text.strip()
        except Exception as e:
            logger.error(f"PyMuPDF extraction failed: {str(e)}")
            return ""
    
    @staticmethod
    def _extract_with_pdfplumber(pdf_bytes: bytes) -> str:
        """Extract text using pdfplumber"""
        try:
            with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
                text = ""
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                return text.strip()
        except Exception as e:
            logger.error(f"pdfplumber extraction failed: {str(e)}")
            return ""
    
    @staticmethod
    def validate_pdf(pdf_bytes: bytes) -> bool:
        """Validate if the file is a proper PDF"""
        try:
            # Check PDF header
            if pdf_bytes[:4] != b'%PDF':
                return False
            
            # Try to open with PyMuPDF
            doc = fitz.open(stream=pdf_bytes, filetype="pdf")
            page_count = len(doc)
            doc.close()
            
            return page_count > 0
        except:
            return False

# For testing
if __name__ == "__main__":
    # Test with a sample PDF
    pass