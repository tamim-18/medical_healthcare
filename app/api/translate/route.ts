import { GoogleGenerativeAI } from "@google/generative-ai";

// Add this line to make the route dynamic
export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Helper function to convert language codes to full names
function getLanguageName(code: string): string {
  const languageMap: { [key: string]: string } = {
    "en-US": "English",
    "es-ES": "Spanish",
    "fr-FR": "French",
    "de-DE": "German",
    "it-IT": "Italian",
    "pt-PT": "Portuguese",
    "zh-CN": "Chinese",
    "ja-JP": "Japanese",
    // Add more mappings as needed
  };

  return languageMap[code] || code.split("-")[0].toUpperCase(); // Fallback to the language code if not found
}

export async function POST(request: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();

    const sourceLang = getLanguageName(sourceLanguage);
    const targetLang = getLanguageName(targetLanguage);

    const prompt = `You are a medical translator. Translate the following medical text from ${sourceLang} to ${targetLang}. 
    Maintain medical accuracy and terminology. Only provide the translation, no additional explanations:
    
    "${text}"`;

    const result = await model.generateContent(prompt);
    const translation = result.response.text();

    return Response.json({ translation });
  } catch (error) {
    console.error("Translation error:", error);
    return Response.json({ error: "Translation failed" }, { status: 500 });
  }
}
