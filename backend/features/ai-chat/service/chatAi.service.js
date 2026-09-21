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

export const generateChatTitle = async (firstMessage) => {
  const titlePrompt = [
    "Genera un título breve y descriptivo para una conversación de estudio.",
    "Usa únicamente el primer mensaje del usuario como contexto.",
    "Devuelve solo el título, sin comillas, sin Markdown y con un máximo de 60 caracteres.",
    `Primer mensaje: ${firstMessage}`,
  ].join("\n");

  const { message } = await AskAI(titlePrompt);
  const title = message.replace(/[\r\n]+/g, " ").replace(/^['\"`]+|['\"`]+$/g, "").trim();
  if (!title) throw new Error("AI returned an empty chat title");

  return title.slice(0, 60);
};

export default AskAI;
