'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { parseResume } from './lib/parser';
import { runAIAnalysis, generateCoverLetter as generateCoverLetterAI } from './lib/gemini';

// analyzeResumeAction remains the same...
export async function analyzeResumeAction(prevState, formData) {
  // ... (no changes here)
  const resumeFile = formData.get('resume');
  const jobTitle = formData.get('jobTitle');
  const jobDescription = formData.get('jd');

  if (!resumeFile || resumeFile.size === 0 || !jobTitle || !jobDescription) {
    return { success: false, message: 'Please fill out all fields.' };
  }
  try {
    const resumeText = await parseResume(resumeFile);
    const analysisResult = await runAIAnalysis(resumeText, jobTitle, jobDescription);
    const resultId = crypto.randomUUID();
    const cookieData = {
        analysis: analysisResult,
        resumeText: resumeText,
        jobTitle: jobTitle,
        jobDescription: jobDescription,
    };
    const jsonData = JSON.stringify(cookieData);
    const encodedData = Buffer.from(jsonData).toString('base64');
    cookies().set(`analysis-result-${resultId}`, encodedData, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60, path: '/',
    });
    redirect(`/results/${resultId}`);
  } catch (error) {
    if (error.digest?.startsWith('NEXT_REDIRECT')) throw error;
    console.error("Error in analyzeResumeAction:", error);
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}


// **UPDATED** generateCoverLetterAction now accepts data directly
export async function generateCoverLetterAction(data) {
    try {
        const { resumeText, jobTitle, jobDescription } = data;
        if (!resumeText || !jobTitle || !jobDescription) {
            throw new Error("Missing data to generate the cover letter.");
        }
        const coverLetter = await generateCoverLetterAI(resumeText, jobTitle, jobDescription);
        return { success: true, coverLetter };
    } catch(error) {
        console.error("Error in generateCoverLetterAction:", error);
        return { success: false, message: error.message || "Failed to generate cover letter." };
    }
}