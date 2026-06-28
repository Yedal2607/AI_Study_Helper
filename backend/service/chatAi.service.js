
async function AskAI(userPrompt) {
  try {
    const response = await api.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an AI assistant who knows everything.",
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
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
