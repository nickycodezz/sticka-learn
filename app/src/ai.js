// app/src/ai.js
import { GROQ_API_KEY } from "./config.js";

// System style for short, playful “I wonder…” prompts
const SYSTEM_PROMPT = `
You are Wonder Lens, a kind, playful creativity buddy for kids.
This is especially good for kids who want to explore and wander.
Return ONE short prompt only, no numbering, no quotes.
Format: "I wonder... can you find something _____?" 
Keep language simple. Varying themes: 
specific, colors, shapes, sounds, textures, sizes, feelings, movements, stillness, landscape, animals, rocks, plants, etc.
Not too long, keep it on the simpler side to allow for original creativity and cater to young audience.
This is for ultimate inspiration.
`;

// If network/key fails, we fall back locally so the app still works
const FALLBACKS = [
  "I wonder… can you find something round?",
  "I wonder… can you find something blue?",
  "I wonder… can you find something that makes a sound?",
  "I wonder… can you find something tiny?",
  "I wonder… can you find something soft?",
  "I wonder… can you find something shiny?",
  "I wonder… can you find something with stripes?",
];

export async function getImaginationPrompt() {
  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.9,
        max_tokens: 50,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: "Give me one new prompt only." },
        ],
      }),
    });

    if (!resp.ok) throw new Error(`Groq error: ${resp.status}`);
    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty response");

    // Normalize to begin with “I wonder…” and strip stray quotes
    const normalized = /^i wonder/i.test(text) ? text : `I wonder… ${text}`;
    return normalized.replace(/^"|"$/g, "");
  } catch (e) {
    console.warn("Using fallback prompt due to:", e?.message || e);
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  }
}
