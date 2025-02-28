"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface TranscriptDisplayProps {
  title: string;
  text: string;
  language: string;
  isTranslated?: boolean;
}

export function TranscriptDisplay({
  title,
  text,
  language,
  isTranslated = false,
}: TranscriptDisplayProps) {
  const { toast } = useToast();

  const speakText = () => {
    if (!text) return;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a voice for the selected language
      const voice = voices.find(voice => voice.lang.startsWith(language.split('-')[0]));
      if (voice) {
        utterance.voice = voice;
      }
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech synthesis not supported",
        description: "Your browser does not support text-to-speech functionality.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full overflow-hidden border-0 shadow-md glass-card">
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            {isTranslated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={speakText}
                disabled={!text}
                title="Speak text"
                className="h-8 w-8 rounded-full hover:bg-primary/10"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="min-h-[120px] max-h-[200px] overflow-y-auto rounded-md p-3 bg-background/50">
            {text ? (
              <p className="whitespace-pre-wrap">{text}</p>
            ) : (
              <p className="text-muted-foreground italic">
                {isTranslated
                  ? "Translated text will appear here..."
                  : "Speak to see your text here..."}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}