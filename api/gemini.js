module.exports = async (req, res) => {
  if (req.method!== 'POST') {
    return res.status(405).json({ result: 'Method not allowed' });
  }
  try {
    const { prompt, type } = req.body || {};
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.status(200).json({ result: 'Error: API Key Vercel me nahi mili.' });
    }

    let finalPrompt = prompt || "test";
    if (type === "script") finalPrompt = `Write a viral YouTube script in simple Urdu/Hindi mix for topic: ${prompt}. Give hook, intro, 3 main points.`;
    if (type === "thumbnail") finalPrompt = `Give 10 viral YouTube thumbnail text ideas for topic: ${prompt}. Short and catchy.`;
    if (type === "hashtag") finalPrompt = `Generate YouTube SEO for topic: ${prompt}. Give 1 optimized title, description, and 20 hashtags.`;
    if (type === "image") finalPrompt = `Create a highly detailed, photorealistic image prompt for: ${prompt}. Describe style, lighting, 2026 latest design, ultra HD.`;
    if (type === "bgremove") finalPrompt = `User wants to remove background for: ${prompt}. Give 3 free easy methods step-by-step in simple Urdu. Recommend free websites like remove.bg and phone apps.`;
    if (type === "search") finalPrompt = `Answer like a smart search engine in simple Urdu/Hindi mix for query: ${prompt}. Give direct, helpful, to-the-point answer.`;
    if (type === "study") finalPrompt = `You are a helpful teacher. Explain in very simple and easy Urdu for student: ${prompt}. Give long questions answers if asked, with headings and points.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: finalPrompt }] }] })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ result: 'Gemini Error: ' + data.error.message });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Kuch nahi mila, dobara try karo.";
    return res.status(200).json({ result: text });

  } catch (err) {
    return res.status(200).json({ result: 'Server Error: ' + err.message });
  }
};
