import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

/**
 * Configuration for the Outfit font
 * Includes Latin subset support and CSS variable definition
 * @constant {NextFont}
 */
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

/**
 * Metadata configuration for the application
 * Includes SEO-relevant information like title, description, and keywords
 * @constant {Metadata}
 */
export const metadata: Metadata = {
  title: "MediTranslate - Healthcare Translation App",
  description:
    "Real-time healthcare translation for medical professionals and patients",
  keywords:
    "healthcare translation, medical translation, voice translation, speech recognition",
};

/**
 * Props interface for the RootLayout component
 * @interface RootLayoutProps
 * @property {React.ReactNode} children - Child components to be rendered within the layout
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component that wraps the entire application
 * Features include:
 * - Authentication provider (Clerk)
 * - Theme management
 * - Global font configuration
 * - Navigation bar
 * - Toast notifications
 * - HTML lang attribute for accessibility
 * - Hydration warning suppression
 *
 * This component provides the base structure and global functionality
 * that is shared across all pages of the application.
 *
 * @component
 * @param {RootLayoutProps} props - Component props
 * @returns {JSX.Element} The root layout structure of the application
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={outfit.variable}>
        <body className={outfit.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
