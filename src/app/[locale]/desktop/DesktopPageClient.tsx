'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Download, Monitor, Cpu, Workflow, Bot, PencilLine, ShieldCheck, Wrench, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';
import type { DesktopFile } from '@/config/desktop';

type OS = 'windows' | 'mac' | 'linux' | 'other';

interface Props {
  locale: Locale;
  files: DesktopFile[];
  version: string;
  faq: { q: string; a: string }[];
}

const OS_NAME: Record<OS, string> = { windows: 'Windows', mac: 'macOS', linux: 'Linux', other: 'Windows' };

const FEATURES = [
  { icon: Wrench, title: '53+ Atomic PDF Tools', text: 'Merge, split, rotate, crop, compress, OCR, redact, watermark and more, all in one cockpit with zero configuration.' },
  { icon: Workflow, title: 'Visual Workflow Studio', text: 'Chain operations with a node-based graph, for example Deskew, OCR, Redact, Compress and Watermark in a single pipeline.' },
  { icon: Bot, title: 'Offline AI Copilot', text: 'Connect to local models through Ollama or LM Studio. Describe a task in plain language and approve every action before it runs.' },
  { icon: PencilLine, title: 'In-Place Text Editing', text: 'Click any text block on the canvas to change text, font or position. See results instantly and save with Ctrl+S.' },
  { icon: ShieldCheck, title: 'Local-First and Private', text: 'Your documents are processed on your own computer. No account and no file uploads.' },
  { icon: Monitor, title: 'Fast Desktop Experience', text: 'Hardware-accelerated viewer, real page thumbnails, multi-tab workspace and persistent pen and highlighter overlays.' },
];

// Agar dashboard.png / workflow.png ka size alag ho to width/height yahan badal dena
const SHOTS = [
  {
    src: '/images/desktop/dashboard.png',
    alt: 'PDFTara Studio dashboard with the toolbox of 53+ PDF tools',
    title: 'Toolbox with 53+ tools',
    text: 'Search and open any PDF operation instantly from one clean dashboard.',
    width: 1586,
    height: 992,
  },
  {
    src: '/images/desktop/workflow.png',
    alt: 'PDFTara Studio visual workflow studio with connected nodes for deskew, OCR, redact and compress',
    title: 'Visual Workflow Studio',
    text: 'Connect tools as nodes and run complete PDF pipelines in one click.',
    width: 1586,
    height: 992,
  },
];

const STEPS = {
  windows: ['Download the installer (or the portable version).', 'Open the file. If SmartScreen appears, click "More info" and then "Run anyway".', 'Follow the setup and launch PDFTara Studio.'],
  mac: ['Download the .dmg for your chip (Apple Silicon or Intel).', 'Open the .dmg and drag PDFTara Studio to Applications.', 'Right-click the app, choose "Open" and confirm the first time.'],
  linux: ['Download the AppImage or the .deb package.', 'AppImage: run "chmod +x" on the file, then double-click it. .deb: install with your package manager.', 'Launch PDFTara Studio from your applications menu.'],
};

export default function DesktopPageClient({ locale, files, version, faq }: Props) {
  const [os, setOs] = useState<OS>('other');
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    // Phone/tablet par desktop OS pehchanne ki zaroorat nahi
    if (ua.includes('android') || ua.includes('iphone') || ua.includes('ipad')) return;
    if (ua.includes('win')) setOs('windows');
    else if (ua.includes('mac')) setOs('mac');
    else if (ua.includes('linux') || ua.includes('x11')) setOs('linux');
  }, []);

  const primaryOs: Exclude<OS, 'other'> = os === 'other' ? 'windows' : os;
  const primaryFiles = files.filter((f) => f.os === primaryOs);
  const otherFiles = files.filter((f) => f.os !== primaryOs);

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1 pt-28 pb-20 overflow-x-hidden">
        {/* Hero */}
        <section className="container mx-auto px-4 text-center max-w-4xl" aria-labelledby="desktop-title">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[hsl(var(--color-primary)/0.2)] bg-[hsl(var(--color-primary)/0.08)] text-sm font-medium text-[hsl(var(--color-primary))]">
            <Cpu className="h-4 w-4" aria-hidden="true" /> Version {version} · Free
          </div>
          <h1 id="desktop-title" className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-5 text-[hsl(var(--color-foreground))]">
            PDFTara Studio <span className="text-gradient block mt-1">Desktop PDF Powerhouse</span>
          </h1>
          <p className="text-base sm:text-lg text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto mb-8 leading-relaxed">
            A free, local-first PDF app for Windows, Mac and Linux. 53+ tools, visual workflows, offline AI and in-place editing. Your files stay on your device.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {primaryFiles.map((f, i) => (
              <a
                key={f.id}
                href={`/download/${f.id}`}
                className={`inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl font-semibold transition-all hover:-translate-y-0.5 ${
                  i === 0
                    ? 'bg-[hsl(var(--color-primary))] text-white shadow-lg shadow-primary/25'
                    : 'border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))]'
                }`}
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                {i === 0 ? `Download for ${OS_NAME[os]}` : f.label}
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-[hsl(var(--color-muted-foreground))]">
            {primaryOs === 'mac' ? 'Not sure about your chip? Apple menu, then About This Mac.' : `Version ${version} · 64-bit`}
          </p>
        </section>

        {/* Screenshots */}
        <section className="container mx-auto px-4 mt-16 max-w-6xl" aria-labelledby="screens-title">
          <h2 id="screens-title" className="text-2xl sm:text-3xl font-bold text-center mb-3 text-[hsl(var(--color-foreground))]">
            See PDFTara Studio in action
          </h2>
          <p className="text-center text-sm sm:text-base text-[hsl(var(--color-muted-foreground))] mb-10 max-w-2xl mx-auto">
            A clean, fast desktop workspace built for real PDF work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHOTS.map((s) => (
              <figure key={s.src} className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-3 sm:p-4">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full h-auto rounded-xl border border-[hsl(var(--color-border))]"
                  loading="lazy"
                />
                <figcaption className="px-1 pt-4 pb-1">
                  <div className="font-bold text-[hsl(var(--color-foreground))]">{s.title}</div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))] mt-1">{s.text}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 mt-20" aria-labelledby="features-title">
          <h2 id="features-title" className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[hsl(var(--color-foreground))]">
            Everything you need to work with PDFs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))]">
                <div className="w-11 h-11 rounded-xl bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-2 text-[hsl(var(--color-foreground))]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* All downloads */}
        <section id="downloads" className="container mx-auto px-4 mt-20 scroll-mt-24" aria-labelledby="downloads-title">
          <h2 id="downloads-title" className="text-2xl sm:text-3xl font-bold text-center mb-3 text-[hsl(var(--color-foreground))]">
            Download PDFTara Studio
          </h2>
          <p className="text-center text-sm text-[hsl(var(--color-muted-foreground))] mb-10">
            Version {version} · Free for Windows, macOS and Linux
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...primaryFiles, ...otherFiles].map((f) => (
              <a
                key={f.id}
                href={`/download/${f.id}`}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] hover:border-[hsl(var(--color-primary))] hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center shrink-0">
                  <Download className="h-5 w-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-[hsl(var(--color-foreground))]">{f.label}</div>
                  <div className="text-xs text-[hsl(var(--color-muted-foreground))]">{f.note} · {f.size}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Install steps */}
        <section className="container mx-auto px-4 mt-20 max-w-5xl" aria-labelledby="install-title">
          <h2 id="install-title" className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[hsl(var(--color-foreground))]">
            How to install
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(['windows', 'mac', 'linux'] as const).map((k) => (
              <div key={k} className="p-6 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))]">
                <h3 className="font-bold mb-3 text-[hsl(var(--color-foreground))]">{OS_NAME[k]}</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                  {STEPS[k].map((s) => <li key={s}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 mt-20 max-w-3xl" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[hsl(var(--color-foreground))]">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={item.q} className="rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))]">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[hsl(var(--color-foreground))]"
                  aria-expanded={open === i}
                >
                  {item.q}
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {/* Jawab hamesha HTML me rehta hai, taaki Google aur AI crawlers padh sakein */}
                <p className={`px-5 pb-4 text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))] ${open === i ? '' : 'hidden'}`}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}