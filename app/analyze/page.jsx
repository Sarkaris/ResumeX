import { AnalyzerForm } from "@/app/_components/analyzer/AnalyzerForm";

export default function AnalyzePage() {
  return (
    <div className="container flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50">
            Analyze Your Fit
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Upload your resume and paste the job description to get started.
          </p>
        </div>
        
        <AnalyzerForm />

      </div>
    </div>
  );
}