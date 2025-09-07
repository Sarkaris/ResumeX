'use client';
import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud, BrainCircuit, Sparkles, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { label: 'Uploading',  icon: UploadCloud, color: 'bg-blue-600' },
  { label: 'Analyzing',  icon: BrainCircuit, color: 'bg-indigo-600' },
  { label: 'Generating', icon: Sparkles, color: 'bg-purple-600' },
  { label: 'Finalizing', icon: Loader2, color: 'bg-green-600' },
];

export function SubmitButton() {
  const { pending } = useFormStatus();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!pending) {
      setProgress(0); // reset when request finishes
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setProgress(i);
      } else {
        clearInterval(interval); // stop at last step
      }
    }, 500); // 1.5s per step

    return () => clearInterval(interval);
  }, [pending]);

  if (!pending)
    return (
      <Button
        type="submit"
        size="lg"
        className="w-full max-md:max-w-[60%] sm:w-auto px-8 text-lg shadow-lg shadow-indigo-500/20 hover:shadow-xl"
      >
        Analyze My Fit
      </Button>
    );

  const current = steps[progress] ?? steps[steps.length - 1];

  return (
    <Button
      type="submit"
      size="lg"
      disabled
      className={cn(
        'w-full sm:w-auto px-8 text-lg relative overflow-hidden max-md:max-w-[60%]',
        current.color,
        'text-white shadow-xl'
      )}
    >
      <span className="absolute inset-0 bg-white/10" />
      <span className="absolute -inset-full top-0 left-1/2 -translate-x-1/2 animate-[spin_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <current.icon className="mr-2 h-5 w-5 animate-pulse" />
      {current.label}…
    </Button>
  );
}
