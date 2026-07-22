import { useState } from "react";
import ReactMarkdown from "react-markdown";

function ChatBox() {
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

  return (
    <main className="relative h-[calc(100vh-72px)] overflow-hidden bg-transparent text-white">

      <section className="relative mx-auto flex h-full w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-1 min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">AI Study Helper</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Study chat</h1>
            <p className="mt-1 text-sm text-slate-300">
              Ask a question and get a clean, structured answer you can review later.
            </p>
          </div>

          <div
            aria-live="polite"
            className={`flex-1 min-h-0 overflow-y-auto px-5 py-6 sm:px-6 ${
              hasConversation ? "" : "flex items-center justify-center"
            }`}
          >
            {answer ? (
              <div className="mx-auto w-full max-w-3xl rounded-[1.5rem] border border-white/10 bg-[#141922]/90 p-5 text-sm whitespace-pre-wrap shadow-lg shadow-black/20 sm:p-6">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-2 text-xl font-semibold">{children}</h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="mb-2 text-lg font-medium">{children}</h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="mb-1 text-base font-medium">{children}</h5>
                    ),
                    h6: ({ children }) => (
                      <h6 className="mb-1 text-sm font-medium">{children}</h6>
                    ),
                    p: ({ children }) => (
                      <p className="mb-3 text-base leading-7 text-slate-100">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc space-y-1 pl-5 text-slate-100">{children}</ul>
                    ),
                    li: ({ children }) => <li className="ml-1">{children}</li>,
                    ol: ({ children }) => (
                      <ol className="list-decimal space-y-1 pl-5 text-slate-100">{children}</ol>
                    ),
                  }}
                >
                  {answer}
                </ReactMarkdown>
              </div>
            ) : loading ? (
              <p className="mx-auto max-w-2xl animate-pulse text-sm text-slate-300">
                Thinking...
              </p>
            ) : (
              <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-white/10 bg-[#141922]/80 p-6 text-center shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">Ready when you are</p>
                <h2 className="mt-3 text-2xl font-semibold">What do you want to study today?</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  You can ask about concepts, exercises, summaries, or step-by-step explanations.
                </p>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={askAI}
          className={`mx-auto flex w-full max-w-4xl shrink-0 items-center rounded-full border border-white/10 bg-[#141922]/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 ${
            text ? "max-w-4xl" : "max-w-3xl"
          }`}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            disabled={loading}
            placeholder="Write something to the AI"
            className="flex-1 bg-transparent px-5 py-3 text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            value="Send"
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
}

export default ChatBox;
