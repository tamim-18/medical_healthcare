"use client";

import { useState } from "react";
import { ChatButton } from "./chat-button";
import { ChatWindow } from "./chat-window";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatWindow isOpen={isOpen} />
    </>
  );
}
