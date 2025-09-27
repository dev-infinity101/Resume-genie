import os
import json
import google.generativeai as genai
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable not set")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash-lite')
    
    async def polish_resume_content(self, raw_text: str) -> Dict[str, Any]:
        """
        Polish resume content using AI to improve formatting, language, and impact
        """
        try:
            prompt = self._create_polish_prompt(raw_text)
            response = self.model.generate_content(prompt)
            
            # Parse the response
            polished_data = self._parse_polish_response(response.text)
            return polished_data
            
        except Exception as e:
            logger.error(f"Error polishing resume: {str(e)}")
            raise Exception(f"Failed to polish resume: {str(e)}")
    
    def _create_polish_prompt(self, raw_text: str) -> str:
        """Create a comprehensive prompt for resume polishing"""
        return f"""
        You are an expert resume writer and career coach. Please analyze and improve the following resume content.

        ORIGINAL RESUME TEXT:
        {raw_text}

        INSTRUCTIONS:
        1. Extract and structure the resume into clear sections
        2. Improve language to be more professional and impactful
        3. Use strong action verbs and quantify achievements where possible
        4. Fix grammar, spelling, and formatting issues
        5. Ensure ATS (Applicant Tracking System) compatibility
        6. Maintain all original information while enhancing presentation

        Please return your response as a JSON object with the following structure:
        {{
            "contact_info": {{
                "name": "Full Name",
                "email": "email@example.com",
                "phone": "phone number",
                "location": "City, State",
                "linkedin": "linkedin URL if available",
                "website": "website URL if available"
            }},
            "summary": "Professional summary (2-3 sentences highlighting key strengths)",
            "experience": [
                {{
                    "title": "Job Title",
                    "company": "Company Name",
                    "duration": "Start Date - End Date",
                    "location": "City, State",
                    "achievements": [
                        "Achievement 1 with quantified results",
                        "Achievement 2 with impact metrics",
                        "Achievement 3 demonstrating skills"
                    ]
                }}
            ],
            "education": [
                {{
                    "degree": "Degree Type",
                    "school": "School Name",
                    "graduation": "Graduation Date",
                    "location": "City, State",
                    "details": "GPA, honors, relevant coursework if applicable"
                }}
            ],
            "skills": [
                "Skill 1", "Skill 2", "Skill 3"
            ],
            "certifications": [
                "Certification 1", "Certification 2"
            ],
            "improvements_made": [
                "List of key improvements made to the original resume"
            ]
        }}

        Make sure the JSON is valid and properly formatted. Focus on making the resume more compelling while maintaining accuracy.
        """
    
    def _parse_polish_response(self, response_text: str) -> Dict[str, Any]:
        """Parse and validate the AI response"""
        try:
            # Clean the response to extract JSON
            response_text = response_text.strip()
            
            # Find JSON content
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            
            if start_idx == -1 or end_idx == 0:
                raise ValueError("No JSON found in response")
            
            json_text = response_text[start_idx:end_idx]
            polished_data = json.loads(json_text)
            
            # Validate required fields
            required_fields = ['contact_info', 'summary', 'experience', 'education', 'skills']
            for field in required_fields:
                if field not in polished_data:
                    polished_data[field] = []
            
            return polished_data
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON response: {str(e)}")
            # Return a basic structure with the raw text
            return {
                "contact_info": {},
                "summary": "Unable to parse improved content",
                "experience": [],
                "education": [],
                "skills": [],
                "certifications": [],
                "raw_improved_text": response_text,
                "improvements_made": ["AI processing encountered formatting issues"]
            }
        except Exception as e:
            logger.error(f"Error parsing polish response: {str(e)}")
            raise Exception(f"Failed to parse polished content: {str(e)}")

# For testing
if __name__ == "__main__":
    # Test with sample resume text
    pass