export default async function handler(req, res) {

  try {

    const { prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini response:", data);

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({
        error: "Gemini failed",
        details: data
      });
    }

    res.status(200).json({ text });

  } catch (error) {

    console.error("AI Error:", error);

    res.status(500).json({
      error: error.message
    });

  }
}
