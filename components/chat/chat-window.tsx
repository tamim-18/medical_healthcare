"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send, Loader2, RefreshCw } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

/**
 * Interface defining the structure of a chat message
 * @interface Message
 * @property {string} id - Unique identifier for the message
 * @property {string} content - The message text content
 * @property {boolean} isUser - Whether the message is from the user (true) or AI (false)
 * @property {Date} timestamp - When the message was sent
 */
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

/**
 * Initial welcome message displayed when the chat window opens
 * @constant {string}
 */
const WELCOME_MESSAGE = `Hello! 👋 I'm your medical and health assistant. I can help you with:
- General health questions
- Diet and nutrition advice
- Fitness and exercise guidance
- Wellness tips
- Understanding medical terms

How can I assist you today?`;

/**
 * Props interface for the ChatWindow component
 * @interface ChatWindowProps
 * @property {boolean} isOpen - Whether the chat window should be displayed
 */
interface ChatWindowProps {
  isOpen: boolean;
}

/**
 * ChatWindow component that provides the main chat interface
 * Features include:
 * - Real-time message display
 * - Message history with timestamps
 * - Markdown rendering for formatted responses
 * - Auto-scrolling to latest messages
 * - Loading states and error handling
 * - Chat history reset functionality
 * - Responsive design with glass card effect
 *
 * @component
 * @param {ChatWindowProps} props - Component props
 * @returns {JSX.Element} A chat interface window with message history and input
 */
export function ChatWindow({ isOpen }: ChatWindowProps) {
  /**
   * State management for the chat window
   * @type {Message[]} messages - Array of chat messages
   * @type {string} inputMessage - Current input field value
   * @type {boolean} isLoading - Loading state during message processing
   * @type {boolean} isRefreshing - Loading state during chat reset
   */
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: WELCOME_MESSAGE,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Reference to the messages end div for auto-scrolling
   */
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  /**
   * Scrolls the chat window to the latest message
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Effect hook to handle auto-scrolling when new messages arrive
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Handles sending a new message and getting AI response
   * Includes error handling and loading states
   */
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets the chat history to initial state
   * Shows a confirmation toast when complete
   */
  const handleRefresh = () => {
    setIsRefreshing(true);
    setMessages([
      {
        id: "welcome",
        content: WELCOME_MESSAGE,
        isUser: false,
        timestamp: new Date(),
      },
    ]);

    toast({
      title: "Chat Refreshed",
      description: "Chat history has been cleared.",
    });

    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-4 z-50 w-[350px] h-[500px] rounded-lg shadow-xl glass-card overflow-hidden"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Medical Assistant
                  </h3>
                  <p className="text-sm text-gray-100">
                    Ask me about health, diet, or fitness
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing || messages.length === 1}
                  className="text-white hover:bg-white/20"
                  title="Clear chat history"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <div className="text-sm prose dark:prose-invert max-w-none prose-sm">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            h1: ({ children }) => (
                              <h1 className="text-lg font-bold mb-2">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-base font-bold mb-2">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-sm font-bold mb-2">
                                {children}
                              </h3>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 mb-2">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal pl-4 mb-2">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="mb-1">{children}</li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-bold">{children}</strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic">{children}</em>
                            ),
                            code: ({ children }) => (
                              <code className="bg-black/10 dark:bg-white/10 rounded px-1">
                                {children}
                              </code>
                            ),
                            sup: ({ children }) => (
                              <sup className="text-xs">{children}</sup>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
