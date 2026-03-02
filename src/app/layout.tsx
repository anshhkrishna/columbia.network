import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "columbia.network",
  description: "A webring for Columbia University students",
  icons: {
    icon: "/crest.png",
  },
  openGraph: {
    title: "columbia.network",
    description: "A webring for Columbia University students",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "columbia.network",
    description: "A webring for Columbia University students",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
