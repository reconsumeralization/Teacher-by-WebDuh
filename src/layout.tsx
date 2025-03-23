import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"
import { FlippableStateProvider } from "@/hooks/use-flippable-state"
import { AssistantProvider } from "@/contexts/assistant-context"
import { BackgroundProvider } from "@/contexts/background-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const title = "Teacher by WebDuh - AI-Powered Educational Platform"
const description = "Empowering education through AI, eliminating inequality in access to education, and accelerating human development with personalized learning experiences."

export const metadata: Metadata = {
  title,
  description,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
    siteName: 'Teacher by WebDuh',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Teacher by WebDuh - AI-Powered Education Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  authors: [{ name: 'WebDuh - Designs Unite Humanity' }],
  keywords: [
    'AI education',
    'personalized learning',
    'educational technology',
    'lifelong learning',
    'educational equality',
    'WebDuh',
    'Teacher AI'
  ],
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundProvider>
            <AssistantProvider>
              <FlippableStateProvider>
                <ClientLayout>{children}</ClientLayout>
              </FlippableStateProvider>
            </AssistantProvider>
          </BackgroundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'