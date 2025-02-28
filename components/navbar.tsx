"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";

/**
 * Navbar component that provides navigation functionality and responsive design
 * Features include:
 * - Responsive desktop and mobile navigation
 * - Scroll-based background transparency
 * - Animated transitions using Framer Motion
 * - Theme toggle functionality
 * - Mobile menu with hamburger toggle
 *
 * @component
 * @returns {JSX.Element} A responsive navigation bar
 */
export function Navbar() {
  /**
   * State to track if the page has been scrolled past threshold
   * Used to add background blur and shadow to navbar
   */
  const [isScrolled, setIsScrolled] = useState(false);

  /**
   * State to control mobile menu visibility
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Effect hook to handle scroll events
   * Adds background effects to navbar when scrolled past 10px
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 dark:from-blue-400 dark:to-purple-400">
              MediTranslate
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-6"
        >
          <Link
            href="#translator"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Translator
          </Link>
          <Link
            href="#medical-report"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Medical Report
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <ThemeToggle />
          <Button size="sm" className="ml-4">
            Sign Up
          </Button>
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/95 backdrop-blur-sm border-b"
        >
          <div className="container py-4 px-4 flex flex-col space-y-4">
            <Link
              href="#translator"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Translator
            </Link>
            <Link
              href="#medical-report"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Medical Report
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button size="sm" className="w-full">
              Sign Up
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
