import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n/config';
import DesktopPageClient from './DesktopPageClient';
import { DESKTOP_FILES, VERSION } from '@/config/desktop';

// Tera asli domain (www ke saath). Aakhir me "/" nahi, taaki double slash na bane.
const SITE = 'https://www.pdftara.com';

// Static export ke liye zaroori hai (tere next.config me output: 'export' hai)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const FAQ = [
  { q: 'Is PDFTara Studio free?', a: 'Yes. PDFTara Studio is free to download and use, with no registration and no hidden costs.' },
  { q: 'Are my files uploaded anywhere?', a: 'No. PDFTara Studio is local-first. Your PDF files are processed on your own computer and are not uploaded to any server.' },
  { q: 'Which operating systems are supported?', a: 'Windows 10 and 11 (64-bit), macOS on Apple Silicon and Intel, and Linux (AppImage and .deb).' },
  { q: 'Does PDFTara Studio work offline?', a: 'Yes. The PDF tools run on your device. The optional AI Copilot can connect to locally hosted models such as Ollama or LM Studio.' },
  { q: 'Why does Windows or macOS show a security warning?', a: 'The app is not yet code-signed. On Windows choose "More info" and then "Run anyway". On macOS right-click the app, choose "Open", then confirm.' },
  { q: 'How do I know if my Mac is Apple Silicon or Intel?', a: 'Click the Apple menu, choose "About This Mac" and check the Chip or Processor line.' },
];

const TITLE = 'Download PDFTara Studio: Free Desktop PDF Editor for Windows, Mac & Linux';
const DESCRIPTION =
  'Download PDFTara Studio, a free and private desktop PDF app with 53+ tools, visual workflow studio, offline AI copilot and in-place text editing. For Windows, macOS and Linux.';

const OG_IMAGE = `${SITE}/images/desktop/home.png`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `${SITE}/${locale}/desktop/`;

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${SITE}/${l}/desktop/`;
  languages['x-default'] = `${SITE}/en/desktop/`;

  return {
    metadataBase: new URL(SITE),
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
      'PDFTara Studio',
      'desktop PDF editor',
      'free PDF editor',
      'offline PDF editor',
      'PDF editor for Windows',
      'PDF editor for Mac',
      'PDF editor for Linux',
      'private PDF editor',
      'PDF workflow automation',
      'AI PDF assistant',
      'download PDF tools',
    ],
    alternates: { canonical: url, languages },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url,
      siteName: 'PDFTara',
      type: 'website',
      locale,
      images: [
        {
          url: OG_IMAGE,
          width: 1586,
          height: 992,
          alt: 'PDFTara Studio desktop PDF editor interface',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: TITLE,
      description: DESCRIPTION,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function DesktopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const url = `${SITE}/${locale}/desktop/`;

  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDFTara Studio',
    alternateName: 'PDFTara Desktop',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'PDF Editor',
    operatingSystem: 'Windows 10, Windows 11, macOS, Linux',
    softwareVersion: VERSION,
    description: DESCRIPTION,
    url,
    downloadUrl: `${SITE}/download/windows`,
    image: OG_IMAGE,
    screenshot: [
      `${SITE}/images/desktop/home.png`,
      `${SITE}/images/desktop/dashboard.png`,
      `${SITE}/images/desktop/workflow.png`,
    ],
    featureList: [
      '53+ PDF tools',
      'Visual node-based workflow studio',
      'Offline AI copilot with Ollama and LM Studio',
      'In-place PDF text editing',
      'Local-first processing, no file uploads',
      'Multi-tab workspace',
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PDFTara',
      url: SITE,
      logo: `${SITE}/images/logo.png`,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/${locale}/` },
      { '@type': 'ListItem', position: 2, name: 'PDFTara Studio Desktop', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <DesktopPageClient
        locale={locale as Locale}
        files={DESKTOP_FILES}
        version={VERSION}
        faq={FAQ}
      />
    </>
  );
}