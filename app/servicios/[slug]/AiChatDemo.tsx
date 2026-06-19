"use client";

import { useEffect, useRef, useState } from "react";

export type ChatMsg = { role: "user" | "assistant"; text: string };

/**
 * Demo animada de un agente de IA: reproduce una conversación con efecto de
 * tipeo y burbuja de "escribiendo…", en loop. Solo decorativo.
 */
export default function AiChatDemo({
  title,
  online,
  messages,
  animated = true,
}: {
  title: string;
  online: string;
  messages: readonly ChatMsg[];
  /** Si es false, muestra la conversación completa sin animar (tarjeta de fondo). */
  animated?: boolean;
}) {
  const [shown, setShown] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState<ChatMsg | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) {
      setShown([...messages]);
      setTyping(null);
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((r) => {
        timers.push(setTimeout(r, ms));
      });

    const run = async () => {
      while (!cancelled) {
        setShown([]);
        setTyping(null);
        await wait(700);
        for (const m of messages) {
          if (cancelled) return;
          if (m.role === "assistant") {
            setTyping({ role: "assistant", text: "" });
            await wait(reduce ? 200 : 750);
            if (cancelled) return;
            if (!reduce) {
              for (let i = 1; i <= m.text.length; i++) {
                if (cancelled) return;
                setTyping({ role: "assistant", text: m.text.slice(0, i) });
                await wait(20);
              }
            }
          } else {
            await wait(reduce ? 150 : 450);
          }
          if (cancelled) return;
          setShown((s) => [...s, m]);
          setTyping(null);
          await wait(reduce ? 250 : 650);
        }
        await wait(reduce ? 1200 : 3000);
      }
    };
    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [messages, animated]);

  // autoscroll al fondo
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, typing]);

  return (
    <div className="ai-chat" role="img" aria-label={title}>
      <div className="ai-chat-head">
        <span className="ai-chat-av" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="7" width="16" height="12" rx="3" />
            <path d="M12 7V4M9 12h.01M15 12h.01M9 16h6" />
            <path d="M2 12h2M20 12h2" />
          </svg>
        </span>
        <div className="ai-chat-id">
          <strong>{title}</strong>
          <span className="ai-chat-status">
            <i /> {online}
          </span>
        </div>
      </div>
      <div className="ai-chat-body" ref={scrollRef}>
        {shown.map((m, i) => (
          <div key={i} className={`ai-bubble ai-bubble--${m.role}`}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="ai-bubble ai-bubble--assistant">
            {typing.text ? (
              typing.text
            ) : (
              <span className="ai-typing" aria-hidden="true">
                <i /><i /><i />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
