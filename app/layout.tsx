import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import Script from 'next/script'; // Bunu eklemeyi unutma

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'THE GOPNİK | Rus Sokak Dili Sözlüğü',
  description: 'Rusça argo, küfür ve sokak jargonu sözlüğü.',
  verification: {
    google: 'bNT4z4-DdRtGnADR-gQy0UsylH1YNbQtXeA-BqHkcq8',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        {/* Google Analytics Script'i */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YLWZWH0GC4');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}