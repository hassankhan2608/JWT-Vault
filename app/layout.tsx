import './globals.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Vault | Professional JWT Secret Generator',
  description: 'Generate cryptographically secure JWT secrets with our modern, privacy-focused tool. Built with security in mind, featuring client-side processing and zero data storage.',
  keywords: ['JWT', 'security', 'generator', 'cryptography', 'web security', 'authentication'],
  authors: [{ name: 'StackBlitz' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jwt-vault.stackblitz.com',
    title: 'JWT Vault | Professional JWT Secret Generator',
    description: 'Generate cryptographically secure JWT secrets with our modern, privacy-focused tool',
    siteName: 'JWT Vault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Vault | Professional JWT Secret Generator',
    description: 'Generate cryptographically secure JWT secrets with our modern, privacy-focused tool',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/icon.png',
        sizes: '192x192',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#020817',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background"></div>
        {children}
      </body>
    </html>
  );
}