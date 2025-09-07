import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function extractJson(text) {
  const startIndex = text.indexOf('{');
  const endIndex = text.lastIndexOf('}');
  if (startIndex === -1 || endIndex === -1) return null;
  const jsonString = text.substring(startIndex, endIndex + 1);
  try { return JSON.parse(jsonString); } 
  catch (error) { console.error("Failed to parse JSON:", error); return null; }
}

export async function runAIAnalysis(resumeText, jobTitle, jdText) {
  const fullJd = `Job Title: ${jobTitle}\n\nJob Description:\n${jdText}`;
  
  const prompt = `
    Act as a world-class career coach. Analyze the resume against the job description.
    Provide a detailed analysis in a strict JSON format with the following keys: "score", "summary", "goodFitReason", "matchedKeywords", "missingKeywords", "suggestions", and "sections".
    
    - "score": An integer (0-100) for the overall match.
    - "summary": A one-paragraph summary of the candidate's fit.
    - "goodFitReason": A 2-3 sentence paragraph explaining why the candidate is a strong fit.
    - "matchedKeywords": An array of strings of key skills found.
    - "missingKeywords": An array of strings of key skills from the JD not in the resume.
    - "suggestions": An array of 3-5 specific, actionable suggestions.
    - "sections": An array of exactly 9 objects. Each object MUST have "title", "score" (integer 0-10), and "feedback" (a short string). The titles MUST be these, in this order: 
        'Formatting & Structure', 'Contact Information', 'Career Summary', 'Experience / Internships', 'Education', 'Projects', 'Skills', 'ATS Optimization', 'Overall Impact'.

    Resume:
    ---
    ${resumeText}
    ---
    Job Info:
    ---
    ${fullJd}
    ---
    Provide ONLY the JSON object.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const analysisJson = extractJson(text);
    if (!analysisJson) throw new Error("AI response was not valid JSON.");
    return analysisJson;
  } catch (error) {
    console.error("Error in runAIAnalysis:", error);
    throw new Error("Failed to get a valid analysis from the AI.");
  }
}

export async function generateCoverLetter(resumeText, jobTitle, jdText) {
    const prompt = `
        Write a compelling, professional, and concise cover letter based on the provided resume and job description. 
        Highlight the candidate's key strengths as they relate to the job. Address it to "Hiring Manager".
        Resume: --- ${resumeText} ---
        Job Title: ${jobTitle}
        Job Description: --- ${jdText} ---
    `;
     try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating cover letter:", error);
        throw new Error("Failed to generate cover letter from AI.");
    }
}