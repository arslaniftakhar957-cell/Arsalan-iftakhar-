export default async function handler(req, res) {
  const { prompt, type } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  let finalPrompt = prompt;
  if (type === "script") finalPrompt = `Write viral YouTube script for: ${prompt} in simple Urdu/Hindi`;
  if (type === "hashtag") finalPrompt = `Generate 20 viral hashtags for: ${prompt}`;
  if (type === "thumbnail") finalPrompt = `Give 5 thumbnail ideas for: ${prompt}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: finalPrompt }] }] })
  });

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  res.status(200).json({ result: text });
}
