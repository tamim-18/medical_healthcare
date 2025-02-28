"use client";

import { useState, useEffect } from "react";
import { LanguageSelector, languages } from "@/components/language-selector";
import { SpeechRecognition } from "@/components/speech-recognition";
import { TranscriptDisplay } from "@/components/transcript-display";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * TranslationPanel component that provides real-time translation functionality
 * Features include:
 * - Real-time speech-to-text transcription
 * - Language selection for source and target languages
 * - Automatic translation with debouncing
 * - Language swapping capability
 * - Loading states and error handling
 * - Responsive design with glass card effect
 *
 * @component
 * @returns {JSX.Element} A panel containing translation controls and displays
 */
export function TranslationPanel() {
  /**
   * State management for the translation panel
   * @type {string} sourceLanguage - The language code for the input text
   * @type {string} targetLanguage - The language code for the translation
   * @type {string} originalText - The text to be translated
   * @type {string} translatedText - The translated text
   * @type {boolean} isTranslating - Loading state during translation
   */
  const [sourceLanguage, setSourceLanguage] = useState("en-US");
  const [targetLanguage, setTargetLanguage] = useState("es-ES");
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  /**
   * Effect hook to handle translation
   * Features:
   * - Debounced translation requests (500ms)
   * - Automatic translation on text or language changes
   * - Error handling with toast notifications
   */
  useEffect(() => {
    const translateText = async () => {
      if (!originalText) {
        setTranslatedText("");
        return;
      }

      setIsTranslating(true);

      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: originalText,
            sourceLanguage,
            targetLanguage,
          }),
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setTranslatedText(data.translation);
      } catch (error) {
        console.error("Translation error:", error);
        toast({
          title: "Translation Failed",
          description: "Unable to translate text. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsTranslating(false);
      }
    };

    const timeoutId = setTimeout(() => {
      translateText();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [originalText, sourceLanguage, targetLanguage, toast]);

  /**
   * Swaps the source and target languages
   * Also swaps the original and translated text
   */
  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setOriginalText(translatedText);
    setTranslatedText(originalText);
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto space-y-8 rounded-xl glass-card p-6 md:p-8 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <LanguageSelector
          value={sourceLanguage}
          onChange={setSourceLanguage}
          label="Source Language"
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-background shadow-md"
            onClick={swapLanguages}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <LanguageSelector
          value={targetLanguage}
          onChange={setTargetLanguage}
          label="Target Language"
        />
      </div>

      <div className="md:hidden flex justify-center my-4">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={swapLanguages}
        >
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          Swap Languages
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <SpeechRecognition
          language={sourceLanguage}
          onTranscriptChange={setOriginalText}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TranscriptDisplay
          title="Original Text"
          text={originalText}
          language={sourceLanguage}
        />

        {isTranslating ? (
          <div className="w-full">
            <div className="flex justify-between items-center pb-2">
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-[150px] w-full rounded-md" />
          </div>
        ) : (
          <TranscriptDisplay
            title="Translated Text"
            text={translatedText}
            language={targetLanguage}
            isTranslated
          />
        )}
      </div>
    </motion.div>
  );
}
