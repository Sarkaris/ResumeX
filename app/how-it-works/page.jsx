'use client';

import Link from 'next/link';
import { ArrowRight, Upload, FileText, Sparkles, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/* ----------  DATA  ---------- */
const steps = [
  {
    Icon: Upload,
    title: 'Upload your resume',
    desc: 'Drop your current PDF or paste the text—no account needed.',
  },
  {
    Icon: FileText,
    title: 'Paste the job description',
    desc: 'We compare your resume against the exact role you want.',
  },
  {
    Icon: Sparkles,
    title: 'AI scans & scores',
    desc: 'Our engine extracts keywords, skills, ATS filters and gives you a match score.',
  },
  {
    Icon: Download,
    title: 'Get actionable feedback',
    desc: 'Receive section-by-section tips, missing keywords, and a polished cover letter.',
  },
];

const perks = [
  'ATS-friendly keyword suggestions',
  'Real-time match score',
  'Cover-letter generator',
  'Unlimited scans',
  'Export reports (PDF / DOCX)',
];

/* ----------  PAGE  ---------- */
export default function HowItWorks() {
  return (
    <main className="min-h-screen w-full bg-background">
      {/*  HERO  */}
      <section className="container mx-auto px-4 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          How <span className="text-blue-600">ResumeX</span> works
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Four simple steps stand between you and a resume that lands interviews.
        </p>
      </section>

      {/*  STEPS  */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <Card
              key={step.title}
              className="relative flex flex-col items-center text-center p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              {/* subtle connector (desktop) */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-border" />
              )}

              <CardHeader className="!pb-2">
                <step.Icon className="h-10 w-10 text-blue-600 mx-auto" />
              </CardHeader>
              <CardTitle className="text-lg md:text-xl">{step.title}</CardTitle>
              <CardDescription className="mt-2">{step.desc}</CardDescription>
            </Card>
          ))}
        </div>
      </section>

      {/*  PERKS  */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Everything you get&nbsp;–&nbsp;at a glance
        </h2>
        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {perks.map((p) => (
            <div key={p} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
              <span className="text-sm md:text-base">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/*  CTA  */}
      <section className="container mx-auto px-4 pb-20 text-center">
        <Button asChild size="lg">
          <Link href="/analyze">
            Try it now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  );
}