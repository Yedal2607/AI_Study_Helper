import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../authentication/context/AuthContext";

const chatUrl = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/chat`
  : import.meta.env.VITE_AI_CHAT_URL?.replace(/\/ask$/, "");

export const useSendAIMessage = () => {
  const { token, logout } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const request = useCallback(async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...options.headers },
    });
    if (response.status === 401) {
      logout();
      throw new Error("Unauthorized");
    }
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || data.message || "No se pudo completar la solicitud");
    }
    return response.json();
  }, [logout, token]);

  useEffect(() => {
    let active = true;
    const loadHistory = async () => {
      try {
        const data = await request(chatUrl);
        if (active) setConversations(data.chats || []);
      } catch (error) {
        if (error.message !== "Unauthorized") console.error("Could not load chats:", error);
      } finally {
        if (active) setHistoryLoading(false);
      }
    };
    if (token) loadHistory();
    return () => { active = false; };
  }, [request, token]);

  const selectConversation = async (chatId) => {
    if (loading || chatId === activeChatId) return;
    try {
      const data = await request(`${chatUrl}/${chatId}`);
      setActiveChatId(data.chat._id);
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Could not load chat:", error);
    }
  };

  const newConversation = () => {
    if (loading) return;
    setActiveChatId(null);
    setMessages([]);
  };

  const askAI = async (event) => {
    event.preventDefault();
    const content = text.trim();
    if (!content || loading) return;

    const optimisticMessage = { _id: `local-${Date.now()}`, role: "user", content };
    const requestedChatId = activeChatId;
    setText("");
    setMessages((current) => [...current, optimisticMessage]);
    setLoading(true);

    try {
      const data = await request(`${chatUrl}/ask`, {
        method: "POST",
        body: JSON.stringify({ message: content, ...(requestedChatId ? { chatId: requestedChatId } : {}) }),
      });
      setActiveChatId(data.chat._id);
      setMessages((current) => [...current, data.message]);
      setConversations((current) => [data.chat, ...current.filter((chat) => chat._id !== data.chat._id)]);
    } catch (error) {
      if (error.message !== "Unauthorized") {
        setMessages((current) => [...current, { _id: `error-${Date.now()}`, role: "assistant", content: "No se pudo obtener una respuesta. Inténtalo de nuevo." }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    text, setText, messages, conversations, activeChatId, loading, historyLoading,
    sidebarOpen, setSidebarOpen, askAI, selectConversation, newConversation, logout,
  };
};


