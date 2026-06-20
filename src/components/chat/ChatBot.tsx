"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { quickActions } from "@/data/chatbot-knowledge";

type Message = {
  role: "user" | "bot";
  text: string;
};

type ChatContext = {
  lastIntentId?: string;
};

export function ChatBot({ open, onToggle }: { open: boolean; onToggle: (v: boolean) => void }) {
  const locale = useLocale();
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("welcome") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<ChatContext>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          locale,
          context,
        }),
      });
      const data = await res.json();
      const botText = data.response || t("error");
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
      if (data.suggestions?.length) setSuggestions(data.suggestions);
      if (data.context) setContext(data.context);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: t("error") }]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{ role: "bot", text: t("welcome") }]);
    setContext({});
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send(input);
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 left-6 z-50 flex w-80 flex-col rounded-xl shadow-xl sm:w-96"
          style={{ backgroundColor: "#fff", maxHeight: "560px" }}
        >
          <div className="flex items-center justify-between rounded-t-xl px-4 py-3 text-white" style={{ backgroundColor: "var(--color-primary, #8B5CF6)" }}>
            <span className="font-semibold">{t("title")}</span>
            <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <button onClick={resetChat} className="text-xs text-white/70 hover:text-white" title="Nouvelle conversation">
                  ↺
                </button>
              )}
              <button onClick={() => onToggle(false)} className="text-white/80 hover:text-white text-lg leading-none">&times;</button>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ minHeight: "200px", maxHeight: "350px" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user" ? "text-white" : "text-gray-800"
                  }`}
                  style={{
                    backgroundColor: m.role === "user" ? "var(--color-primary, #8B5CF6)" : "#f3f4f6",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-400">...</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="flex flex-wrap gap-1.5 border-t px-3 pb-2 pt-2" style={{ borderColor: "#e5e7eb" }}>
            {(suggestions.length > 0 ? suggestions : quickActions.map((a) => (locale === "ar" ? a.labelAr : a.label))).map((label) => (
              <button
                key={label}
                onClick={() => send(label)}
                className="rounded-full px-2.5 py-1 text-xs transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#f3f4f6", color: "#374151", fontSize: "0.7rem" }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t p-3" style={{ borderColor: "#e5e7eb" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "#d1d5db" }}
            />
            <button
              onClick={() => send(input)}
              disabled={loading}
              className="rounded-lg px-3 py-2 text-sm text-white disabled:opacity-50"
              style={{ backgroundColor: "var(--color-primary, #8B5CF6)" }}
            >
              {t("send")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
