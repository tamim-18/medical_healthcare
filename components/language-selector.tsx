"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * @typedef {Object} Language
 * @property {string} value - The language code (e.g., 'en-US', 'es-ES')
 * @property {string} label - The display name with flag emoji (e.g., '🇺🇸 English (US)')
 */
export type Language = {
  value: string;
  label: string;
};

/**
 * Array of supported languages with their codes and display labels
 * Each language includes a country flag emoji and localized name
 * @type {Language[]}
 */
export const languages: Language[] = [
  { value: "en-US", label: "🇺🇸 English (US)" },
  { value: "es-ES", label: "🇪🇸 Spanish" },
  { value: "fr-FR", label: "🇫🇷 French" },
  { value: "de-DE", label: "🇩🇪 German" },
  { value: "it-IT", label: "🇮🇹 Italian" },
  { value: "pt-PT", label: "🇵🇹 Portuguese" },
  { value: "zh-CN", label: "🇨🇳 Chinese (Simplified)" },
  { value: "ja-JP", label: "🇯🇵 Japanese" },
  { value: "ko-KR", label: "🇰🇷 Korean" },
  { value: "ar-SA", label: "🇸🇦 Arabic" },
  { value: "hi-IN", label: "🇮🇳 Hindi" },
];

/**
 * Props interface for the LanguageSelector component
 * @interface LanguageSelectorProps
 * @property {string} value - Currently selected language code
 * @property {function} onChange - Callback function when language selection changes
 * @property {string} label - Label text displayed above the selector
 */
interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

/**
 * LanguageSelector component that provides a searchable dropdown for language selection
 * Features include:
 * - Searchable language list with command palette interface
 * - Visual feedback for selected language
 * - Keyboard navigation support
 * - Accessible ARIA attributes
 * - Responsive design
 *
 * @component
 * @param {LanguageSelectorProps} props - Component props
 * @returns {JSX.Element} A language selection dropdown with search functionality
 */
export function LanguageSelector({
  value,
  onChange,
  label,
}: LanguageSelectorProps) {
  /**
   * State to control the open/closed state of the language dropdown
   * @type {boolean}
   */
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <p className="text-sm font-medium mb-2">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? languages.find((language) => language.value === value)?.label
              : "Select language..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {languages.map((language) => (
                  <CommandItem
                    key={language.value}
                    value={language.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === language.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {language.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
