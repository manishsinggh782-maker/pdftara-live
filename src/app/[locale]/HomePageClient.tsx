'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Zap,
  Wrench,
  Lock,
  Sparkles,
  Edit,
  FileImage,
  FolderOpen,
  Settings,
  ShieldCheck,
  Star,
  LayoutGrid,
  Monitor,
  Download,
  MessageCircle,
  Clock3,
  PenLine,
  Megaphone,
  Globe2,
  ArrowUpRight,
} from 'lucide-react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  getAllTools,
  getToolsByCategory,
  getPopularTools,
} from '@/config/tools';
import { type Locale } from '@/lib/i18n/config';
import { type ToolCategory } from '@/types/tool';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<
    string,
    { title: string; description: string }
  >;
}

export default function HomePageClient({
  locale,
  localizedToolContent,
}: HomePageClientProps) {
  const t = useTranslations();

  const allTools = getAllTools();
  const popularTools = getPopularTools();

  const features = [
    {
      icon: ShieldCheck,
      titleKey: 'home.features.privacy.title',
      descriptionKey: 'home.features.privacy.description',
      color: 'text-green-500',
    },
    {
      icon: Zap,
      titleKey: 'home.features.free.title',
      descriptionKey: 'home.features.free.description',
      color: 'text-yellow-500',
    },
    {
      icon: Wrench,
      titleKey: 'home.features.powerful.title',
      descriptionKey: 'home.features.powerful.description',
      color: 'text-blue-500',
    },
  ];

  const categoryIcons: Record<ToolCategory, typeof Edit> = {
    'edit-annotate': Edit,
    'convert-to-pdf': FileImage,
    'convert-from-pdf': FileImage,
    'organize-manage': FolderOpen,
    'optimize-repair': Settings,
    'secure-pdf': ShieldCheck,
  };

  const categoryTranslationKeys: Record<ToolCategory, string> = {
    'edit-annotate': 'editAnnotate',
    'convert-to-pdf': 'convertToPdf',
    'convert-from-pdf': 'convertFromPdf',
    'organize-manage': 'organizeManage',
    'optimize-repair': 'optimizeRepair',
    'secure-pdf': 'securePdf',
  };

  const categoryOrder: ToolCategory[] = [
    'edit-annotate',
    'convert-to-pdf',
    'convert-from-pdf',
    'organize-manage',
    'optimize-repair',
    'secure-pdf',
  ];

  // WhatsApp Contact
  const whatsappNumber = '917310071103';

  const whatsappMessage = encodeURIComponent(
    'Hello PDFTara Team, I am interested in Guest Post Publishing, Contextual Backlinks, Sponsored Articles and Brand Promotion opportunities on PDFTara. Please share your publishing guidelines, pricing and available options.'
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main
        id="main-content"
        className="flex-1 relative"
        tabIndex={-1}
      >
        {/* Hero Section */}
        <section
          className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28"
          aria-labelledby="hero-title"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(var(--color-primary)/0.2)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />

            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[hsl(var(--color-accent)/0.2)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

            <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-[hsl(var(--color-secondary)/0.3)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[hsl(var(--color-background)/0.8)] border border-[hsl(var(--color-primary)/0.2)] shadow-sm backdrop-blur-md transition-all hover:bg-[hsl(var(--color-background))]">
                <Sparkles
                  className="h-4 w-4 text-[hsl(var(--color-primary))]"
                  aria-hidden="true"
                />

                <span className="text-sm font-medium text-[hsl(var(--color-primary))]">
                  {t('common.brand')}
                </span>
              </div>

              <h1
                id="hero-title"
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="text-[hsl(var(--color-foreground))]">
                  {t('home.hero.title')}{' '}
                </span>

                <span className="text-gradient block mt-1 pb-2">
                  {t('home.hero.highlight')}
                </span>
              </h1>

              <p className="text-lg text-[hsl(var(--color-muted-foreground))] mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('home.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
                <Link href={`/${locale}/studio`}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="h-11 px-7 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 gap-2"
                  >
                    <Sparkles
                      className="h-4 w-4"
                      aria-hidden="true"
                    />

                    <span>
                      {locale === 'zh'
                        ? '进入 Studio 工作台'
                        : 'Open PDF Studio'}
                    </span>

                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white leading-none">
                      NEW
                    </span>
                  </Button>
                </Link>

                <Link href={`/${locale}/tools`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-11 px-6 text-base transition-all hover:-translate-y-0.5 gap-2 bg-[hsl(var(--color-card)/0.6)] backdrop-blur-sm"
                  >
                    <LayoutGrid
                      className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]"
                      aria-hidden="true"
                    />

                    <span>{t('home.hero.cta')}</span>
                  </Button>
                </Link>

                <div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] bg-[hsl(var(--color-background)/0.5)] px-4 py-2 rounded-full border border-[hsl(var(--color-border))] backdrop-blur-sm">
                  <Lock
                    className="h-4 w-4 text-green-500"
                    aria-hidden="true"
                  />

                  <span>{t('common.footer.privacyBadge')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="py-12 relative z-20"
          aria-label="Features"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <Card
                    key={index}
                    className="p-6 text-center glass-card border-0 hover:-translate-y-1 transition-transform duration-300"
                    hover={false}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(var(--color-primary)/0.1)] mb-4 text-[hsl(var(--color-primary))]">
                      <Icon
                        className={`h-6 w-6 ${feature.color}`}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-[hsl(var(--color-foreground))] mb-2">
                      {t(feature.titleKey)}
                    </h3>

                    <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Desktop App Promo Section */}
        <section
          className="py-10"
          aria-labelledby="desktop-promo-heading"
        >
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--color-primary)/0.2)] bg-gradient-to-br from-[hsl(var(--color-primary)/0.12)] via-[hsl(var(--color-background))] to-[hsl(var(--color-accent)/0.12)] p-6 sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
                {/* Text */}
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[hsl(var(--color-primary)/0.1)] border border-[hsl(var(--color-primary)/0.2)]">
                    <Monitor
                      className="h-4 w-4 text-[hsl(var(--color-primary))]"
                      aria-hidden="true"
                    />

                    <span className="text-xs sm:text-sm font-medium text-[hsl(var(--color-primary))]">
                      Desktop App · Windows, Mac &amp; Linux
                    </span>
                  </div>

                  <h2
                    id="desktop-promo-heading"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--color-foreground))] mb-3 leading-tight"
                  >
                    PDFTara Studio: our own desktop app
                  </h2>

                  <p className="text-sm sm:text-base text-[hsl(var(--color-muted-foreground))] leading-relaxed mb-6">
                    53+ PDF tools, visual workflow studio, offline AI
                    copilot and in-place text editing. Free, private and
                    built for your computer. Your files never leave your
                    device.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Link
                      href={`/${locale}/desktop`}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto h-12 px-7 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 gap-2"
                      >
                        <span>View Details</span>

                        <ArrowRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </Button>
                    </Link>

                    <Link
                      href={`/${locale}/desktop#downloads`}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto h-12 px-6 text-base gap-2"
                      >
                        <Download
                          className="h-5 w-5"
                          aria-hidden="true"
                        />

                        <span>Download</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="order-1 lg:order-2">
                  <Link
                    href={`/${locale}/desktop`}
                    aria-label="View PDFTara Studio desktop app details"
                  >
                    <Image
                      src="/images/desktop/home.png"
                      alt="PDFTara Studio desktop PDF editor showing page thumbnails, toolbar and a financial report open in the viewer"
                      width={1586}
                      height={992}
                      sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
                      className="w-full h-auto rounded-xl sm:rounded-2xl border border-[hsl(var(--color-border))] shadow-2xl shadow-primary/10 transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Guest Post + Backlink Promo Section */}
        <section
          className="py-3 sm:py-4"
          aria-labelledby="guest-post-heading"
        >
          <div className="container mx-auto px-4">
            <div className="relative isolate overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-xl dark:border-blue-500/20 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
              {/* Decorative Background */}
              <div
                className="pointer-events-none absolute -top-24 -right-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative z-10 p-3 sm:p-4 lg:px-6 lg:py-4">
                <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] md:gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)] lg:gap-6">
                  {/* Left Content */}
                  <div className="min-w-0">
                    {/* Top Badge */}
                    <div className="mb-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 dark:border-blue-400/20 dark:bg-blue-500/15">
                      <Megaphone
                        className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />

                      <span className="text-[11px] font-bold leading-4 text-blue-700 dark:text-blue-300">
                        GUEST POST &amp; BACKLINK OPPORTUNITIES
                      </span>
                    </div>

                    <h2
                      id="guest-post-heading"
                      className="mb-1.5 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl dark:text-white"
                    >
                      Advertise With{' '}
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        PDFTara
                      </span>
                    </h2>

                    <p className="mb-1.5 text-sm font-bold leading-5 text-slate-700 sm:text-base sm:leading-snug dark:text-slate-200">
                      Guest Posts, Contextual Backlinks &amp; Sponsored
                      Articles
                    </p>

                    <p className="mb-2.5 max-w-2xl text-sm leading-5 text-slate-600 dark:text-slate-400">
                      Promote your website, brand or business through
                      publishing opportunities on PDFTara. Contact our
                      team to discuss guest posts, relevant contextual
                      backlink placements, sponsored content and
                      collaboration opportunities.
                    </p>

                    {/* Services Grid */}
                    <div className="mb-2.5 grid grid-cols-1 gap-1.5 min-[360px]:grid-cols-2">
                      {/* Guest Posts */}
                      <div className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-2 py-2 transition-all hover:-translate-y-0.5 hover:shadow-md sm:px-2.5 dark:border-white/10 dark:bg-white/5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/15">
                          <PenLine
                            className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0">
                          <span className="block text-xs font-bold leading-4 text-slate-800 sm:text-sm sm:leading-5 dark:text-slate-200">
                            Guest Post Publishing
                          </span>

                          <span className="block text-xs leading-4 text-slate-500 dark:text-slate-400">
                            Publish quality articles
                          </span>
                        </div>
                      </div>

                      {/* Backlinks */}
                      <div className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-2 py-2 transition-all hover:-translate-y-0.5 hover:shadow-md sm:px-2.5 dark:border-white/10 dark:bg-white/5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/15">
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-green-600 dark:text-green-400"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0">
                          <span className="block text-xs font-bold leading-4 text-slate-800 sm:text-sm sm:leading-5 dark:text-slate-200">
                            Contextual Backlinks
                          </span>

                          <span className="block text-xs leading-4 text-slate-500 dark:text-slate-400">
                            Relevant link placements
                          </span>
                        </div>
                      </div>

                      {/* Sponsored Articles */}
                      <div className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-2 py-2 transition-all hover:-translate-y-0.5 hover:shadow-md sm:px-2.5 dark:border-white/10 dark:bg-white/5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-500/15">
                          <Megaphone
                            className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0">
                          <span className="block text-xs font-bold leading-4 text-slate-800 sm:text-sm sm:leading-5 dark:text-slate-200">
                            Sponsored Articles
                          </span>

                          <span className="block text-xs leading-4 text-slate-500 dark:text-slate-400">
                            Promote your business
                          </span>
                        </div>
                      </div>

                      {/* Brand Promotion */}
                      <div className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-2 py-2 transition-all hover:-translate-y-0.5 hover:shadow-md sm:px-2.5 dark:border-white/10 dark:bg-white/5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-500/15">
                          <Globe2
                            className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0">
                          <span className="block text-xs font-bold leading-4 text-slate-800 sm:text-sm sm:leading-5 dark:text-slate-200">
                            Brand Promotion
                          </span>

                          <span className="block text-xs leading-4 text-slate-500 dark:text-slate-400">
                            Website collaboration
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact PDFTara for guest posts and backlink opportunities on WhatsApp"
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-bold leading-5 text-white shadow-md shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-green-500/30 sm:w-auto sm:px-4"
                    >
                      <MessageCircle
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />

                      <span className="min-w-0 text-center">
                        Get Guest Post &amp; Backlink Details
                      </span>

                      <ArrowUpRight
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    </a>

                    <p className="mt-1.5 text-xs leading-4 text-slate-500 dark:text-slate-400">
                      Message us directly on WhatsApp for publishing
                      guidelines, pricing and availability.
                    </p>
                  </div>

                  {/* Right Contact Card */}
                  <div className="relative min-w-0">
                    <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-lg sm:p-4 dark:border-white/10 dark:bg-slate-800">
                      {/* Contact Icon + Business Label */}
                      <div className="mb-2 flex items-center justify-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/15">
                          <MessageCircle
                            className="h-5 w-5 text-[#25D366]"
                            aria-hidden="true"
                          />
                        </div>

                        <span className="inline-flex min-w-0 items-center gap-1.5 text-[11px] font-bold uppercase leading-4 tracking-wide text-blue-600 dark:text-blue-400">
                          <Globe2
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          Business Partnerships
                        </span>
                      </div>

                      <h3 className="mb-1 text-lg font-extrabold leading-tight text-slate-900 lg:text-xl dark:text-white">
                        Interested? Let&apos;s Connect!
                      </h3>

                      <p className="mb-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                        Let&apos;s discuss your guest post and backlink
                        publishing requirements.
                      </p>

                      {/* Contact Number */}
                      <div className="mb-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 dark:border-white/10 dark:bg-slate-700/60">
                        <p className="text-[11px] font-bold uppercase leading-4 tracking-wider text-slate-500 dark:text-slate-400">
                          WhatsApp Contact
                        </p>

                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 max-w-full items-center justify-center text-xl font-extrabold leading-tight text-slate-900 transition-colors hover:text-green-600 lg:text-2xl dark:text-white dark:hover:text-green-400"
                        >
                          +91 73100 71103
                        </a>
                      </div>

                      {/* Availability */}
                      <div className="mb-2 flex items-center justify-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2 py-1.5 text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>

                        <Clock3
                          className="h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />

                        <span className="text-xs font-bold leading-4">
                          WhatsApp Contact · 24/7
                        </span>
                      </div>

                      {/* Contact Button */}
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat with PDFTara on WhatsApp"
                        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold leading-5 text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 dark:bg-blue-600"
                      >
                        <MessageCircle
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />

                        <span>Chat on WhatsApp</span>

                        <ArrowUpRight
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      </a>

                      <p className="mt-1.5 text-xs leading-4 text-slate-400 dark:text-slate-500">
                        PDFTara · Guest Post &amp; Backlink Publishing
                      </p>
                    </div>
                  </div>
                </div>

                {/* Publishing Note */}
                <div className="relative mt-2.5 border-t border-blue-200/70 pt-2 dark:border-white/10">
                  <p className="text-center text-xs leading-4 text-slate-500 dark:text-slate-400">
                    All submissions are subject to editorial review,
                    content relevance and publishing guidelines.
                    Sponsored links are handled in accordance with
                    applicable search engine guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section
          className="py-16 bg-[hsl(var(--color-muted)/0.5)]"
          aria-labelledby="popular-tools-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[hsl(var(--color-primary)/0.1)] border border-[hsl(var(--color-primary)/0.2)]">
                <Star
                  className="h-4 w-4 text-[hsl(var(--color-primary))]"
                  aria-hidden="true"
                />

                <span className="text-sm font-medium text-[hsl(var(--color-primary))]">
                  {t('home.popularTools.badge')}
                </span>
              </div>

              <h2
                id="popular-tools-heading"
                className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-3"
              >
                {t('home.popularTools.title')}
              </h2>

              <p className="text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto text-base">
                {t('home.popularTools.description')}
              </p>
            </div>

            <ToolGrid
              tools={popularTools}
              locale={locale}
              localizedToolContent={localizedToolContent}
            />
          </div>
        </section>

        {/* Featured Tools Section */}
        <section
          className="py-16"
          aria-labelledby="featured-tools-heading"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div className="max-w-2xl">
                <h2
                  id="featured-tools-heading"
                  className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-2"
                >
                  {t(
                    `home.categories.${categoryTranslationKeys['organize-manage']}`
                  )}
                </h2>

                <p className="text-[hsl(var(--color-muted-foreground))] text-base">
                  {t(
                    `home.categoriesDescription.${categoryTranslationKeys['organize-manage']}`
                  )}
                </p>
              </div>

              <Link href={`/${locale}/tools`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="group"
                >
                  {t('common.navigation.tools')}

                  <ArrowRight
                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </div>

            <ToolGrid
              tools={getToolsByCategory('organize-manage').slice(0, 8)}
              locale={locale}
              localizedToolContent={localizedToolContent}
            />
          </div>
        </section>

        {/* Tool Categories Section */}
        <section
          className="py-16 bg-[hsl(var(--color-muted)/0.3)]"
          aria-labelledby="categories-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2
                id="categories-heading"
                className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-3"
              >
                {t('home.categoriesSection.title')}
              </h2>

              <p className="text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto text-base">
                {t('home.categoriesSection.description', {
                  count: allTools.length,
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryOrder.map((category) => {
                const categoryTools = getToolsByCategory(category);
                const Icon = categoryIcons[category];

                const categoryName = t(
                  `home.categories.${categoryTranslationKeys[category]}`
                );

                const categoryDescription = t(
                  `home.categoriesDescription.${categoryTranslationKeys[category]}`
                );

                return (
                  <Link
                    key={category}
                    href={`/${locale}/tools?category=${category}`}
                    className="group"
                  >
                    <Card className="p-5 h-full glass-card hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-[hsl(var(--color-border)/0.6)]">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon
                            className="h-5 w-5 text-[hsl(var(--color-primary))]"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base text-[hsl(var(--color-foreground))] mb-1 group-hover:text-[hsl(var(--color-primary))] transition-colors">
                            {categoryName}
                          </h3>

                          <p className="text-xs text-[hsl(var(--color-muted-foreground))] line-clamp-2 mb-2">
                            {categoryDescription}
                          </p>

                          <div className="flex items-center text-xs font-medium text-[hsl(var(--color-primary))]">
                            <span className="bg-[hsl(var(--color-primary)/0.1)] px-2 py-0.5 rounded-md">
                              {t('home.categoriesSection.toolsCount', {
                                count: categoryTools.length,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          className="py-16"
          aria-label="Statistics"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[hsl(var(--color-border))]">
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  {allTools.length}+
                </div>

                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.pdfTools')}
                </div>
              </div>

              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  100%
                </div>

                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.freeToUse')}
                </div>
              </div>

              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  9
                </div>

                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.languages')}
                </div>
              </div>

              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  0
                </div>

                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.filesUploaded')}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}