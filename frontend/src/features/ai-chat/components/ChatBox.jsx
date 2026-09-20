import ReactMarkdown from "react-markdown";
import { useSendAIMessage } from "../hooks/useSendAIMessage";

function ChatBox() {
  const { text, setText, question, answer, loading, hasConversation, askAI } = useSendAIMessage();

  return (
    <main className="relative h-[calc(100vh-65px)] overflow-hidden text-white">
      <section className="mx-auto flex h-full w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <div
          aria-live="polite"
          className={`flex-1 min-h-0 overflow-y-auto py-8 pb-36 sm:py-12 sm:pb-40 ${
            hasConversation ? "" : "flex items-center justify-center"
          }`}
        >
          {hasConversation ? (
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
              {question && (
                <div className="flex justify-end">
                  <p className="max-w-[85%] rounded-3xl rounded-br-md bg-sky-600 px-5 py-3.5 text-sm leading-6 text-white shadow-lg shadow-sky-950/20 sm:text-base">
                    {question}
                  </p>
                </div>
              )}

              <div className="flex gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold shadow-lg shadow-sky-950/40">
                  AI
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  {loading ? (
                    <div className="flex h-8 items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300" />
                    </div>
                  ) : (
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="mb-5 mt-1 border-b border-white/10 pb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight text-white first:mt-0">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="mb-2 mt-6 text-xl font-semibold text-slate-50">{children}</h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="mb-2 mt-5 text-lg font-semibold text-slate-100">{children}</h4>
                        ),
                        p: ({ children }) => (
                          <p className="mb-5 text-[15px] leading-7 text-slate-200 last:mb-0 sm:text-base">{children}</p>
                        ),
                        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                        a: ({ children, href }) => (
                          <a href={href} target="_blank" rel="noreferrer" className="font-medium text-sky-300 underline decoration-sky-400/50 underline-offset-4 transition hover:text-sky-200">
                            {children}
                          </a>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-5 ml-1 list-disc space-y-2 pl-5 text-[15px] leading-7 text-slate-200 marker:text-sky-400 sm:text-base">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-5 ml-1 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-slate-200 marker:font-semibold marker:text-sky-300 sm:text-base">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => <li className="pl-1">{children}</li>,
                        blockquote: ({ children }) => (
                          <blockquote className="mb-5 border-l-2 border-sky-400/80 bg-sky-400/5 py-1 pl-4 pr-3 italic text-slate-300">
                            {children}
                          </blockquote>
                        ),
                        pre: ({ children }) => (
                          <pre className="mb-5 overflow-x-auto rounded-xl border border-white/10 bg-[#0c1016] p-4 text-sm leading-6 text-slate-200 shadow-inner shadow-black/30">
                            {children}
                          </pre>
                        ),
                        code: ({ children, className }) => {
                          const isBlock = Boolean(className);
                          return (
                            <code className={isBlock ? "font-mono text-[13px] text-slate-100" : "rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-sky-200"}>
                              {children}
                            </code>
                          );
                        },
                        hr: () => <hr className="my-7 border-white/10" />,
                      }}
                    >
                      {answer}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl px-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-lg font-bold shadow-xl shadow-sky-950/30">
                AI
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{"\u00BFQu\u00E9 quieres estudiar hoy?"}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                Pregunta sobre conceptos, ejercicios, resúmenes o explicaciones paso a paso.
              </p>
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111418] via-[#111418]/95 to-transparent px-4 pb-5 pt-10 sm:px-6 sm:pb-7">
          <form
            onSubmit={askAI}
            className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[1.75rem] border border-white/10 bg-[#1b212b]/95 p-2 pl-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition focus-within:border-sky-400/50 focus-within:ring-4 focus-within:ring-sky-400/10 sm:pl-5"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  askAI(e);
                }
              }}
              rows="1"
              disabled={loading}
              placeholder="Escribe tu pregunta..."
              className="max-h-32 min-h-[48px] flex-1 resize-none bg-transparent py-3 text-[15px] leading-6 text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={loading || !text.trim()}
              aria-label="Enviar mensaje"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-xl font-semibold text-white shadow-lg shadow-sky-950/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              &#8593;
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] text-slate-500">
            AI Study Helper puede cometer errores. Verifica la información importante.
          </p>
        </div>
      </section>
    </main>
  );
}

export default ChatBox;