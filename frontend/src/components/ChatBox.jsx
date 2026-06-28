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
      setAnswer(data?.response?.message);
    } catch (error) {
      console.error("Request failed:", error);
      setAnswer("Something went wrong. The server is unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-0px)] overflow-hidden bg-[#111418] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_45%)]" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />

      <section className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-6xl flex-col justify-between gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">AI Study Helper</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Study chat</h1>
            <p className="mt-1 text-sm text-slate-300">
              Ask a question and get a clean, structured answer you can review later.
            </p>
          </div>

          <div
            aria-live="polite"
            className={`flex-1 overflow-y-auto px-5 py-6 sm:px-6 ${
              hasConversation ? "min-h-[42vh]" : "flex items-center justify-center"
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
                  Puedes preguntar por conceptos, ejercicios, resúmenes o explicaciones paso a paso.
                </p>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={askAI}
          className={`mx-auto flex w-full max-w-4xl items-center rounded-full border border-white/10 bg-[#141922]/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 ${
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
