"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Upload, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

/**
 * MedicalReportPanel component that handles medical report input and analysis
 * Features include:
 * - File upload for images and PDFs
 * - Text input for medical reports
 * - Report analysis functionality
 * - Markdown rendering of analysis results
 * - Error handling and loading states
 *
 * @component
 * @returns {JSX.Element} A two-panel interface for medical report input and analysis
 */
export function MedicalReportPanel() {
  /**
   * State management for the component
   * @type {string} medicalReport - The text content of the medical report
   * @type {string} analysis - The analysis results in markdown format
   * @type {boolean} isAnalyzing - Loading state during analysis
   * @type {string | null} selectedImage - URL of the uploaded image
   * @type {File | null} selectedFile - The uploaded file object
   * @type {string} error - Error message if analysis fails
   */
  const [medicalReport, setMedicalReport] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  /**
   * Handles image file upload
   * Creates object URL for preview and stores file for submission
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setError("");
    }
  };

  /**
   * Initiates the analysis of the medical report
   * Handles both text and file submissions
   * @async
   */
  const handleAnalyze = async () => {
    if (!medicalReport.trim() && !selectedFile) return;

    setIsAnalyzing(true);
    setError("");

    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
      } else if (medicalReport.trim()) {
        // Convert text to file and append
        const textFile = new Blob([medicalReport], { type: "text/plain" });
        formData.append("file", textFile, "report.txt");
      }

      const response = await fetch("/api/analyze-report", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze report");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error analyzing report:", error);
      setError("Failed to analyze the report. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Resets all state variables to their initial values
   * Clears the form and analysis results
   */
  const handleClear = () => {
    setMedicalReport("");
    setAnalysis("");
    setSelectedImage(null);
    setSelectedFile(null);
    setError("");
  };

  /**
   * Removes the uploaded image and associated file
   * Maintains any text input
   */
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Input Medical Report</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            title="Clear all"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Upload Section */}
        <div className="mb-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              {selectedImage ? (
                <>
                  <div className="relative w-full h-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveImage();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Image
                      src={selectedImage}
                      alt="Uploaded medical report"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or PDF (MAX. 10MB)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Text Input Section */}
        <div className="relative">
          <Textarea
            placeholder="Or paste your medical report text here..."
            className="min-h-[200px] mb-4"
            value={medicalReport}
            onChange={(e) => setMedicalReport(e.target.value)}
          />
          {medicalReport && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setMedicalReport("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          onClick={handleAnalyze}
          className="w-full h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600"
          disabled={isAnalyzing || (!medicalReport.trim() && !selectedFile)}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Report"
          )}
        </Button>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Analysis Results</h3>
          {analysis && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAnalysis("")}
              title="Clear results"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="min-h-[300px] p-4 bg-muted rounded-lg">
          {analysis ? (
            <div className="text-sm prose dark:prose-invert max-w-none prose-sm">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold mb-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-bold mb-2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-bold mb-2">{children}</h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 mb-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 mb-2">{children}</ol>
                  ),
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children }) => (
                    <code className="bg-black/10 dark:bg-white/10 rounded px-1">
                      {children}
                    </code>
                  ),
                }}
              >
                {analysis}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
              Analysis results will appear here
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
