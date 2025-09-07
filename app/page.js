'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, BrainCircuit, ScanLine, Sparkles, UploadCloud, Zap, FileText } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Aurora bg */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />

      {/* HERO */}
      <section className="container relative z-10 mx-auto flex flex-col items-center px-4 pt-32 pb-24 text-center sm:pt-40 sm:pb-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span>Upload, Optimize, Get Hired!</span>
          {/* <span>Join 10 000+ users who landed interviews last month</span> */}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tighter text-foreground md:text-6xl lg:text-7xl">
          Land Your Dream Job, <br />
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Powered by AI.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Stop guessing. Our AI analyses your resume against any job description, giving instant, actionable feedback to beat the bots and impress recruiters.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild className="h-14 px-10 text-lg shadow-lg shadow-blue-500/20 hover:shadow-xl">
            <Link href="/analyze">
              Analyse My Resume <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-10 text-lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">✓ Free analysis &nbsp; ✓ No sign-up required</p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="container mx-auto px-4 py-20 sm:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Incredibly Simple. Incredibly Powerful.</h2>
          <p className="mt-4 text-muted-foreground">Get from resume to interview-ready in three simple steps.</p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* connector line */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-full -translate-y-1/2 md:block md:w-[calc(100%-4rem)] md:-translate-x-1/2">
            <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" strokeDasharray="8" className="stroke-border" /></svg>
          </div>

          {[
            { icon: UploadCloud, title: '1. Upload', desc: 'Securely upload your resume and the job description.' },
            { icon: Zap, title: '2. Analyse', desc: 'Our AI performs a deep scan in seconds.' },
            { icon: FileText, title: '3. Optimise', desc: 'Receive your report with actionable suggestions.' },
          ].map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-blue-100 dark:bg-blue-900/50">
                <s.icon className="h-7 w-7 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container mx-auto bg-secondary/30 px-4 py-20 sm:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Your Unfair Advantage</h2>
          <p className="mt-4 text-muted-foreground">We analyse resumes like a top-tier recruiter.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { icon: BrainCircuit, title: 'Write Like a Pro', desc: 'AI crafts compelling, recruiter-magnet bullet points.' },
            { icon: ScanLine, title: 'Beat the Bots', desc: 'Keyword analysis ensures you sail through any ATS.' },
            { icon: Sparkles, title: 'Uncover Hidden Gaps', desc: 'Smart suggestions to highlight strengths & fix misses.' },
          ].map((f, i) => (
            

            

            <Card key={i} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"> <CardHeader><div className="mx-auto bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full w-fit"><BrainCircuit className="h-8 w-8 text-blue-600 dark:text-blue-300" /></div><CardTitle className="mt-4">{f.title}</CardTitle></CardHeader> <CardContent><p className="text-gray-500 dark:text-gray-400">{f.desc}</p></CardContent> </Card>
          
          ))}
        </div>
      </section>
      {/* <Card key={i} className="group hover:-translate-y-1 hover:shadow-xl transition">
              <CardHeader className="items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <f.icon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                </div>
                <CardTitle className="mt-4 text-center">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card> */}

      {/* TESTIMONIALS  – – –  C O M M E N T E D  O U T */}
      {/*
      <section className="container mx-auto px-4 py-20 sm:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Loved by Job Seekers Worldwide</h2>
          <p className="mt-4 text-muted-foreground">What our users are saying.</p>
        </div>
        ...cards here...
      </section>
      */}

      {/* FAQ – CENTRED */}
      <section className="container mx-auto bg-secondary/30 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="mx-auto mt-10 max-w-3xl">
          {[
            { q: 'Is my data secure?', a: 'Yes. We use end-to-end encryption and never store your resume after the session.' },
            { q: 'Is this service really free?', a: 'The core analysis is 100 % free. Premium extras may come later.' },
            { q: 'What file types do you support?', a: 'PDF and Microsoft Word (.docx).' },
            { q: 'How does the AI work?', a: 'We use a large-language-model API trained on thousands of job descriptions and recruiter playbooks.' },
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FINAL CTA */}
      <section className="container mx-auto flex flex-col items-center px-4 py-20 text-center sm:py-28">
        <h2 className="text-3xl font-bold md:text-5xl">Ready to Land Your Next Interview?</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">Stop wondering if your resume is good enough—find out for sure.</p>
        <Button asChild size="lg" className="mt-8 h-16 px-12 text-xl shadow-lg shadow-blue-500/20 hover:shadow-xl">
          <Link href="/analyze">Get Your Free Analysis</Link>
        </Button>
      </section>
    </div>
  );
}