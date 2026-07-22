import { useState } from "react";
export const useSendAIMessage = ()=>{
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const hasConversation = Boolean(answer) || loading;
  const askAI = async (e) => {
    e.preventDefault();

    const message = text.trim();
    if (!message) {
      return;
    }
    setText("");
    setAnswer("");
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_AI_CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if(data?.response?.message != ""){
        setAnswer(data?.response?.message)
        return
      }
      setAnswer("Something went wrong")
    } catch (error) {
      console.error("Request failed:", error);
      setAnswer("Something went wrong. The server is unreachable.");
    } finally {
      setLoading(false);
    }
  };
  return {text, setText, answer, loading, hasConversation, askAI}
}
