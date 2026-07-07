/* ============================================================
   uno consultores — Fuente única de datos de los servicios
   Usada por: la sección del home (#servicios), el dropdown del nav,
   el footer y las páginas de detalle /servicios/[slug].

   4 servicios PRINCIPALES (con página) + RED DE ESPECIALISTAS
   (Psicología y Legal, como tarjetas, sin página propia).
   ============================================================ */
import type { JSX } from "react";

/* ---------- Íconos ---------- */
export const IconRRHH = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20c0-3.6 3-5.5 6.5-5.5s6.5 1.9 6.5 5.5" />
    <path d="M17 8.5a3 3 0 0 0 0-1M19 20c0-2.6-1.2-4.3-3-5.2" />
  </svg>
);
export const IconSeleccion = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="10.5" cy="10.5" r="6.2" />
    <path d="M15.2 15.2L21 21" />
    <path d="M10.5 8v5M8 10.5h5" />
  </svg>
);
export const IconFormacion = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M12 4L2.5 9 12 14l9.5-5L12 4Z" />
    <path d="M6.5 11v5c0 1 2.5 2.5 5.5 2.5s5.5-1.5 5.5-2.5v-5" />
    <path d="M21.5 9v5" />
  </svg>
);
export const IconDO = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
  </svg>
);
export const IconPsico = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3a6 6 0 0 0-6 6c0 2 1 3.3 1 5 0 1.5 1.5 2.5 5 2.5s5-1 5-2.5c0-1.7 1-3 1-5a6 6 0 0 0-6-6Z" />
    <path d="M9.5 21h5" />
  </svg>
);
export const IconLegal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18M5 7h14M7 7l-3 6h6zM17 7l3 6h-6z" />
  </svg>
);
export const IconTech = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 20h8M12 17v3M7 9l2 2-2 2M12 13h4" />
  </svg>
);

/* ---------- Tipos ---------- */
export type UnitKey = "rrhh" | "seleccion" | "do" | "tech";
export type SpecialistKey = "psico" | "legal";

export interface UnitService {
  title: string;
  desc: string;
}

export interface Unit {
  /** clave corta usada por el mapa del home (data-u / data-p) e i18n */
  key: UnitKey;
  /** segmento de URL: /servicios/<slug> */
  slug: string;
  name: string;
  /** descripción corta para listados y dropdown */
  short: string;
  accent: string;
  eyebrow: string;
  /** frase ancla de la unidad */
  tagline: string;
  /** introducción ampliada (página de detalle) */
  intro: string;
  /** beneficio diferencial, una línea destacada */
  highlight: string;
  services: UnitService[];
  /** entregables concretos ("qué incluye") */
  deliverables: string[];
  Icon: () => JSX.Element;
}

/** Especialista de la "red": tarjeta en el home, sin página propia. */
export interface Specialist {
  key: SpecialistKey;
  accent: string;
  Icon: () => JSX.Element;
}

/* ---------- Servicios principales (ES) ---------- */
export const units: Unit[] = [
  {
    key: "rrhh",
    slug: "gestion-de-personas",
    name: "Gestión de Personas",
    short: "Cultura y personas",
    accent: "#1F1F24",
    eyebrow: "Servicio · Gestión de Personas",
    tagline: "Cultura y personas.",
    intro:
      "Ordenamos y profesionalizamos la gestión de personas: diseñamos los procesos, fortalecemos la cultura y desarrollamos el liderazgo para que la organización crezca sobre bases sólidas.",
    highlight:
      "Profesionalizamos la gestión de personas para acompañar el crecimiento.",
    services: [
      {
        title: "Diagnóstico organizacional",
        desc: "Relevamos estructura, procesos y clima para identificar prioridades y un plan de mejora concreto.",
      },
      {
        title: "Diseño de procesos de RRHH",
        desc: "Ordenamos y documentamos los procesos clave de gestión de personas para dar previsibilidad y escala.",
      },
      {
        title: "Clima y cultura organizacional",
        desc: "Medimos el clima y fortalecemos los valores y comportamientos que definen la identidad de la organización.",
      },
      {
        title: "Evaluación de desempeño",
        desc: "Implementamos objetivos, evaluaciones y feedback para medir resultados y decidir mejor sobre el desarrollo.",
      },
      {
        title: "Desarrollo de liderazgo",
        desc: "Formamos y acompañamos a jefaturas y mandos medios para que conduzcan equipos con criterio.",
      },
      {
        title: "Consultoría externa (HRBP)",
        desc: "Sumamos un socio estratégico de RRHH que acompaña a la dirección en las decisiones sobre personas.",
      },
    ],
    deliverables: [
      "Diagnóstico organizacional con plan de acción",
      "Procesos de RRHH diseñados y documentados",
      "Sistema de evaluación de desempeño",
      "Programa de desarrollo de liderazgo",
      "Acompañamiento HRBP como consultoría externa",
    ],
    Icon: IconRRHH,
  },
  {
    key: "seleccion",
    slug: "seleccion-de-talento",
    name: "Selección de Talento",
    short: "Atracción de talento",
    accent: "#3C3C42",
    eyebrow: "Servicio · Selección de Talento",
    tagline: "Atracción de talento.",
    intro:
      "Acompañamos todo el proceso de incorporación: definimos el perfil, buscamos y evaluamos candidatos y presentamos las mejores opciones alineadas a la cultura y al negocio.",
    highlight:
      "Incorporamos talento alineado a la cultura y a los objetivos del negocio.",
    services: [
      {
        title: "Definición de perfiles",
        desc: "Definimos junto al área el perfil, las competencias y los criterios de éxito de la búsqueda.",
      },
      {
        title: "Reclutamiento y búsqueda",
        desc: "Activamos los canales y hacemos sourcing para atraer a los mejores candidatos disponibles.",
      },
      {
        title: "Entrevistas por competencias",
        desc: "Evaluamos a los candidatos en situación, con entrevistas estructuradas por competencias.",
      },
      {
        title: "Evaluaciones psicotécnicas",
        desc: "Sumamos evaluación profesional para respaldar la decisión con criterio técnico.",
      },
      {
        title: "Presentación de ternas",
        desc: "Presentamos una terna final con informe comparativo para facilitar la elección.",
      },
      {
        title: "Onboarding de ingresos",
        desc: "Diseñamos el ingreso para que la persona se integre rápido y con buena experiencia.",
      },
    ],
    deliverables: [
      "Perfiles de búsqueda definidos y validados",
      "Proceso de reclutamiento y sourcing",
      "Entrevistas por competencias y evaluaciones psicotécnicas",
      "Terna final con informe comparativo",
      "Plan de onboarding para el ingreso",
    ],
    Icon: IconSeleccion,
  },
  {
    key: "do",
    slug: "formacion-y-desarrollo",
    name: "Formación y Desarrollo",
    short: "Aprendizaje y liderazgo",
    accent: "#55555C",
    eyebrow: "Servicio · Formación y Desarrollo",
    tagline: "Aprendizaje y liderazgo.",
    intro:
      "Diseñamos experiencias de aprendizaje que fortalecen las habilidades técnicas, de liderazgo y de gestión que tu equipo necesita hoy y para el futuro del trabajo.",
    highlight:
      "Desarrollamos habilidades para el desempeño actual y el futuro del trabajo.",
    services: [
      {
        title: "Capacitaciones in company",
        desc: "Diseñamos y dictamos capacitaciones a medida de las necesidades de cada equipo.",
      },
      {
        title: "Programas de liderazgo",
        desc: "Formamos líderes con herramientas prácticas para conducir, motivar y desarrollar personas.",
      },
      {
        title: "Comunicación y feedback",
        desc: "Fortalecemos la comunicación y la cultura de feedback para mejorar el trabajo diario.",
      },
      {
        title: "Trabajo en equipo",
        desc: "Dinámicas orientadas a fortalecer la confianza, la colaboración y el trabajo conjunto.",
      },
      {
        title: "Tiempo y productividad",
        desc: "Herramientas para gestionar mejor el tiempo, las prioridades y la energía del equipo.",
      },
      {
        title: "Empleabilidad y primer empleo",
        desc: "Programas que preparan a las personas para insertarse y crecer en el mundo laboral.",
      },
    ],
    deliverables: [
      "Plan de capacitación a medida",
      "Programa de desarrollo de liderazgo",
      "Talleres de comunicación y feedback",
      "Dinámicas de equipo y colaboración",
      "Indicadores de impacto de la formación",
    ],
    Icon: IconFormacion,
  },
  {
    key: "tech",
    slug: "tecnologia-automatizacion",
    name: "Tecnología y Producto",
    short: "Productos digitales, automatización e IA",
    accent: "#2A2A30",
    eyebrow: "Servicio · Tecnología y Producto",
    tagline: "Del problema de negocio al resultado medible.",
    intro:
      "Acompañamos a las organizaciones a repensar cómo operan y entregan valor. Identificamos dónde la tecnología genera mayor impacto, construimos los productos digitales que lo hacen posible y automatizamos las operaciones para ganar velocidad, consistencia y capacidad de crecer.",
    highlight:
      "Resolvemos el problema completo: del diagnóstico a la operación.",
    services: [
      {
        title: "Productos digitales a medida",
        desc: "Creamos las aplicaciones y plataformas con las que tu equipo y tus clientes operan a diario, diseñadas para resolver un problema concreto y sostener el crecimiento.",
      },
      {
        title: "Automatización de operaciones",
        desc: "Sacamos del medio el trabajo manual y repetitivo para reducir errores y tiempos, y dejar al equipo enfocado en lo que aporta valor.",
      },
      {
        title: "Agentes de inteligencia artificial",
        desc: "Sumamos asistentes que responden, analizan y ejecutan tareas conectados a tu información, ampliando la capacidad del equipo sin agregar complejidad.",
      },
      {
        title: "Integración de sistemas y datos",
        desc: "Conectamos las herramientas que hoy funcionan por separado para que la información fluya y cada decisión se apoye en datos confiables.",
      },
      {
        title: "Estrategia y evolución del producto",
        desc: "Definimos junto a tu equipo qué construir y en qué orden, y acompañamos la mejora continua a medida que el negocio cambia.",
      },
    ],
    deliverables: [
      "Un producto digital en funcionamiento, adoptado por tus equipos",
      "Reducción medible de tiempos y errores en los procesos intervenidos",
      "Tareas y flujos críticos operando de forma autónoma",
      "Información unificada en una única fuente confiable",
      "Hoja de ruta de evolución con prioridades de negocio",
    ],
    Icon: IconTech,
  },
];

/* ---------- Red de especialistas (tarjetas, sin página) ----------
   Los textos (nombre + items) viven en i18n (t.specialists), acá solo
   el ícono y el color de acento. */
export const specialists: Specialist[] = [
  { key: "psico", accent: "#9b3cdf", Icon: IconPsico },
  { key: "legal", accent: "#55555C", Icon: IconLegal },
];

/* ---------- Contenido EN de detalle (para /servicios/[slug]) ----------
   El ES vive en el array `units` de arriba; acá solo el inglés. */
export type UnitDetailContent = {
  tagline: string;
  intro: string;
  highlight: string;
  services: UnitService[];
  deliverables: string[];
};

export const unitDetailEn: Record<UnitKey, UnitDetailContent> = {
  rrhh: {
    tagline: "Culture and people.",
    intro:
      "We bring order and professionalism to people management: we design the processes, strengthen the culture and develop leadership so the organization grows on solid ground.",
    highlight: "We professionalize people management to support growth.",
    services: [
      {
        title: "Organizational diagnosis",
        desc: "We assess structure, processes and climate to identify priorities and a concrete improvement plan.",
      },
      {
        title: "HR process design",
        desc: "We organize and document the key people processes to bring predictability and scale.",
      },
      {
        title: "Climate and culture",
        desc: "We measure climate and strengthen the values and behaviors that define the organization's identity.",
      },
      {
        title: "Performance management",
        desc: "We implement goals, reviews and feedback to measure results and make better development decisions.",
      },
      {
        title: "Leadership development",
        desc: "We train and coach managers and team leads to lead their teams with sound judgment.",
      },
      {
        title: "External consulting (HRBP)",
        desc: "We add a strategic HR partner who supports leadership in people decisions.",
      },
    ],
    deliverables: [
      "Organizational diagnosis with an action plan",
      "Designed and documented HR processes",
      "Performance management system",
      "Leadership development program",
      "HRBP support as external consulting",
    ],
  },
  seleccion: {
    tagline: "Attracting talent.",
    intro:
      "We support the entire hiring process: we define the profile, source and assess candidates and present the best options aligned to culture and business.",
    highlight: "We bring in talent aligned to the culture and the business goals.",
    services: [
      {
        title: "Profile definition",
        desc: "We define the profile, competencies and success criteria of the search together with the area.",
      },
      {
        title: "Recruitment & sourcing",
        desc: "We activate channels and source to attract the best available candidates.",
      },
      {
        title: "Competency interviews",
        desc: "We assess candidates in context, with structured competency-based interviews.",
      },
      {
        title: "Psychometric assessments",
        desc: "We add professional evaluation to back the decision with technical criteria.",
      },
      {
        title: "Shortlist presentation",
        desc: "We present a final shortlist with a comparative report to ease the choice.",
      },
      {
        title: "Onboarding",
        desc: "We design the joining process so the person integrates fast and with a good experience.",
      },
    ],
    deliverables: [
      "Defined and validated search profiles",
      "Recruitment and sourcing process",
      "Competency interviews and psychometric assessments",
      "Final shortlist with comparative report",
      "Onboarding plan for the new hire",
    ],
  },
  do: {
    tagline: "Learning and leadership.",
    intro:
      "We design learning experiences that strengthen the technical, leadership and management skills your team needs today and for the future of work.",
    highlight: "We build skills for today's performance and the future of work.",
    services: [
      {
        title: "In-company training",
        desc: "We design and deliver training tailored to each team's needs.",
      },
      {
        title: "Leadership programs",
        desc: "We develop leaders with practical tools to lead, motivate and grow people.",
      },
      {
        title: "Communication & feedback",
        desc: "We strengthen communication and a feedback culture to improve daily work.",
      },
      {
        title: "Teamwork",
        desc: "Dynamics aimed at strengthening trust, collaboration and joint work.",
      },
      {
        title: "Time & productivity",
        desc: "Tools to better manage time, priorities and the team's energy.",
      },
      {
        title: "Employability & first job",
        desc: "Programs that prepare people to enter and grow in the working world.",
      },
    ],
    deliverables: [
      "Tailored training plan",
      "Leadership development program",
      "Communication and feedback workshops",
      "Team and collaboration dynamics",
      "Training impact indicators",
    ],
  },
  tech: {
    tagline: "From business problem to measurable result.",
    intro:
      "We help organizations rethink how they operate and deliver value. We pinpoint where technology has the greatest impact, build the digital products that make it possible and automate operations to gain speed, consistency and room to grow.",
    highlight: "We solve the whole problem: from diagnosis to operation.",
    services: [
      {
        title: "Custom digital products",
        desc: "We build the applications and platforms your team and customers use every day, designed to solve a concrete problem and support growth.",
      },
      {
        title: "Operations automation",
        desc: "We remove manual, repetitive work to cut errors and time, keeping the team focused on what adds value.",
      },
    ],
    deliverables: [
      "A working digital product, adopted by your teams",
      "Measurable reduction of time and errors in the processes we touch",
      "Critical tasks and flows running autonomously",
      "Information unified in a single reliable source",
      "An evolution roadmap with business priorities",
    ],
  },
};

export const getUnit = (slug: string): Unit | undefined =>
  units.find((u) => u.slug === slug);
