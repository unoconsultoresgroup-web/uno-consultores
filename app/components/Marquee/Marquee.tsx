import "./Marquee.css";

const ITEMS = [
  "Selección",
  "Desarrollo Organizacional",
  "Psicología Laboral",
  "Legal Integral",
  "Tecnología",
  "Transformación Organizacional",
  "Talento",
  "Acompañamiento Integral",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track" id="mqTrack">
        {ITEMS.map((t) => (
          <span key={`a-${t}`}>{t}</span>
        ))}
        {ITEMS.map((t) => (
          <span key={`b-${t}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}
