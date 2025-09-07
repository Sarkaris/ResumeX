'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { generateCoverLetterAction } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CheckCircle, XCircle, Star, Download, FileText, Lightbulb, Loader2, X as XIcon, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

// =======================================================================
// HELPER COMPONENTS - FULL IMPLEMENTATION
// =======================================================================

const ResumeRating = ({ score }) => {
    let stars = 0, rank = 'Bronze', rankColor = 'text-orange-400';
    if (score >= 90) { stars = 5; rank = 'Diamond'; rankColor = 'text-cyan-400'; }
    else if (score >= 80) { stars = 4; rank = 'Gold'; rankColor = 'text-yellow-400'; }
    else if (score >= 70) { stars = 3; rank = 'Silver'; rankColor = 'text-slate-400'; }
    else if (score >= 60) { stars = 2; rank = 'Bronze'; }
    else { stars = 1; rank = 'Needs Improvement'; rankColor = 'text-red-500'; }
    
    return (
        <div className="text-center">
            <h3 className={`text-2xl font-bold ${rankColor}`}>{rank} Tier</h3>
            <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-8 w-8 transition-all duration-300 ${i < stars ? `${rankColor.replace('text-', 'fill-')} ${rankColor}` : 'text-gray-300 dark:text-gray-700'}`} />
                ))}
            </div>
        </div>
    );
};

const KeywordList = ({ title, keywords, variant }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {keywords && keywords.length > 0 ? (
        keywords.map((keyword, index) => (
          <Badge key={index} variant={variant} className="text-sm px-3 py-1">
            {variant === 'success' ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
            {keyword}
          </Badge>
        ))
      ) : (
        <p className="text-sm text-gray-500">None found.</p>
      )}
    </div>
  </div>
);

const SectionScoreChart = ({ title, score, feedback }) => {
    const data = [{ name: title, score: score }];
    const scoreColor = score > 8 ? '#22c55e' : score > 5 ? '#f59e0b' : '#ef4444';

    return (
        <div className="py-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                    <p className="font-semibold text-lg">{title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feedback}</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-56">
                    <div className="w-full sm:w-40 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis type="number" domain={[0, 10]} hide />
                                <YAxis type="category" dataKey="name" hide />
                                <Bar dataKey="score" barSize={10} radius={[5, 5, 5, 5]}>
                                    <Cell fill={scoreColor} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <span className={`font-bold text-lg w-12 text-right ${score > 8 ? 'text-green-500' : score > 5 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {score}/10
                    </span>
                </div>
            </div>
        </div>
    );
};


// =======================================================================
// MAIN DASHBOARD COMPONENT
// =======================================================================

export function ResultsDashboard({ reportData, resultId }) {
  const [isDownloading, setIsDownloading] = useState({ pdf: false, docx: false });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState({ content: '', error: '' });
  const [copyState, setCopyState] = useState('Copy Text');

  const { analysis, resumeText, jobTitle, jobDescription } = reportData;
  const { score, summary, matchedKeywords, missingKeywords, suggestions, goodFitReason, sections } = analysis;

  const handleDownloadPdf = () => {
    setIsDownloading(prev => ({ ...prev, pdf: true }));
    const doc = new jsPDF();
    let y = 20; // Start with more margin at the top

    // --- PDF Header ---
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text("Your Ultimate Resume Report", doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
    y += 8;
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(150);
    doc.text(`Analysis ID: ${resultId}`, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
    y += 15;

    // --- Overall Score ---
    const scoreColor = score >= 80 ? [4, 120, 87] : score >= 60 ? [245, 158, 11] : [239, 68, 68];
    doc.setFillColor(...scoreColor);
    doc.roundedRect(14, y, doc.internal.pageSize.getWidth() - 28, 20, 3, 3, 'F');
    doc.setTextColor(255);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(`Overall Match Score: ${score}%`, 20, y + 12.5);
    y += 30;

    // --- Helper Function for Sections ---
    const addSection = (title, content, options = {}) => {
        if (y > 260) { doc.addPage(); y = 20; } // Auto page break
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0);
        doc.text(title, 15, y);
        y += 8;
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(80);
        if (Array.isArray(content)) {
            content.forEach(item => {
                const splitText = doc.splitTextToSize(`• ${item}`, 180);
                doc.text(splitText, 20, y);
                y += (splitText.length * 5) + 2;
            });
        } else {
            const splitText = doc.splitTextToSize(content, 180);
            doc.text(splitText, 15, y);
            y += (splitText.length * 5) + 5;
        }
        y += 10;
    };
    
    // --- Building the Report ---
    addSection("AI Summary", summary);
    addSection("Why You're a Great Fit", goodFitReason);
    addSection("Matched Keywords", matchedKeywords);
    addSection("Missing Keywords", missingKeywords);
    addSection("Detailed Section Breakdown", sections.map(s => `${s.title}: ${s.score}/10 - ${s.feedback}`));
    addSection("AI Improvement Suggestions", suggestions);

    doc.save(`resume-report-${resultId}.pdf`);
    setIsDownloading(prev => ({ ...prev, pdf: false }));
  };
  
  const handleDownloadDocx = () => {
    setIsDownloading(prev => ({...prev, docx: true}));
    
    // --- Helper for creating styled section headings ---
    const createHeading = (text) => new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 }});
    
    const doc = new Document({
      styles: {
        paragraphStyles: [
          { id: "Normal", name: "Normal", run: { size: 22, font: "Calibri", color: "595959" } },
          { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", run: { size: 44, bold: true, color: "2E74B5" }, paragraph: { spacing: { before: 240, after: 120 }}},
          { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", run: { size: 28, bold: true, color: "404040" }, paragraph: { spacing: { before: 240, after: 120 }}},
        ],
      },
      sections: [{
        children: [
          new Paragraph({ text: "Your Ultimate Resume Report", heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
          new Paragraph({ text: `Overall Match Score: ${score}%`, alignment: AlignmentType.CENTER, run: { size: 32, bold: true, color: score >= 80 ? "00B050" : score >= 60 ? "FFC000" : "FF0000" }}),
          
          createHeading("AI Summary"),
          new Paragraph({ text: summary, style: "Normal" }),
          
          createHeading("Why You're a Great Fit"),
          new Paragraph({ text: goodFitReason, style: "Normal" }),
          
          createHeading("Keyword Analysis"),
          new Paragraph({ children: [ new TextRun({ text: "Matched Keywords", bold: true }) ] }),
          ...(matchedKeywords.map(s => new Paragraph({ text: s, bullet: { level: 0 }})) || [new Paragraph("None found.")]),
          new Paragraph({ children: [ new TextRun({ text: "Missing Keywords", bold: true }) ], spacing: {before: 100}}),
          ...(missingKeywords.map(s => new Paragraph({ text: s, bullet: { level: 0 }})) || [new Paragraph("None found.")]),

          createHeading("Detailed Section Breakdown"),
          ...sections.flatMap(section => [
              new Paragraph({ children: [ new TextRun({ text: `${section.title}: `, bold: true }), new TextRun(`${section.score}/10`) ]}),
              new Paragraph({ children: [ new TextRun({ text: section.feedback, italics: true }) ], spacing: { after: 200 } }),
          ]),

          createHeading("AI Improvement Suggestions"),
          ...(suggestions.map(s => new Paragraph({ text: s, bullet: { level: 0 }})) || [new Paragraph("No specific suggestions at this time.")]),
        ],
      }],
    });
    Packer.toBlob(doc).then(blob => { saveAs(blob, `resume-report-${resultId}.docx`); });
    setIsDownloading(prev => ({...prev, docx: false}));
  };
  
  
  const handleGenerateCoverLetter = async () => {
    setIsGenerating(true);
    setIsModalOpen(true);
    setCoverLetter({ content: '', error: '' });
    const result = await generateCoverLetterAction({ resumeText, jobTitle, jobDescription });
    if (result.success) {
      setCoverLetter({ content: result.coverLetter, error: '' });
    } else {
      setCoverLetter({ content: '', error: result.message });
    }
    setIsGenerating(false);
  };
  
  const handleDownloadCoverLetter = (format) => {
    if (format === 'pdf') {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        const splitText = pdf.splitTextToSize(coverLetter.content, 180);
        pdf.text(splitText, 10, 10);
        pdf.save('cover-letter.pdf');
    } else if (format === 'docx') {
        const doc = new Document({
            sections: [{ children: coverLetter.content.split('\n').map(p => new Paragraph(p)) }],
        });
        Packer.toBlob(doc).then(blob => { saveAs(blob, 'cover-letter.docx'); });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter.content);
    setCopyState('Copied!');
    setTimeout(() => setCopyState('Copy Text'), 2000);
  };

  return (
    <>
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <div>
                  <h1 className="text-4xl font-bold">Your Ultimate Resume Report</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">A comprehensive analysis to help you land your dream job.</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <Button onClick={handleDownloadPdf} disabled={isDownloading.pdf} variant="outline" className="w-full sm:w-auto">
                    {isDownloading.pdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />} PDF
                  </Button>
                   <Button onClick={handleDownloadDocx} disabled={isDownloading.docx} variant="outline" className="w-full sm:w-auto">
                    {isDownloading.docx ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />} DOCX
                  </Button>
                  <Button onClick={handleGenerateCoverLetter} disabled={isGenerating} className="w-full sm:w-auto">
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                    Generate Cover Letter
                  </Button>
              </div>
            </div>

            <div id="report-content" className="bg-white dark:bg-black p-4 sm:p-8 rounded-lg border border-gray-200 dark:border-gray-800">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="breakdown">Detailed Breakdown</TabsTrigger>
                        <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1 space-y-8">
                                <Card><CardHeader><CardTitle>Overall Match Score</CardTitle></CardHeader><CardContent className="flex items-center justify-center p-6"><div className="relative h-48 w-48"><svg className="w-full h-full" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" className="stroke-current text-gray-200 dark:text-gray-800" strokeWidth="10" fill="transparent" /><motion.circle cx="50" cy="50" r="45" className={`stroke-current ${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'}`} strokeWidth="10" fill="transparent" strokeDasharray={2 * Math.PI * 45} strokeLinecap="round" transform="rotate(-90 50 50)" initial={{ strokeDashoffset: 2 * Math.PI * 45 }} animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - score / 100) }} transition={{ duration: 1.5, ease: "circOut" }} /><text x="50" y="50" textAnchor="middle" dy=".3em" className="text-4xl font-bold fill-current">{score}%</text></svg></div></CardContent></Card>
                                <Card><CardHeader><CardTitle>Resume Rating</CardTitle></CardHeader><CardContent><ResumeRating score={score} /></CardContent></Card>
                            </div>
                            <div className="lg:col-span-2 space-y-8">
                                <Card><CardHeader><CardTitle>AI Summary</CardTitle></CardHeader><CardContent><p className="text-lg text-gray-700 dark:text-gray-300">{summary}</p></CardContent></Card>
                                <Card><CardHeader><CardTitle>Keyword Analysis</CardTitle></CardHeader><CardContent className="space-y-6"><KeywordList title="Matched Keywords" keywords={matchedKeywords} variant="success" /><KeywordList title="Missing Keywords" keywords={missingKeywords} variant="destructive" /></CardContent></Card>
                            </div>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="breakdown">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Card>
                            <CardHeader><CardTitle>Section-by-Section Analysis</CardTitle><CardDescription>How your resume performs in key areas.</CardDescription></CardHeader>
                            <CardContent className="divide-y divide-gray-200 dark:divide-gray-800">
                                {sections && sections.map(section => ( <SectionScoreChart key={section.title} title={section.title} score={section.score} feedback={section.feedback} /> ))}
                            </CardContent>
                          </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="recommendations">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <Card>
                            <CardHeader><CardTitle>Why You're a Great Fit</CardTitle><CardDescription>Use this in your cover letter or interview!</CardDescription></CardHeader>
                            <CardContent><p className="text-lg text-gray-700 dark:text-gray-300">{goodFitReason}</p></CardContent>
                          </Card>
                          <Card>
                            <CardHeader><CardTitle>AI Improvement Suggestions</CardTitle><CardDescription>Actionable tips to boost your score.</CardDescription></CardHeader>
                            <CardContent><ul className="space-y-4">{suggestions && suggestions.map((tip, index) => (<li key={index} className="flex items-start"><Lightbulb className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" /><span>{tip}</span></li>))}</ul></CardContent>
                          </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-950 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-800" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-800"><h2 className="text-xl font-semibold">Your AI-Generated Cover Letter</h2><Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}><XIcon className="h-4 w-4" /></Button></div>
            <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">{isGenerating ? (<div className="flex flex-col items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /><p className="mt-4">Generating your letter...</p></div>) : coverLetter.error ? (<div className="text-red-500 flex items-center"><AlertCircle className="inline h-4 w-4 mr-2"/>{coverLetter.error}</div>) : (<pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">{coverLetter.content}</pre>)}</div>
             <div className="p-4 border-t dark:border-gray-800 flex justify-end gap-2">
                <Button onClick={handleCopy} disabled={isGenerating || !!coverLetter.error} variant="secondary" className="w-28">{copyState === 'Copied!' ? <Check className="mr-2 h-4 w-4" /> : null}{copyState}</Button>
                <Button onClick={() => handleDownloadCoverLetter('pdf')} disabled={isGenerating || !!coverLetter.error} variant="outline">Download PDF</Button>
                <Button onClick={() => handleDownloadCoverLetter('docx')} disabled={isGenerating || !!coverLetter.error}>Download DOCX</Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}