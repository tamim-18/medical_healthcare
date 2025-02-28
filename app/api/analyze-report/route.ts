import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

/**
 * API key for Google's Generative AI service
 * @constant {string}
 */
const apiKey = process.env.GEMINI_API_KEY;

/**
 * Instance of Google's Generative AI client
 * @constant {GoogleGenerativeAI}
 */
const genAI = new GoogleGenerativeAI(apiKey as string);

/**
 * Model configuration for Gemini AI
 * @constant {Object}
 * @property {string} model - The model identifier
 * @property {Object} generationConfig - Configuration for text generation
 * @property {number} generationConfig.temperature - Controls randomness (0.0-1.0)
 * @property {number} generationConfig.topP - Nucleus sampling parameter
 * @property {number} generationConfig.topK - Top-k sampling parameter
 * @property {number} generationConfig.maxOutputTokens - Maximum response length
 */
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  },
});

/**
 * POST route handler for medical report analysis
 * Features include:
 * - Support for both text and image reports
 * - File type detection and appropriate processing
 * - Base64 encoding for image data
 * - Error handling with appropriate status codes
 * - Structured response format
 *
 * @async
 * @function POST
 * @param {Request} req - The incoming request object containing the file
 * @returns {Promise<NextResponse>} JSON response with analysis or error message
 * @throws {Error} When file processing or analysis fails
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If it's a text file, handle it differently
    if (file.type === "text/plain") {
      const text = buffer.toString("utf-8");
      const result = await model.generateContent(text);
      const response = await result.response;
      return NextResponse.json({ analysis: response.text() });
    }

    // For images, use the vision model
    const mimeType = file.type;
    const imageData = {
      inlineData: {
        data: buffer.toString("base64"),
        mimeType,
      },
    };

    const result = await model.generateContent([
      imageData,
      "Please analyze this medical report and provide a detailed analysis including key findings, possible diagnoses, and recommendations. Format the response in clear sections.",
    ]);

    const response = await result.response;
    return NextResponse.json({ analysis: response.text() });
  } catch (error) {
    console.error("Error analyzing medical report:", error);
    return NextResponse.json(
      { error: "Failed to analyze medical report" },
      { status: 500 }
    );
  }
}
