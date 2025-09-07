'use client';

import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const SCRIPT_URL =  process.env.GOOGLE_FORM_URL;

const info = [
  { icon: <Mail className="h-5 w-5" />, label: 'Email', value: 'support@ResumeX.com' },
  { icon: <Phone className="h-5 w-5" />, label: 'Phone', value: '+91 9322946229' },
  { icon: <MapPin className="h-5 w-5" />, label: 'Address', value: 'Budhgaon, Sangli - 416304 ' },
];

export default function Contact() {
  console.log( process.env.GOOGLE_FORM_URL)
  const formRef = useRef(null);
  const [status, setStatus] = useState('');   // "" | "sending" | "sent" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      const res = await fetch(SCRIPT_URL, { method: 'POST', body: new FormData(formRef.current) });
      if (!res.ok) throw new Error('Network error');
      setStatus('sent');
      formRef.current.reset();
      setTimeout(() => setStatus(''), 5000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen w-full bg-background">
      {/* HERO */}
      <section className="container mx-auto px-4 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions? We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
        </p>
      </section>

      {/* GRID – same cards, same layout */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* INFO CARD – untouched */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Get in touch</CardTitle>
              <CardDescription>Reach us through any of the channels below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {info.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="text-blue-600">{item.icon}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* FORM CARD – same UI, new logic */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form and we’ll get back within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                ref={formRef}
                name="submit-to-google-sheet"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* hidden helper for Google */}
                <input type="hidden" name="form-source" value="ResumeX" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Question about my resume scan" required />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    className="min-h-[140px]"
                    required
                  />
                </div>

                {/* old-school status text (#msg) */}
                {status === 'sent' && (
                  <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully!</p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Try again.</p>
                )}

                <Button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}