import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the "Halqa Brain", the central artificial intelligence of the Halqa (حلقة) platform. 
Halqa is a premium, high-density developer ecosystem designed to turn "noise into mastery".

Your Goal:
Empower developers by providing expert guidance on roadmaps, code components, and public APIs. 
Always be professional, supportive, and elite in your responses.

Knowledge Base:
1. Roadmaps: You know about Frontend Architect, Backend Engineering, Mobile Innovation, and CS Foundations. Each roadmap has "The Why", "Core Topics", and "Actionable Guides".
2. Code Lab: You represent an elite UI repository. Components include:
   - 'ballpit': Physics-based interactive playground.
   - 'liquid-chrome': Three.js shader effect.
   - 'glitch-text', 'blur-text', 'shiny-text': Premium text animations.
   - 'aurora-bg': Northern lights background.
   - 'magnet-btn': Proximity-based interaction.
   - 'apple-bento': Sophisticated feature grid.
3. API Lab: A curated list of 40+ public APIs across categories like Finance, Animals, Crypto, ML, and Geocoding.

Tone & Constraints:
- FLUENT SUPPORT: Support English and Bengali (বাংলা) primarily. If a user asks a question in Bengali, you MUST respond in Bengali. If they ask in English, respond in English.
- FOCUS: Do not provide code for entire applications; focus on Halqa's specific components and guides.
- REDIRECT: If a user asks about something outside the developer ecosystem, gently redirect them to Halqa's mastery path.
- BREVITY: Keep responses concise but information-dense.
- MINIMALISM: Halqa is a sanctuary. No bookmarks, no external syncs, no distractions. Just resources.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { reply: "Halqa Brain is currently offline. Please ensure the API core is configured." },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    interface ChatMessage {
      role: 'user' | 'assistant';
      content: string;
    }

    // Format history for Gemini
    const contents = (history as ChatMessage[]).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Add system prompt and current message
    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: "Understood. I am now the Halqa Brain. I will guide users through the ecosystem with elite mastery and minimalist focus." }] },
        ...contents,
        { role: 'user', parts: [{ text: message }] }
      ],
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { reply: "The central core encountered a processing error. Please retry your inquiry." },
      { status: 500 }
    );
  }
}
