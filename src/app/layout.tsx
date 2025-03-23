import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Teacher by WebDuh - AI-Powered Educational Platform",
  description: "Empowering education through AI, eliminating inequality in access to education, and accelerating human development with personalized learning experiences.",
  keywords: [
    "AI education",
    "personalized learning",
    "educational technology",
    "adaptive learning",
    "online education",
    "teacher tools",
    "student learning",
    "educational AI",
    "learning platform",
    "education innovation"
  ],
  authors: [{ name: "WebDuh" }],
  creator: "WebDuh",
  publisher: "WebDuh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://teacher.webduh.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://teacher.webduh.com",
    title: "Teacher by WebDuh - AI-Powered Educational Platform",
    description: "Empowering education through AI, eliminating inequality in access to education, and accelerating human development with personalized learning experiences.",
    siteName: "Teacher by WebDuh",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Teacher by WebDuh - AI-Powered Educational Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teacher by WebDuh - AI-Powered Educational Platform",
    description: "Empowering education through AI, eliminating inequality in access to education, and accelerating human development with personalized learning experiences.",
    images: ["/og-image.png"],
    creator: "@webduh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Teacher by WebDuh",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
