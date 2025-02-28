"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Props interface for the SpeechRecognition component
 * @interface SpeechRecognitionProps
 * @property {string} language - The language code for speech recognition (e.g., 'en-US')
 * @property {function} onTranscriptChange - Callback function that receives the transcript text
 */
interface SpeechRecognitionProps {
  language: string;
  onTranscriptChange: (transcript: string) => void;
}

/**
 * A React component that provides speech-to-text functionality using the Web Speech API
 * @component
 * @param {SpeechRecognitionProps} props - Component props
 * @returns {JSX.Element} Speech recognition interface with microphone controls
 */
export function SpeechRecognition({
  language,
  onTranscriptChange,
}: SpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser does not support speech recognition.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition =
      // @ts-ignore
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = finalTranscript || interimTranscript;
      setTranscript(fullTranscript);
      onTranscriptChange(fullTranscript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "not-allowed") {
        toast({
          title: "Microphone Access Denied",
          description:
            "Please allow microphone access to use speech recognition.",
          variant: "destructive",
        });
      }
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast, onTranscriptChange]);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  /**
   * Toggles the speech recognition on/off state
   * Starts or stops the speech recognition service
   */
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast({
          title: "Error",
          description: "Failed to start speech recognition. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  /**
   * Resets the current transcript to an empty string
   * and notifies the parent component via onTranscriptChange
   */
  const resetTranscript = () => {
    setTranscript("");
    onTranscriptChange("");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleListening}
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className={cn(
              "rounded-full h-16 w-16 flex items-center justify-center shadow-lg",
              isListening && "animate-pulse"
            )}
          >
            {isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
            {isListening && (
              <span className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20"></span>
            )}
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={resetTranscript}
            variant="outline"
            size="icon"
            disabled={!transcript}
            title="Reset transcript"
            className="h-10 w-10 rounded-full"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      <p className="text-sm text-muted-foreground">
        {isListening ? "Listening..." : "Click to start speaking"}
      </p>
    </div>
  );
}
