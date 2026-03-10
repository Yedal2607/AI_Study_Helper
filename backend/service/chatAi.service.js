const apiKey = process.env.AI_API_KEY;

async function AskAI(userPrompt) {
  try {
    const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemma-3-4b-it",
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;
    return { message: answer };
  } catch (error) {
    return {
      message: error?.error?.message || "An unexpected error has ocurred",
    };
  }
}

export default AskAI;
