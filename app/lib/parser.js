import pdf from "pdf-parse/lib/pdf-parse.js"; // Corrected import
import mammoth from "mammoth";

/**
 * Parses a resume file (PDF or DOCX) and returns its text content.
 * @param {File} file The resume file object from the form.
 * @returns {Promise<string>} The extracted text content of the resume.
 */
export async function parseResume(file) {
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "application/pdf") {
    // This part should now work correctly
    const data = await pdf(fileBuffer);
    return data.text;
  } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
    return value;
  } else {
    throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
  }
}