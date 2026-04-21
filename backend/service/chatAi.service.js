
async function AskAI(userPrompt) {
  try {
    const response = await fetch(process.env.AI_URL_PROVIDER, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL,
        messages: [
          {
            role: "system",
            content: "You are AI Study Helper, an AI assistant",
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });
    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || data?.message;
    ("AI service returned an unexpected response");
    return { message: answer };
  } catch (error) {
    console.error(error);
    return {
      message: error?.error?.message || "An unexpected error has ocurred",
    };
  }
}

export default AskAI;
