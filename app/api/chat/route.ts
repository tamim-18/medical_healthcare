import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Force dynamic runtime to ensure fresh responses
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
 * Uses the flash model for faster response times
 * @constant {Object}
 */
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

/**
 * System prompt that defines the AI assistant's behavior and limitations
 * Includes guidelines for:
 * - Medical information accuracy
 * - Topic focus areas
 * - Communication style
 * - Safety disclaimers
 *
 * @constant {string}
 */
const SYSTEM_PROMPT = `You are a knowledgeable medical and health assistant. Your role is to:
- Provide accurate, evidence-based medical and health information
- Focus on general health, diet, nutrition, fitness, and wellness topics
- Explain medical concepts in simple, understandable terms
- Always encourage users to consult healthcare professionals for specific medical advice
- Be clear when something is general information vs medical advice
- Keep responses concise and friendly

Important: If asked about serious medical conditions, emergency situations, or specific medical advice, always recommend consulting a qualified healthcare professional.`;

/**
 * POST route handler for chat interactions
 * Features include:
 * - System prompt integration
 * - Message context handling
 * - Error handling with appropriate status codes
 * - Structured response format
 *
 * @async
 * @function POST
 * @param {Request} request - The incoming request object containing the message
 * @returns {Promise<Response>} JSON response with AI message or error
 * @throws {Error} When message processing or AI response fails
 */
export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const prompt = `${SYSTEM_PROMPT}

User Query: ${message}

Please provide a helpful response while staying within the guidelines above.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return Response.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return Response.json({ error: "Failed to get response" }, { status: 500 });
  }
}
