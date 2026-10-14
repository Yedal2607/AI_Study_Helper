import { useLayoutEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { useSendAIMessage } from "../hooks/useSendAIMessage";

function ConversationHistoryItem({ chat, active, disabled, onSelect }) {
  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useLayoutEffect(() => {
    const updateScrollDistance = () => {
      if (!containerRef.current || !labelRef.current) return;
      setScrollDistance(Math.max(0, labelRef.current.scrollWidth - containerRef.current.clientWidth));
    };

    updateScrollDistance();
    const observer = new ResizeObserver(updateScrollDistance);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [chat.title]);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-label={chat.title}
      className={`group w-full overflow-hidden rounded-xl px-3 py-2.5 text-left text-sm transition ${active ? "ui-panel-subtle ui-text" : "ui-muted ui-interactive hover:opacity-80"}`}
    >
      <div ref={containerRef} className="overflow-hidden">
        <span
          ref={labelRef}
          style={{ "--scroll-distance": `${scrollDistance}px` }}
          className={`block w-max transition-transform duration-700 ease-in-out ${scrollDistance > 0 ? "group-hover:translate-x-[calc(-1*var(--scroll-distance))]" : ""}`}
        >
          {chat.title}
        </span>
      </div>
    </button>
  );
}



function ChatBox() {
  const {
    text, setText, messages, conversations, activeChatId, loading, historyLoading,
    sidebarOpen, setSidebarOpen, askAI, selectConversation, newConversation, logout,
  } = useSendAIMessage();
  const hasConversation = messages.length > 0;

  return (
    <main className="flex h-screen overflow-hidden ui-text">
      <aside className={`${sidebarOpen ? "w-72" : "w-0"} shrink-0 overflow-hidden border-r ui-border ui-panel transition-[width] duration-300`}>
        <div className="flex h-full w-72 flex-col p-3">
          <button type="button" onClick={newConversation} disabled={loading} className="mb-4 flex items-center gap-3 rounded-xl ui-border border ui-panel-subtle px-4 py-3 text-left text-sm font-semibold transition ui-interactive disabled:opacity-50">
            <span className="text-xl leading-none">+</span> Nueva conversación
          </button>
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider ui-muted">Historial</p>
          <div className="min-h-0 flex-1 overflow-y-auto space-y-1">
            {historyLoading ? <p className="px-2 py-3 text-sm ui-muted">Cargando...</p> : conversations.length === 0 ? <p className="px-2 py-3 text-sm ui-muted">Aún no hay conversaciones.</p> : conversations.map((chat) => (
              <ConversationHistoryItem
                key={chat._id}
                chat={chat}
                active={activeChatId === chat._id}
                disabled={loading}
                onSelect={() => selectConversation(chat._id)}
              />
            ))}
          </div>
          <button type="button" onClick={logout} className="mt-3 flex items-center justify-center gap-2 rounded-xl ui-border border ui-panel-subtle px-4 py-3 text-sm font-semibold ui-text transition hover:bg-red-500/15 ui-danger">
            <span aria-hidden="true">↪</span> Cerrar sesión
          </button>
        </div>
      </aside>

      <section className="relative flex min-w-0 flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => setSidebarOpen((open) => !open)} aria-label={sidebarOpen ? "Cerrar historial" : "Abrir historial"} className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl ui-border border ui-panel-subtle text-lg transition ui-interactive sm:left-6">
          {sidebarOpen ? "‹" : "☰"}
        </button>
        <div aria-live="polite" className={`scrollbar-hide min-h-0 flex-1 overflow-y-auto py-8 pb-36 sm:py-12 sm:pb-40 ${hasConversation ? "" : "flex items-center justify-center"}`}>
          {hasConversation ? (
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 pt-10">
              {messages.map((message) => message.role === "user" ? (
                <div key={message._id} className="flex justify-end"><p className="max-w-[85%] rounded-3xl rounded-br-md ui-message-user px-5 py-3.5 text-sm leading-6 shadow-lg sm:text-base">{message.content}</p></div>
              ) : (
                <div key={message._id} className="flex gap-3 sm:gap-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ui-button text-sm font-bold">AI</div><div className="min-w-0 flex-1 pt-1 ui-text"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={{ p: ({ children }) => <p className="mb-4 text-[15px] leading-7 last:mb-0 sm:text-base">{children}</p>, h1: ({ children }) => <h1 className="mb-4 text-3xl font-bold ui-text">{children}</h1>, h2: ({ children }) => <h2 className="mb-3 text-2xl font-semibold ui-text">{children}</h2>, ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>, ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>, code: ({ children }) => <code className="rounded ui-panel-subtle px-1.5 py-0.5 ui-accent">{children}</code> }}>{message.content}</ReactMarkdown></div></div>
              ))}
              {loading && <div className="flex gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl ui-button font-bold">AI</div><div className="flex items-center gap-1.5"><span className="h-2 w-2 animate-bounce rounded-full ui-status-dot" /><span className="h-2 w-2 animate-bounce rounded-full ui-status-dot [animation-delay:-0.15s]" /><span className="h-2 w-2 animate-bounce rounded-full ui-status-dot [animation-delay:-0.3s]" /></div></div>}
            </div>
          ) : <div className="mx-auto max-w-2xl px-4 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ui-button text-lg font-bold">AI</div><h1 className="mt-6 text-3xl font-semibold sm:text-4xl">¿Qué quieres estudiar hoy?</h1><p className="mt-3 text-sm leading-6 ui-muted sm:text-base">Envía un mensaje para crear tu primera conversación.</p></div>}
        </div>
        <div className="absolute inset-x-0 bottom-0 ui-page px-4 pb-5 pt-10 sm:px-6 sm:pb-7"><form onSubmit={askAI} className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[1.75rem] ui-border border ui-panel p-2 pl-4 shadow-2xl"><textarea value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) askAI(event); }} rows="1" disabled={loading} placeholder="Escribe tu pregunta..." className="max-h-32 min-h-[48px] flex-1 resize-none bg-transparent py-3 text-[15px] leading-6 outline-none placeholder:ui-muted disabled:cursor-not-allowed" /><button type="submit" disabled={loading || !text.trim()} aria-label="Enviar mensaje" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ui-button text-xl font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:ui-panel-subtle">↑</button></form><p className="mt-2 text-center text-[11px] ui-muted">AI Study Helper puede cometer errores. Verifica la información importante.</p></div>
      </section>
    </main>
  );
}

export default ChatBox;







