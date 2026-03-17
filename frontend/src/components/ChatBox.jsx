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
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat/ask", {
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
      setAnswer("Something went wrong. The server is unreachable.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col min-h-[80vh] justify-center mx-auto p-4">
      <div
        aria-live="polite"
        className={`mb-4 overflow-y-auto ${hasConversation ? "h-[82vh]" : ""} rounded-md p-3`}
      >
        {answer && (
          <div className="text-sm mx-auto max-w-2xl text-white whitespace-pre-wrap space-y-3">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mb-2">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-medium mb-2">{children}</h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-lg font-medium mb-1">{children}</h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-base font-medium mb-1">{children}</h6>
                ),
                p: ({ children }) => (
                  <p className="text-base mb-2">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="ml-2" >{children}</li>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5">{children}</ol>
                ),
              }}
            >
              {answer}
            </ReactMarkdown>
          </div>
        )}
        {loading && (
          <p className="mx-auto max-w-2xl my-5 animate-pulse text-white ">
            Thinking...
          </p>
        )}

      </div>
        
      <form onSubmit={askAI} className={`flex ${Boolean(text) ? "max-w-2xl" : "max-w-xl"} w-full mx-auto transition-all duration-400 ease-in-out `}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          disabled={loading}
          placeholder="Write something to the AI"
          className="flex-1 rounded-l-full px-5 py-4
bg-[#111827] 
border border-white/10 
text-white 
placeholder:text-gray-400 
focus:outline-none "
        />
        <button
          type="submit"
          value="Send"
          disabled={loading}
          className="rounded-r-full
bg-blue-900 
hover:bg-white/20 
border border-white/20
px-4 py-2 
text-white 
font-medium 
transition-all duration-200"
        >
          Send
        </button>
      </form>
    </section >
  );
}

export default ChatBox;
