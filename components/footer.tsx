"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
        <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground flex items-center">
            Made with{" "}
            <Heart
              className="h-4 w-4 mx-1 text-destructive"
              fill="currentColor"
            />{" "}
            for healthcare professionals
          </p>
          <p className="text-xs text-muted-foreground">
            © {currentYear} MediTranslate. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
