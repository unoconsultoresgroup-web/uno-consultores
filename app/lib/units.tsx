/* ============================================================
   uno consultores — Fuente única de datos de los CINCO SERVICIOS
   Usada por: la sección del home (#servicios), el dropdown del nav,
   el footer y las páginas de detalle /servicios/[slug].
   ============================================================ */
import type { JSX } from "react";

/* ---------- Íconos (compartidos con la sección del home) ---------- */
export const IconRRHH = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20c0-3.6 3-5.5 6.5-5.5s6.5 1.9 6.5 5.5" />
    <path d="M17 8.5a3 3 0 0 0 0-1M19 20c0-2.6-1.2-4.3-3-5.2" />
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
export interface UnitService {
  title: string;
  desc: string;
}

export interface Unit {
  /** clave corta usada por el script de la sección del home (data-u / data-p) */
  key: "rrhh" | "do" | "psico" | "legal" | "tech";
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

/* ---------- Datos ---------- */
export const units: Unit[] = [
  {
    key: "rrhh",
    slug: "recursos-humanos",
    name: "Gestión del Talento",
    short: "Atracción, desarrollo y desempeño",
    accent: "#1F1F24",
    eyebrow: "Servicio · Gestión del Talento",
    tagline: "Atracción, desarrollo y desempeño.",
    intro:
      "Diseñamos e implementamos sistemas de gestión del talento que permiten atraer, desarrollar y retener a las personas adecuadas, con procesos claros, medibles y alineados a los objetivos del negocio.",
    highlight:
      "Gestión del talento ordenada y medible, lista para escalar.",
    services: [
      {
        title: "Reclutamiento y selección",
        desc: "Definimos el perfil, evaluamos candidatos y acompañamos todo el proceso hasta incorporar a la persona adecuada para el puesto y la organización.",
      },
      {
        title: "Onboarding",
        desc: "Diseñamos procesos de ingreso que reducen los tiempos de adaptación, aceleran el aprendizaje y mejoran la experiencia de incorporación.",
      },
      {
        title: "Gestión del desempeño",
        desc: "Implementamos sistemas de objetivos, evaluaciones y feedback que permiten medir resultados y tomar mejores decisiones sobre desarrollo y reconocimiento.",
      },
      {
        title: "Gestión del talento",
        desc: "Identificamos colaboradores con potencial y diseñamos planes de desarrollo que preparan a las personas para asumir nuevos desafíos.",
      },
      {
        title: "Planes de carrera",
        desc: "Diseñamos recorridos de crecimiento y criterios de promoción que brindan claridad sobre las oportunidades de desarrollo dentro de la organización.",
      },
      {
        title: "Capacitación y desarrollo",
        desc: "Detectamos necesidades de formación y desarrollamos programas que fortalecen habilidades técnicas, de liderazgo y de gestión.",
      },
    ],
    deliverables: [
      "Procesos de selección documentados y replicables",
      "Tableros e indicadores de desempeño",
      "Mapa de talento y planes de desarrollo",
      "Bandas salariales y política de beneficios",
      "Programa de onboarding a medida",
    ],
    Icon: IconRRHH,
  },
  {
    key: "do",
    slug: "desarrollo-organizacional",
    name: "Desarrollo Organizacional",
    short: "Cultura, liderazgo y transformación",
    accent: "#3C3C42",
    eyebrow: "Servicio · Desarrollo Organizacional",
    tagline: "Cultura, liderazgo y transformación.",
    intro:
      "Acompañamos el crecimiento de las organizaciones fortaleciendo su cultura, desarrollando liderazgos y construyendo estructuras capaces de sostener el cambio y la evolución del negocio.",
    highlight:
      "Crecimiento con identidad: estructura, liderazgo y cultura alineados.",
    services: [
      {
        title: "Diagnóstico organizacional",
        desc: "Relevamiento de estructura, cultura y procesos con informe de hallazgos y plan de mejora.",
      },
      {
        title: "Estructura organizacional",
        desc: "Diseño de organigramas, roles, responsabilidades y niveles de decisión alineados a la estrategia del negocio.",
      },
      {
        title: "Cultura organizacional",
        desc: "Definición de valores, comportamientos y prácticas que fortalecen la identidad organizacional.",
      },
      {
        title: "Gestión del cambio",
        desc: "Planes de implementación y acompañamiento para facilitar la adopción de nuevas prácticas y procesos.",
      },
      {
        title: "Desarrollo de líderes",
        desc: "Programas de formación y acompañamiento para mandos medios, jefaturas y equipos de conducción.",
      },
      {
        title: "Employee Experience",
        desc: "Diagnóstico y mejora de la experiencia del colaborador en los principales momentos de su recorrido laboral.",
      },
      {
        title: "Team Building",
        desc: "Jornadas y actividades orientadas a fortalecer vínculos, confianza y colaboración entre equipos.",
      },
    ],
    deliverables: [
      "Informe de diagnóstico con plan de acción",
      "Programa de desarrollo de liderazgo",
      "Mapa de carrera y matriz de sucesión",
      "Organigrama y descriptivos de puesto",
      "Propuesta de valor al empleado (EVP)",
    ],
    Icon: IconDO,
  },
  {
    key: "psico",
    slug: "psicologia-laboral",
    name: "Psicología Laboral",
    short: "Evaluación y bienestar",
    accent: "#9b3cdf",
    eyebrow: "Servicio · Psicología Laboral",
    tagline: "Evaluación y bienestar.",
    intro:
      "Aportamos evaluación profesional, análisis técnico y herramientas psicológicas para acompañar decisiones vinculadas al talento, el desempeño y el bienestar.",
    highlight:
      "Psicología organizacional con enfoque estratégico.",
    services: [
      {
        title: "Psicotécnicos laborales",
        desc: "Evaluaciones profesionales con respaldo técnico para identificar potencial y orientar las decisiones sobre talento.",
      },
      {
        title: "Evaluación por competencias",
        desc: "Dinámicas de evaluación por competencias que observan a la persona en situación, con devolución estructurada.",
      },
      {
        title: "Mapeo de potencial",
        desc: "Identificación de capacidades y proyección de crecimiento para planificar el desarrollo del talento.",
      },
    ],
    deliverables: [
      "Informes psicotécnicos firmados por profesional matriculado",
      "Diseño y conducción de assessment centers",
      "Procesos de coaching con objetivos medibles",
      "Encuesta y reporte de clima organizacional",
      "Plan de bienestar y acompañamiento",
    ],
    Icon: IconPsico,
  },
  {
    key: "legal",
    slug: "legal-laboral",
    name: "Legal Integral",
    short: "Cumplimiento y relaciones laborales",
    accent: "#55555C",
    eyebrow: "Servicio · Legal Integral",
    tagline: "Cumplimiento y relaciones laborales.",
    intro:
      "Combinamos experiencia jurídica laboral y gestión de recursos humanos para prevenir contingencias, asegurar el cumplimiento normativo y construir relaciones laborales sólidas y sostenibles.",
    highlight:
      "La gestión laboral de tu empresa, resuelta de forma integral.",
    services: [
      {
        title: "Auditorías laborales",
        desc: "Revisión integral de legajos y documentación para detectar y corregir brechas antes de que sean un problema.",
      },
      {
        title: "Reglamentos internos",
        desc: "Redacción y actualización de reglamentos internos claros y conformes a la normativa vigente.",
      },
      {
        title: "Asesoramiento Legal Integral",
        desc: "Diseño de políticas de personas que ordenan la gestión y dan previsibilidad a las decisiones.",
      },
      {
        title: "Relaciones laborales",
        desc: "Gestión del vínculo con colaboradores y representantes, con foco en preservar la relación laboral.",
      },
      {
        title: "Procedimientos disciplinarios",
        desc: "Acompañamiento técnico y humano en sanciones y procesos disciplinarios, minimizando el riesgo legal.",
      },
      {
        title: "Compliance laboral",
        desc: "Implementación y auditoría del cumplimiento normativo para mantener a tu empresa en regla y protegida.",
      },
    ],
    deliverables: [
      "Modelos de contratos y documentación al día",
      "Protocolos de desvinculación y sanciones",
      "Programa de compliance laboral",
      "Procesos de mediación documentados",
      "Informe de auditoría documental con plan de regularización",
    ],
    Icon: IconLegal,
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

export const getUnit = (slug: string): Unit | undefined =>
  units.find((u) => u.slug === slug);
