import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}