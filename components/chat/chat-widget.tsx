"use client";

import { useState } from "react";
import { ChatButton } from "./chat-button";
import { ChatWindow } from "./chat-window";

/**
 * ChatWidget component that manages the chat interface state and layout
 * Features include:
 * - Floating chat button
 * - Expandable chat window
 * - State management for open/closed states
 * - Smooth transitions between states
 * - Responsive design
 *
 * This component serves as the main container for the chat functionality,
 * coordinating between the button and window components.
 *
 * @component
 * @returns {JSX.Element} A complete chat widget with button and expandable window
 */
export function ChatWidget() {
  /**
   * State to track if the chat window is open or closed
   * @type {boolean}
   */
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatWindow isOpen={isOpen} />
    </>
  );
}
