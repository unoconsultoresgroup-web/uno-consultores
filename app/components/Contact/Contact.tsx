"use client";

import { useState } from "react";
import "./Contact.css";
import { useT, useLang } from "../../lib/i18n";
import CtaWaves from "../CtaWaves/CtaWaves";

type Status = "idle" | "sending" | "ok" | "error";
type Field = "name" | "company" | "email" | "phone" | "unit" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = {
  name: "",
  company: "",
  email: "",
  phone: "",
  unit: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Permitidos en teléfono: dígitos, espacio, + - ( ) y puntos.
const PHONE_ALLOWED_RE = /[^\d+\-()\s.]/g;

const MESSAGES = {
  es: {
    nameReq: "Ingresá tu nombre.",
    emailReq: "Ingresá tu email.",
    emailInvalid: "Ingresá un email válido (ej. nombre@empresa.com).",
    phoneInvalid: "El teléfono solo puede contener números.",
    phoneShort: "Ingresá un teléfono válido.",
  },
  en: {
    nameReq: "Please enter your name.",
    emailReq: "Please enter your email.",
    emailInvalid: "Please enter a valid email (e.g. name@company.com).",
    phoneInvalid: "The phone can only contain digits.",
    phoneShort: "Please enter a valid phone number.",
  },
} as const;

export default function Contact() {
  const t = useT();
  const { lang } = useLang();
  const un = t.unitNames;
  const m = MESSAGES[lang];

  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const sendingLabel = lang === "es" ? "Enviando…" : "Sending…";
  const errorLabel =
    lang === "es"
      ? "No pudimos enviar tu solicitud. Probá de nuevo o escribinos por email."
      : "We couldn't send your request. Please try again or email us.";

  function validate(v: Values): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = m.nameReq;

    if (!v.email.trim()) e.email = m.emailReq;
    else if (!EMAIL_RE.test(v.email.trim())) e.email = m.emailInvalid;

    // Teléfono es opcional: solo validamos si hay algo escrito.
    const phone = v.phone.trim();
    if (phone) {
      if (PHONE_ALLOWED_RE.test(phone)) e.phone = m.phoneInvalid;
      else if (phone.replace(/\D/g, "").length < 6) e.phone = m.phoneShort;
    }
    return e;
  }

  function update(field: Field, raw: string) {
    // En teléfono filtramos en vivo cualquier carácter no permitido.
    const value = field === "phone" ? raw.replace(PHONE_ALLOWED_RE, "") : raw;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Limpiamos el error del campo a medida que el usuario corrige.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("ok");
      setValues(EMPTY);
      setErrors({});
      document
        .getElementById("formOk")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section contact" id="contacto">
      <span className="contact-divider" aria-hidden="true" />
      <CtaWaves />
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2
            style={{
              fontSize: "clamp(1.9rem,3.6vw,2.7rem)",
              marginBottom: "1.2rem",
            }}
          >
            {t.contact.h2}
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.1rem",
              marginBottom: 0,
            }}
          >
            {t.contact.p}
          </p>
        </div>
        <div className="form-card">
          <h3>{t.contact.formTitle}</h3>
          <p className="sub">{t.contact.formSub}</p>
          <div
            className={`form-ok${status === "ok" ? " show" : ""}`}
            id="formOk"
          >
            {t.contact.ok}
          </div>
          {status === "error" && (
            <div className="form-error show" role="alert">
              {errorLabel}
            </div>
          )}
          <form id="quoteForm" noValidate onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field">
                <label>{t.contact.fName}</label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={errors.name ? "invalid" : ""}
                  aria-invalid={!!errors.name}
                  placeholder={t.contact.fNamePh}
                  data-cursor=""
                />
                {errors.name && (
                  <span className="field-error">{errors.name}</span>
                )}
              </div>
              <div className="field">
                <label>{t.contact.fCompany}</label>
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder={t.contact.fCompanyPh}
                  data-cursor=""
                />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>{t.contact.fEmail}</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={errors.email ? "invalid" : ""}
                  aria-invalid={!!errors.email}
                  placeholder={t.contact.fEmailPh}
                  data-cursor=""
                />
                {errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>
              <div className="field">
                <label>{t.contact.fPhone}</label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={errors.phone ? "invalid" : ""}
                  aria-invalid={!!errors.phone}
                  placeholder={t.contact.fPhonePh}
                  data-cursor=""
                />
                {errors.phone && (
                  <span className="field-error">{errors.phone}</span>
                )}
              </div>
            </div>
            <div className="field">
              <label>{t.contact.fUnit}</label>
              <select
                name="unit"
                value={values.unit}
                onChange={(e) => update("unit", e.target.value)}
                data-cursor=""
              >
                <option value="">{t.contact.fUnitPh}</option>
                <option>{un.rrhh.name}</option>
                <option>{un.do.name}</option>
                <option>{un.psico.name}</option>
                <option>{un.legal.name}</option>
                <option>{un.tech.name}</option>
                <option>{t.contact.fUnitProj}</option>
              </select>
            </div>
            <div className="field">
              <label>{t.contact.fMsg}</label>
              <textarea
                name="message"
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={t.contact.fMsgPh}
                data-cursor=""
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              data-cursor=""
              disabled={status === "sending"}
            >
              {status === "sending" ? sendingLabel : t.contact.submit}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
