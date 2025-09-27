import os
from typing import Dict, Any
import weasyprint
from jinja2 import Environment, FileSystemLoader
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class PDFGenerator:
    def __init__(self):
        # Setup Jinja2 environment
        template_dir = os.path.join(os.path.dirname(__file__), '..', 'templates')
        self.env = Environment(loader=FileSystemLoader(template_dir))
    
    def generate_pdf(self, resume_content: Dict[str, Any]) -> bytes:
        """
        Generate a professional PDF from resume content
        """
        try:
            # Load and render the HTML template
            template = self.env.get_template('resume_template.html')
            html_content = template.render(
                resume=resume_content,
                generated_date=datetime.now().strftime("%B %Y")
            )
            
            # Generate PDF from HTML
            html_doc = weasyprint.HTML(string=html_content)
            pdf_bytes = html_doc.write_pdf()
            
            return pdf_bytes
            
        except Exception as e:
            logger.error(f"Error generating PDF: {str(e)}")
            raise Exception(f"Failed to generate PDF: {str(e)}")
    
    def validate_content(self, content: Dict[str, Any]) -> bool:
        """Validate that content has minimum required fields"""
        required_fields = ['contact_info']
        
        for field in required_fields:
            if field not in content or not content[field]:
                return False
        
        # Check if contact info has at least name
        contact_info = content.get('contact_info', {})
        if not contact_info.get('name'):
            return False
        
        return True

# For testing
if __name__ == "__main__":
    pass