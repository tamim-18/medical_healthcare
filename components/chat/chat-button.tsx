"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

/**
 * Props interface for the ChatButton component
 * @interface ChatButtonProps
 * @property {boolean} isOpen - Whether the chat interface is currently open
 * @property {function} onClick - Callback function to handle button clicks
 */
interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Custom SVG chat icon component
 * Features a circular message bubble with lines representing text
 *
 * @component
 * @returns {JSX.Element} An SVG icon for the chat button
 */
const ChatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 text-white"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.5 21L5.89944 20.3229C6.28389 20.22 6.69119 20.2791 7.04753 20.4565C8.38837 21.1244 9.90029 21.5 11.5 21.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 8H13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * ChatButton component that provides a floating action button for chat functionality
 * Features include:
 * - Animated entrance effect
 * - Smooth icon transition between chat and close states
 * - Dynamic color changes based on state
 * - Hover and active animations
 * - Accessibility support with ARIA labels
 * - Responsive positioning
 *
 * @component
 * @param {ChatButtonProps} props - Component props
 * @returns {JSX.Element} A floating action button for chat interactions
 */
export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Button
        onClick={onClick}
        size="lg"
        className={`h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
          ${
            isOpen
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          }
          transform hover:scale-105 active:scale-95`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" strokeWidth={2.5} />
          ) : (
            <ChatIcon />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}
