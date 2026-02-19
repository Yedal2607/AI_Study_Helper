import { useState } from "react";

function ChatBox() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (e) => {
    e.preventDefault();

    const message = text.trim();
    if (!message) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/user/askai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setAnswer(data?.response?.mensaje ?? "");
      setText("");
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-2xl p-4">
      <div aria-live="polite" className="mb-4 h-[60vh] overflow-y-auto rounded-md border border-white/20 p-3">
        {answer && <p className="text-white">{answer}</p>}
        {loading && <p className="animate-pulse text-white">Thinking...</p>}
      </div>

      <form onSubmit={askAI} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          disabled={loading}
          placeholder="Write something to the AI"
          className="flex-1 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          value="Send"
          disabled={loading}
          className="rounded-md bg-white px-4 py-2 text-black"
        >
          Send
        </button>
      </form>
    </section>
  );
}

export default ChatBox;
