"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Headphones, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

/**
 * HeroSection component that serves as the main landing section of the website
 * Features include:
 * - Animated heading and subheading with gradient text
 * - Interactive CTA buttons with hover effects
 * - Grid of feature cards with hover animations
 * - Responsive layout for mobile, tablet, and desktop
 * - Decorative background grid pattern
 *
 * @component
 * @returns {JSX.Element} A hero section with animated content and feature cards
 */
export function HeroSection() {
  /**
   * State to track hover state of the CTA button
   * Used for animating the arrow icon
   * @type {boolean}
   */
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-hidden hero-gradient py-16 md:py-28 lg:py-32">
      <div className="absolute inset-0 z-0 opacity-30">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Breaking{" "}
                <span className="gradient-text">Language Barriers</span> in
                Healthcare
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground text-lg md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Real-time voice translation for medical professionals and
                patients. Communicate clearly and accurately across languages.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-3 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                asChild
              >
                <a href="#translator">
                  <span className="relative z-10">Start Translating</span>
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 ml-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 dark:from-blue-400 dark:to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="group">
                Learn More
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="grid gap-4 md:gap-6">
                <motion.div
                  className="rounded-xl glass-card p-6 shadow-lg"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Globe className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold">40+ Languages</h3>
                  <p className="text-muted-foreground">
                    Support for major languages worldwide
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-xl glass-card p-6 shadow-lg"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <MessageSquare className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold">Real-time</h3>
                  <p className="text-muted-foreground">
                    Instant voice-to-text translation
                  </p>
                </motion.div>
              </div>
              <div className="grid gap-4 md:gap-6 mt-8">
                <motion.div
                  className="rounded-xl glass-card p-6 shadow-lg"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Headphones className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold">Audio Playback</h3>
                  <p className="text-muted-foreground">
                    Listen to translated text with natural voices
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-xl glass-card p-6 shadow-lg"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12 text-primary mb-4"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <h3 className="text-xl font-bold">Healthcare Focus</h3>
                  <p className="text-muted-foreground">
                    Optimized for medical terminology
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
