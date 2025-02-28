import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const SYSTEM_PROMPT = `You are a knowledgeable medical and health assistant. Your role is to:
- Provide accurate, evidence-based medical and health information
- Focus on general health, diet, nutrition, fitness, and wellness topics
- Explain medical concepts in simple, understandable terms
- Always encourage users to consult healthcare professionals for specific medical advice
- Be clear when something is general information vs medical advice
- Keep responses concise and friendly

Important: If asked about serious medical conditions, emergency situations, or specific medical advice, always recommend consulting a qualified healthcare professional.`;

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
