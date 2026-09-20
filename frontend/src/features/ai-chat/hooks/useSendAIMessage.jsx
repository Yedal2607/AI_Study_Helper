import { useState } from "react";
import { useAuth } from "../../authentication/context/AuthContext";

export const useSendAIMessage = () => {
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const hasConversation = Boolean(question) || loading;
  const { token, logout } = useAuth();

  const askAI = async (e) => {
    e.preventDefault();

    const message = text.trim();
    if (!message || loading) {
      return;
    }

    setText("");
    setQuestion(message);
    setAnswer("");
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_AI_CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();
      setAnswer(data?.response?.message || "Something went wrong");
    } catch (error) {
      console.error("Request failed:", error);
      setAnswer("Something went wrong. The server is unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return { text, setText, question, answer, loading, hasConversation, askAI };
};