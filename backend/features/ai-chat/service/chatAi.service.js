async function AskAI(userPrompt) {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "qwen2.5:7b",
    prompt: userPrompt,
    stream: false
  })
});
    const data = await response.json();
    const answer = data.response;
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
