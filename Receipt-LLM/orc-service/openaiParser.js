const { OpenAI } = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPEANAI,
  });

async function parseReceiptWithOpenAI(receiptText) {
  const prompt = `
You are a JSON generator.

Given the receipt text below, output ONLY a valid JSON object with this exact format:

{
  "store": "<store name>",
  "date": "<DD-MM-YYYY HH:MM:SS>",
  "items": [
      { "name": "<item name>", "price": <price as number> }
  ]
}

DO NOT output anything except the JSON object. No explanations, no greetings, no markdown, no extra text.

Receipt text:
${receiptText}
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    max_tokens: 512,
  });

  const outputText = completion.choices[0].message.content.trim();

  // Parse JSON, throw error if invalid
  try {
    return JSON.parse(outputText);
  } catch {
    throw new Error(`Invalid JSON from OpenAI: ${outputText}`);
  }
}

module.exports = { parseReceiptWithOpenAI };
