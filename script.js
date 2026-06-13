// generate.js script for BrandReply AI
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Optional, check your current setup

export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://your-site-url.vercel.app", // Yahan apni site ka URL daalein
        "X-Title": "BrandReply AI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "nvidia/llama-nemotron-rerank-vl-1b-v2:free", // Aapka selected free model
        "messages": [
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate content", details: error.message });
  }
}
