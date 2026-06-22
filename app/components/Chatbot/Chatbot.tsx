"use client";

import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import { useT } from "../../lib/i18n";

/** Mensaje visible en la conversación. */
type Msg = { role: "bot" | "user"; text: string };

/** Pasos del flujo guiado. Cada uno corresponde al dato que estamos pidiendo. */
type Step = "name" | "company" | "email" | "phone" | "message" | "sending" | "done" | "error";

type Lead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY_LEAD: Lead = { name: "", company: "", email: "", phone: "", message: "" };

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Chatbot() {
  const t = useT();
  const c = t.chat;

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [lead, setLead] = useState<Lead>(EMPTY_LEAD);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Saludo inicial: se inyecta la primera vez que se abre el chat.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", text: c.greeting }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Autoscroll al último mensaje y foco en el input cuando corresponde.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
    if (open && (step !== "sending" && step !== "done")) {
      inputRef.current?.focus();
    }
  }, [messages, open, step]);

  const pushBot = (text: string) => setMessages((m) => [...m, { role: "bot", text }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { role: "user", text }]);

  /** Envía el lead reusando la API de propuestas (Resend). */
  const submit = async (finalLead: Lead) => {
    setStep("sending");
    pushBot(c.sending);
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalLead.name,
          company: finalLead.company,
          email: finalLead.email,
          phone: finalLead.phone,
          unit: "💬 Consulta desde el chat",
          message: finalLead.message,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStep("done");
      pushBot(c.success.replace("{name}", finalLead.name));
    } catch {
      setStep("error");
      pushBot(c.error);
    }
  };

  /** Procesa el valor ingresado según el paso actual del flujo. */
  const handleValue = (raw: string) => {
    const value = raw.trim();
    if (!value && step !== "phone") return;

    pushUser(value || c.skip);

    switch (step) {
      case "name": {
        const next = { ...lead, name: value };
        setLead(next);
        setStep("company");
        pushBot(c.askCompany.replace("{name}", value));
        break;
      }
      case "company": {
        setLead((l) => ({ ...l, company: value }));
        setStep("email");
        pushBot(c.askEmail);
        break;
      }
      case "email": {
        if (!isValidEmail(value)) {
          pushBot(c.invalidEmail);
          break; // seguimos en el paso "email"
        }
        setLead((l) => ({ ...l, email: value }));
        setStep("phone");
        pushBot(c.askPhone);
        break;
      }
      case "phone": {
        setLead((l) => ({ ...l, phone: value }));
        setStep("message");
        pushBot(c.askMessage);
        break;
      }
      case "message": {
        const finalLead = { ...lead, message: value };
        setLead(finalLead);
        void submit(finalLead);
        break;
      }
    }
  };

  const onSend = () => {
    handleValue(input);
    setInput("");
  };

  const onSkipPhone = () => {
    setInput("");
    handleValue("");
  };

  const restart = () => {
    setLead(EMPTY_LEAD);
    setStep("name");
    setMessages([{ role: "bot", text: c.greeting }]);
    setInput("");
  };

  const inputDisabled = step === "sending" || step === "done" || step === "error";

  return (
    <>
      <button
        type="button"
        className={`chatbot-fab${open ? " is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? c.close : c.open}
        aria-expanded={open}
        data-cursor=""
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9l-4 4v-4H6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="chatbot-panel"
          role="dialog"
          aria-label={c.title}
        >
          <header className="chatbot-head">
            <div className="chatbot-head__id">
              <span className="chatbot-head__dot" aria-hidden="true" />
              <div>
                <strong className="chatbot-head__title">{c.title}</strong>
                <span className="chatbot-head__sub">{c.subtitle}</span>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-head__close"
              onClick={() => setOpen(false)}
              aria-label={c.close}
              data-cursor=""
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div className="chatbot-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-foot">
            {step === "done" || step === "error" ? (
              <button
                type="button"
                className="btn btn-primary chatbot-restart"
                onClick={restart}
                data-cursor=""
              >
                {c.restart}
              </button>
            ) : (
              <form
                className="chatbot-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSend();
                }}
              >
                {step === "phone" && (
                  <button
                    type="button"
                    className="chatbot-skip"
                    onClick={onSkipPhone}
                    data-cursor=""
                  >
                    {c.skip}
                  </button>
                )}
                <input
                  ref={inputRef}
                  className="chatbot-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={c.placeholder}
                  disabled={inputDisabled}
                  aria-label={c.placeholder}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="chatbot-send"
                  disabled={inputDisabled || (!input.trim() && step !== "phone")}
                  aria-label={c.send}
                  data-cursor=""
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path
                      d="M4 12l16-8-6 16-3-6-7-2z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
