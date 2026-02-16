import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { initContentTypeRegistry } from '@optimizely/cms-sdk';
import { initReactComponentRegistry } from '@optimizely/cms-sdk/react/server';

// Import components and content types
import TestPage, { TestPageContentType } from '@/components/TestPage';
import FarhansComponent, { FarhansComponentContentType } from '@/components/FarhansComponent';
import BrandPortalPage, { BrandPortalPageContentType } from '@/components/BrandPortalPage';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Register ONLY our custom content types (no conflicts with CMS defaults)
// TestPage is our custom page type
// FarhansComponent is our custom content block
// BrandPortalPage is our brand portal homepage
initContentTypeRegistry([
  TestPageContentType,
  FarhansComponentContentType,
  BrandPortalPageContentType,
]);

// Register React components (for rendering)
initReactComponentRegistry({
  resolver: {
    TestPage,
    FarhansComponent,
    BrandPortalPage,
  },
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Brand Portal',
  description: 'Brand assets and guidelines',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
