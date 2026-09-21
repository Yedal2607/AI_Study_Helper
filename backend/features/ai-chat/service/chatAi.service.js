async function AskAI(userPrompt, previousMessages = []) {
  try {
    const conversation = previousMessages
      .map(({ role, content }) => `${role === "user" ? "Usuario" : "Asistente"}: ${content}`)
      .join("\n");
    const prompt = conversation ? `${conversation}\nUsuario: ${userPrompt}\nAsistente:` : userPrompt;
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.AI_MODEL, prompt, stream: false }),
    });
    if (!response.ok) throw new Error("AI service Error");
    const data = await response.json();
    return { message: data.response };
  } catch (error) {
    console.error(error);
    error.status = 502;
    throw error;
  }
}

export default AskAI;
