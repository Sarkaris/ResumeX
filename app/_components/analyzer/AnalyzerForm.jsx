'use client';

import { useActionState, useState, useRef } from 'react';
import { analyzeResumeAction } from '@/app/actions';
import { SubmitButton } from './SubmitButton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUp, FileText, ClipboardPaste, AlertCircle, CheckCircle } from 'lucide-react';

// Custom scrollbar styles
const ScrollBarStyles = () => (
  <style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #a5b4fc; border-radius: 9999px; }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #4f46e5; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #818cf8; }
  `}</style>
);

export function AnalyzerForm() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [state, formAction] = useActionState(analyzeResumeAction, { success: true, message: '' });

  const fileInputRef = useRef(null);
  const MAX_CHARS = 3500;

  // **UPDATED** File handler with 5MB size check
  const handleFileChange = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File must be 5MB or less.');
      return;
    }
    if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setResumeFile(file);
    } else {
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      alert('Please upload a valid PDF or DOCX file.');
    }
  };

  const handleJdChange = (e) => {
    if (e.target.value.length <= MAX_CHARS) setJobDescription(e.target.value);
  };

  const handleDragEvents = (e, over) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(over); };
  const handleDrop = (e) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (fileInputRef.current) fileInputRef.current.files = e.dataTransfer.files;
      handleFileChange(file);
    }
  };
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setJobDescription(text.slice(0, MAX_CHARS));
  };

  return (
    <>
      <ScrollBarStyles />
      <form action={formAction} className="space-y-8">
        {/* Progress Stepper */}
        <div className="mx-auto mb-8 flex w-full max-w-xs items-center justify-between text-xs text-muted-foreground">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${resumeFile ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                {resumeFile ? <CheckCircle className="h-4 w-4" /> : <span>1</span>}
            </div>
            <div className="h-0.5 flex-1 bg-gray-200 dark:bg-gray-700 mx-2" />
            <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${jobDescription.length > 30 ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                {jobDescription.length > 30 ? <CheckCircle className="h-4 w-4" /> : <span>2</span>}
            </div>
        </div>

        {/* **UPDATED** Fully responsive Flexbox layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-[90%] mx-auto">
          {/* ----- LEFT PANEL: RESUME DROP ZONE ----- */}
          <div className="w-full lg:w-1/2 ">
           <div
  onDragOver={(e) => handleDragEvents(e, true)}
  onDragLeave={(e) => handleDragEvents(e, false)}
  onDrop={handleDrop}
  className={`group relative flex h-full min-h-[24rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 sm:p-8
    ${isDragOver ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20'
                 : 'border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50'}
    hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20`}
>
              <input ref={fileInputRef} id="resume-upload" name="resume" type="file" accept=".pdf,.docx" required className="sr-only" onChange={(e) => handleFileChange(e.target.files?.[0])} />
              {resumeFile ? (
                <div className="flex flex-col items-center">
                  <FileText className="h-16 w-16 text-green-500" />
                  <p className="mt-4 text-lg font-semibold">{resumeFile.name}</p>
                  <p className="text-sm text-muted-foreground">{Math.round(resumeFile.size / 1024)} KB</p>
                  <Button type="button" variant="ghost" size="sm" className="mt-4" onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}>Remove</Button>
                </div>
              ) : (
                <label htmlFor="resume-upload" className="cursor-pointer ">
                  <FileUp className={`h-16 w-16 text-indigo-500 transition-transform group-hover:scale-110 mx-auto `} />
                  <p className="mt-4 text-lg font-semibold">Drop your resume here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">PDF or DOCX, up to 5 MB</p>
                </label>
              )}
            </div>
          </div>
          {/* ----- RIGHT PANEL: JOB DETAILS ----- */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-5">
            <div>
              <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title</Label>
              <Input id="jobTitle" name="jobTitle" placeholder="e.g. Senior Software Engineer" className="mt-1" required />
            </div>
            <div className="flex flex-col flex-grow ">
              <div className="mb-1 flex items-center justify-between">
                <Label htmlFor="jd" className="text-sm font-medium">Job Description</Label>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="xs" onClick={handlePaste} className="gap-1 text-xs"><ClipboardPaste className="h-3 w-3" /> Paste</Button>
                  <span className="text-xs text-muted-foreground ">{jobDescription.length}/{MAX_CHARS}</span>
                </div>
              </div>
              <Textarea id="jd" name="jd" value={jobDescription}  onChange={handleJdChange} placeholder="Paste the full job description here..." className="flex-grow h-full min-h-[18rem] resize-none pr-2 custom-scrollbar overflow-scroll max-h-[40vh]" required />
            </div>
          </div>
        </div>
        
        {/* ----- SUBMISSION ROW ----- */}
        <div className="flex flex-col-reverse items-center gap-4 pt-4 sm:flex-row sm:justify-between">
          <div className="h-10">
            {!state.success && state.message && (<div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"><AlertCircle className="h-4 w-4" />{state.message}</div>)}
          </div>
          <SubmitButton />
        </div>
      </form>
    </>
  );
}