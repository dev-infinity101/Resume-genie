import os
from typing import Dict, Any
import io  # Import the in-memory buffer library
from xhtml2pdf import pisa  # Import the xhtml2pdf library
from jinja2 import Environment, FileSystemLoader
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class PDFGenerator:
    def __init__(self):
        # Setup Jinja2 environment (No change here)
        template_dir = os.path.join(os.path.dirname(__file__), '..', 'templates')
        self.env = Environment(loader=FileSystemLoader(template_dir))
    
    def generate_pdf(self, resume_content: Dict[str, Any]) -> bytes:
        """
        Generate a professional PDF from resume content
        """
        try:
            # Load and render the HTML template (No change here)
            template = self.env.get_template('resume_template.html')
            html_content = template.render(
                resume=resume_content,
                generated_date=datetime.now().strftime("%B %Y")
            )
            
            # --- This is the new section for xhtml2pdf ---
            
            # Create a PDF in memory
            pdf_buffer = io.BytesIO()
            
            # Convert HTML to PDF
            pisa_status = pisa.CreatePDF(
                html_content,                # The HTML string to convert
                dest=pdf_buffer              # The in-memory file to write to
            )

            # Check if PDF creation was successful
            if pisa_status.err:
                raise Exception(f"PDF generation error: {pisa_status.err}")

            # Get the bytes from the buffer
            pdf_buffer.seek(0)
            pdf_bytes = pdf_buffer.read()
            
            # --- End of new section ---
            
            return pdf_bytes
            
        except Exception as e:
            logger.error(f"Error generating PDF: {str(e)}")
            raise Exception(f"Failed to generate PDF: {str(e)}")
    
    def validate_content(self, content: Dict[str, Any]) -> bool:
        """Validate that content has minimum required fields (No change here)"""
        required_fields = ['contact_info']
        
        for field in required_fields:
            if field not in content or not content[field]:
                return False
        
        # Check if contact info has at least name
        contact_info = content.get('contact_info', {})
        if not contact_info.get('name'):
            return False
        
        return True

# For testing (No change here)
if __name__ == "__main__":
    pass
