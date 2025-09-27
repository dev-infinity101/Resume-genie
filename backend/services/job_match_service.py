import os
import json
import re
from typing import Dict, List, Any
import google.generativeai as genai
import logging

logger = logging.getLogger(__name__)

class JobMatchService:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable not set")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash-lite')
    
    def analyze_job_match(self, resume_content: Dict[str, Any], job_description: str) -> Dict[str, Any]:
        """
        Analyze how well a resume matches a job description
        """
        try:
            # Create analysis prompt
            prompt = self._create_analysis_prompt(resume_content, job_description)
            response = self.model.generate_content(prompt)
            
            # Parse the response
            analysis = self._parse_analysis_response(response.text)
            
            # Add basic keyword analysis
            keyword_analysis = self._analyze_keywords(resume_content, job_description)
            analysis.update(keyword_analysis)
            
            return analysis
            
        except Exception as e:
            logger.error(f"Error analyzing job match: {str(e)}")
            raise Exception(f"Failed to analyze job match: {str(e)}")
    
    def _create_analysis_prompt(self, resume_content: Dict[str, Any], job_description: str) -> str:
        """Create prompt for job match analysis"""
        resume_text = self._format_resume_for_analysis(resume_content)
        
        return f"""
        You are an expert recruiter and career advisor. Please analyze how well this resume matches the given job description.

        RESUME CONTENT:
        {resume_text}

        JOB DESCRIPTION:
        {job_description}

        ANALYSIS INSTRUCTIONS:
        1. Calculate a match score (0-100) based on skills, experience, and requirements alignment
        2. Identify missing keywords and skills from the job description
        3. Provide specific suggestions to improve the match
        4. Highlight strengths that align well with the job
        5. Note any potential concerns or gaps

        Please return your response as a JSON object with this structure:
        {{
            "match_score": 85,
            "overall_assessment": "Brief overall assessment of the candidate fit",
            "strengths": [
                "Strength 1 that aligns with job requirements",
                "Strength 2 demonstrating relevant experience"
            ],
            "missing_keywords": [
                "keyword1", "keyword2", "keyword3"
            ],
            "missing_skills": [
                "Important skill 1 not found in resume",
                "Technical requirement 2 not mentioned"
            ],
            "knowledge_gaps": [
                "Specific knowledge area 1 that candidate should develop",
                "Technical concept 2 that would strengthen the application",
                "Industry knowledge 3 that could be beneficial"
            ],
            "suggestions": [
                "Specific suggestion 1 to improve match",
                "Recommendation 2 for resume enhancement",
                "Action item 3 to address gaps"
            ],
            "concerns": [
                "Potential concern 1",
                "Gap 2 that might be questioned"
            ],
            "experience_match": {{
                "score": 80,
                "notes": "Assessment of experience alignment"
            }},
            "skills_match": {{
                "score": 90,
                "notes": "Assessment of technical skills alignment"
            }},
            "education_match": {{
                "score": 75,
                "notes": "Assessment of educational background fit"
            }}
        }}

        Ensure the JSON is valid and provide actionable insights.
        """
    
    def _format_resume_for_analysis(self, resume_content: Dict[str, Any]) -> str:
        """Format resume content for analysis"""
        formatted = []
        
        if resume_content.get('contact_info'):
            formatted.append(f"Contact: {resume_content['contact_info']}")
        
        if resume_content.get('summary'):
            formatted.append(f"Summary: {resume_content['summary']}")
        
        if resume_content.get('experience'):
            formatted.append("Experience:")
            for exp in resume_content['experience']:
                formatted.append(f"- {exp}")
        
        if resume_content.get('education'):
            formatted.append("Education:")
            for edu in resume_content['education']:
                formatted.append(f"- {edu}")
        
        if resume_content.get('skills'):
            formatted.append(f"Skills: {', '.join(resume_content['skills'])}")
        
        if resume_content.get('certifications'):
            formatted.append(f"Certifications: {', '.join(resume_content['certifications'])}")
        
        return "\n".join(formatted)
    
    def _analyze_keywords(self, resume_content: Dict[str, Any], job_description: str) -> Dict[str, Any]:
        """Basic keyword analysis"""
        try:
            # Extract keywords from job description
            job_keywords = self._extract_keywords(job_description.lower())
            
            # Extract keywords from resume
            resume_text = json.dumps(resume_content).lower()
            resume_keywords = set(resume_text.split())
            
            # Find missing keywords
            missing_keywords = [kw for kw in job_keywords if kw not in resume_text]
            found_keywords = [kw for kw in job_keywords if kw in resume_text]
            
            # Calculate basic match percentage
            if job_keywords:
                keyword_match_score = (len(found_keywords) / len(job_keywords)) * 100
            else:
                keyword_match_score = 0
            
            return {
                "keyword_analysis": {
                    "total_job_keywords": len(job_keywords),
                    "matched_keywords": len(found_keywords),
                    "missing_keywords_basic": missing_keywords[:10],  # Top 10
                    "keyword_match_score": round(keyword_match_score, 1)
                }
            }
        except Exception as e:
            logger.error(f"Error in keyword analysis: {str(e)}")
            return {"keyword_analysis": {"error": "Failed to analyze keywords"}}
    
    def _extract_keywords(self, text: str) -> List[str]:
        """Extract important keywords from text"""
        # Remove common words and extract meaningful terms
        common_words = {'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'}
        
        # Clean and split text
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
        keywords = [word for word in words if word not in common_words]
        
        # Return unique keywords
        return list(set(keywords))
    
    def _parse_analysis_response(self, response_text: str) -> Dict[str, Any]:
        """Parse the AI analysis response"""
        try:
            # Clean and extract JSON
            response_text = response_text.strip()
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            
            if start_idx == -1 or end_idx == 0:
                raise ValueError("No JSON found in response")
            
            json_text = response_text[start_idx:end_idx]
            analysis = json.loads(json_text)
            
            # Validate and set defaults
            if 'match_score' not in analysis:
                analysis['match_score'] = 50
            
            return analysis
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse analysis JSON: {str(e)}")
            return {
                "match_score": 50,
                "overall_assessment": "Analysis parsing failed",
                "strengths": [],
                "missing_keywords": [],
                "suggestions": ["Please review the job description and update your resume accordingly"],
                "error": "Failed to parse detailed analysis"
            }
        except Exception as e:
            logger.error(f"Error parsing analysis response: {str(e)}")
            raise Exception(f"Failed to parse job analysis: {str(e)}")

# For testing
if __name__ == "__main__":
    pass