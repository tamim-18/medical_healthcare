"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Globe,
  Volume2,
  Smartphone,
  Shield,
  FileText,
} from "lucide-react";

/**
 * @typedef {Object} Feature
 * @property {JSX.Element} icon - The Lucide icon component to display
 * @property {string} title - The title of the feature
 * @property {string} description - A detailed description of the feature
 */

/**
 * Array of features showcasing the main capabilities of the translation app
 * Each feature includes an icon, title, and description
 * @type {Feature[]}
 */
const features = [
  {
    icon: <Mic className="h-10 w-10" />,
    title: "Voice Recognition",
    description:
      "Speak naturally and see your words transcribed in real-time with high accuracy.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Multilingual Support",
    description:
      "Translate between 40+ languages with support for regional dialects and accents.",
  },
  {
    icon: <Volume2 className="h-10 w-10" />,
    title: "Text-to-Speech",
    description:
      "Listen to translations with natural-sounding voices in the target language.",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Mobile Optimized",
    description:
      "Use on any device with a responsive design that works on smartphones, tablets, and desktops.",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Privacy Focused",
    description:
      "Your conversations stay private with secure processing and no data storage.",
  },
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Medical Report Analysis",
    description:
      "Upload and analyze medical reports for accurate translation and interpretation of medical terminology.",
  },
];

/**
 * FeaturesSection component that displays a grid of key application features
 * Features include:
 * - Animated section title and description
 * - Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
 * - Individual feature cards with hover animations
 * - Glass card design with icons
 *
 * @component
 * @returns {JSX.Element} A section showcasing the application's key features
 */
export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <motion.h2
            className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powerful Translation Features
          </motion.h2>
          <motion.p
            className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our healthcare translation app provides the tools you need for clear
            communication across language barriers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-xl glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
