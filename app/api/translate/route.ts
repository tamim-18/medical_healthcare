import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

/**
 * Force dynamic runtime to ensure fresh translations
 * @constant {string}
 */
export const dynamic = "force-dynamic";

/**
 * Instance of Google's Generative AI client
 * @constant {GoogleGenerativeAI}
 */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Model configuration for Gemini AI
 * Uses the flash model for faster translation responses
 * @constant {Object}
 */
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

/**
 * Language code mapping for better prompting
 * Maps ISO language codes to full language names
 * @constant {Object}
 */
const languageMap: { [key: string]: string } = {
  "en-US": "English",
  "es-ES": "Spanish",
  "fr-FR": "French",
  "de-DE": "German",
  "it-IT": "Italian",
  "pt-PT": "Portuguese",
  "nl-NL": "Dutch",
  "pl-PL": "Polish",
  "ru-RU": "Russian",
  "ja-JP": "Japanese",
  "ko-KR": "Korean",
  "zh-CN": "Chinese (Simplified)",
  "ar-SA": "Arabic",
  "hi-IN": "Hindi",
  "tr-TR": "Turkish",
};

/**
 * POST route handler for text translation
 * Features include:
 * - Language code to name mapping
 * - Context-aware translation prompting
 * - Error handling with appropriate status codes
 * - Structured response format
 * - Medical terminology awareness
 *
 * @async
 * @function POST
 * @param {Request} request - The incoming request object containing text and language codes
 * @returns {Promise<NextResponse>} JSON response with translation or error
 * @throws {Error} When translation processing fails
 */
export async function POST(request: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();

    if (!text || !sourceLanguage || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const sourceLang = languageMap[sourceLanguage] || sourceLanguage;
    const targetLang = languageMap[targetLanguage] || targetLanguage;

    const prompt = `Translate the following text from ${sourceLang} to ${targetLang}. 
    If there are medical terms, ensure they are accurately translated while maintaining their medical meaning.
    
    Text to translate: "${text}"
    
    Provide only the translation without any additional explanations or notes.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translation = response.text();

    return NextResponse.json({ translation });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 }
    );
  }
}
