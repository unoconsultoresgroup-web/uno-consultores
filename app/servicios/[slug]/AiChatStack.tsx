"use client";

import { useState, type CSSProperties } from "react";
import AiChatDemo, { type ChatMsg } from "./AiChatDemo";

export type Convo = { title: string; msgs: readonly ChatMsg[] };

/**
 * Pila de chats: el activo va al frente y se anima; los demás quedan atrás en
 * gris, flotando. Al pasar el cursor sobre uno, pasa a ser el principal.
 */
export default function AiChatStack({
  convos,
  online,
}: {
  convos: readonly Convo[];
  online: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="ai-stack">
      {convos.map((c, i) => {
        const pos = i - active;
        const isActive = pos === 0;
        const style: CSSProperties = {
          transform: `translateX(${pos * 52}px) translateY(${
            isActive ? 0 : 26
          }px) scale(${isActive ? 1 : 0.9}) rotate(${pos * 4}deg)`,
          zIndex: 10 - Math.abs(pos),
          opacity: isActive ? 1 : 0.55,
          filter: isActive ? "none" : "grayscale(0.95)",
        };
        return (
          <div
            key={c.title}
            className={`ai-stack-card${isActive ? " is-active" : ""}`}
            style={style}
            onMouseEnter={() => setActive(i)}
          >
            <div
              className="ai-stack-float"
              style={{ animationDelay: `${i * -2.6}s` }}
            >
              <AiChatDemo
                title={c.title}
                online={online}
                messages={c.msgs}
                animated={isActive}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
