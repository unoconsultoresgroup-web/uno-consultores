"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}>({ lang: "es", setLang: () => {}, toggle: () => {} });

export function LangProvider({
  children,
  initialLang = "es",
}: {
  children: ReactNode;
  /** Idioma detectado en el servidor (geo / Accept-Language) vía cookie. */
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    // Una elección manual previa (localStorage) siempre gana sobre la
    // detección automática del servidor.
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "es") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    // Persistimos también en cookie para que el SSR coincida en la próxima
    // navegación y no haya parpadeo de idioma.
    document.cookie = `lang=${l};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    document.documentElement.lang = l;
  };
  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

/** Hook de traducción: devuelve el bloque del diccionario para el idioma activo. */
export const useT = () => dict[useLang().lang];

/* ============================================================
   DICCIONARIO — Español / Inglés
   ============================================================ */
export const dict = {
  es: {
    nav: {
      home: "Inicio",
      nosotros: "Nosotros",
      unidades: "Servicios",
      unidadesNeg: "Servicios de negocio",
      metodologia: "Metodología",
      casos: "Casos",
      faq: "FAQ",
      blog: "Centro de conocimiento",
      cta: "Solicitar propuesta dasd",
      verMapa: "Ver mapa completo →",
    },
    hero: {
      eyebrow: "Firma integral de capital humano",
      h1a: "Construimos organizaciones",
      h1b: "preparadas para",
      h1em: "el futuro",
      lead: "Diseñamos soluciones que combinan experiencia humana, conocimiento especializado y tecnología para impulsar el desarrollo sostenible de cada organización.",
      cta1: "Solicitar propuesta",
      cta2: "Explorar servicios",
      tags: [
        "Talento",
        "Desarrollo organizacional",
        "Legal laboral",
        "Tecnología",
        "Acompañamiento integral",
      ],
      mediaTags: "Talento · Cultura · Tecnología",
      cubes: ["Talento", "Cultura", "Tecnología"],
      scroll: "Scroll",
    },
    stats: {
      exp: "Años de experiencia",
      gptw: "Great Place to Work",
      colab: "Colaboradores acompañados",
      unidades: "Servicios integrados",
    },
    globe: {
      eyebrow: "Alcance global",
      h2: "Donde haya un desafío organizacional, podemos acompañarte.",
      p: "Brindamos soluciones integrales de capital humano, tecnología y desarrollo organizacional para empresas que buscan crecer, transformarse y potenciar sus equipos, sin importar su ubicación.",
      points: [
        "Cobertura nacional e internacional",
        "Modalidad remota e híbrida",
        "Tecnología y cercanía en cada proyecto",
      ],
    },
    about: {
      eyebrow: "Nosotros",
      h2: "Personas, cultura y tecnología para organizaciones que crecen.",
      lead: "En ÜNO combinamos gestión del talento, desarrollo organizacional, asesoramiento especializado y tecnología para acompañar los desafíos de empresas en constante evolución. Trabajamos cerca de cada cliente, diseñando soluciones prácticas, sostenibles y adaptadas a su realidad.",
      b1t: "Mirada profesional",
      b1p: "Trabajamos con metodologías, herramientas y criterios técnicos que respaldan cada recomendación y cada decisión.",
      b2t: "Visión integral",
      b2p: "Integramos distintas disciplinas para comprender los desafíos de cada organización desde múltiples perspectivas.",
      b3t: "Soluciones aplicables",
      b3p: "Diseñamos propuestas realistas, accionables y adaptadas a la dinámica de cada empresa.",
      quote:
        "“El crecimiento sostenible se construye cuando estrategia, personas y cultura avanzan en la misma dirección.”",
      pillars: ["Estrategia", "Personas", "Cultura"],
      aligned: "en una misma dirección",
      switchImg: "Imagen",
      switch3d: "3D",
      photoAlt: "Equipo de uno consultores",
      founderName: "Micaela Rivero",
      founderRole: "CEO · ÜNO",
      founderAlt: "Micaela Rivero, fundadora de uno consultores",
    },
    units: {
      eyebrow: "Mapa de soluciones",
      h2: "Cinco servicios, un solo equipo",
      p: "Tocá cada servicio para explorar qué resuelve. Juntos, son tu diferencial integral.",
      verUnidad: "Ver servicio completo",
      solicitar: "Solicitar propuesta →",
    },
    methodology: {
      eyebrow: "Metodología de trabajo",
      h2: "Nuestra metodología de trabajo",
      p: "Cinco fases diseñadas para transformar desafíos organizacionales en resultados sostenibles.",
      introH: "Un método claro, en cinco fases",
      introP: "Un proceso estructurado que acompaña a tu organización desde el diagnóstico hasta la consolidación de los resultados.",
      phases: [
        { t: "Diagnóstico", p: "Analizamos el punto de partida a través de indicadores, procesos y dinámicas organizacionales." },
        { t: "Estrategia", p: "Definimos prioridades, objetivos y un plan de acción alineado a las necesidades del negocio." },
        { t: "Implementación", p: "Llevamos las iniciativas a la práctica junto a tu equipo, integrando procesos, herramientas y tecnología." },
        { t: "Medición", p: "Monitoreamos indicadores clave para evaluar avances, identificar oportunidades y ajustar acciones." },
        { t: "Seguimiento", p: "Acompañamos la evolución de cada iniciativa mediante un seguimiento continuo que favorece su sostenibilidad y consolidación en el tiempo." },
      ],
    },
    cases: {
      eyebrow: "Casos de éxito",
      h2: "Construyendo resultados junto a nuestros clientes",
      p: "Cada proyecto representa una oportunidad para generar valor real. A medida que incorporamos nuevas experiencias, compartimos historias de éxito, desafíos superados y resultados alcanzados.",
      pEm: "",
      c1t: "Certificación Great Place to Work",
      c1p: "Acompañamiento de cultura y engagement que fortaleció la experiencia y el sentido de pertenencia del equipo.",
      c2t: "Desarrollo a escala",
      c2p: "Diseño e implementación de procesos de evaluación y desarrollo para más de 2.000 colaboradores.",
      c3t: "Tu próximo caso",
      c3p: "Espacio reservado para la transformación que vamos a construir juntos en tu organización.",
      c4t: "Procesos Digitalizados e Impulsados por IA",
      c4p: "Ayudamos a empresas a digitalizar la totalidad de sus procesos mediante aplicaciones web y móviles desarrolladas a medida, incorporando Inteligencia Artificial para automatizar tareas y optimizar operaciones.",
      destacado: "Caso destacado",
      proximo: "Próximamente",
    },
    cta: {
      eyebrow: "Demos el siguiente paso",
      h2: "¿Listos para transformar tu organización?",
      p: "Conversemos sobre tus desafíos de capital humano y diseñemos juntos una propuesta a medida.",
      btn: "Solicitar propuesta",
    },
    blog: {
      eyebrow: "Centro de conocimiento",
      h2: "Ideas para impulsar el desarrollo de las organizaciones",
      p: "Contenido práctico y perspectivas especializadas sobre talento, cultura, liderazgo y transformación organizacional.",
      read: "Leer artículo →",
      p1cat: "Liderazgo",
      p1t: "Cómo acompañar a un equipo que crece",
      p1p: "Qué cambia en la gestión de personas cuando la empresa pasa de 10 a 50 colaboradores.",
      p2cat: "Experiencia",
      p2t: "Onboarding: la experiencia que define la permanencia",
      p2p: "Por qué los primeros 90 días pesan más que cualquier beneficio.",
      p3cat: "Transformación",
      p3t: "Liderazgo de primera vez: por dónde empezar",
      p3p: "Acompañar a quienes asumen su primer rol de conducción es clave para sostener el crecimiento.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      h2: "Resolvemos tus dudas",
      items: [
        { q: "¿Qué tipo de organizaciones acompañan?", a: "Trabajamos con empresas, instituciones y emprendimientos que buscan fortalecer su gestión de personas, optimizar procesos y potenciar su desarrollo organizacional." },
        { q: "¿Tengo que contratar todos los servicios?", a: "No. Podés contratar un solo servicio o combinar varios en un proyecto integral. La ventaja de tenerlos juntos es coordinar todo con un solo equipo." },
        { q: "¿En qué se diferencian de una consultora tradicional?", a: "Integramos cinco disciplinas en un solo equipo, acompañamos la implementación de principio a fin y combinamos cercanía humana, tecnología y visión estratégica." },
        { q: "¿Cómo es el acompañamiento?", a: "Cercano y continuo. Tras implementar, mantenemos una fase de seguimiento con comunicación y feedback constantes para asegurar la continuidad y sostenibilidad de las acciones." },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      h2: "Hablemos de tu empresa",
      p: "Contanos qué necesitás y te respondemos con una propuesta clara y a medida.",
      email: "Email",
      phone: "Teléfono / WhatsApp",
      location: "Ubicación",
      locationVal: "Argentina · atención nacional",
      formTitle: "Solicitar propuesta",
      formSub: "Completá el formulario y recibí una propuesta personalizada.",
      ok: "✓ ¡Gracias! Recibimos tu solicitud y te responderemos a la brevedad.",
      okEm: "(Demo: conectá el formulario a un servicio de envío para que funcione de verdad.)",
      fName: "Nombre y apellido",
      fNamePh: "Tu nombre",
      fCompany: "Empresa",
      fCompanyPh: "Tu empresa",
      fEmail: "Email",
      fEmailPh: "tu@email.com",
      fPhone: "Teléfono",
      fPhonePh: "+54 ...",
      fUnit: "Servicio de interés",
      fUnitPh: "Seleccioná",
      fUnitProj: "Proyecto integral",
      fMsg: "Contanos qué necesitás",
      fMsgPh: "Describí brevemente tu desafío...",
      submit: "Enviar solicitud",
    },
    footer: {
      about: "Firma integral de capital humano que reúne tecnología, selección, desarrollo organizacional, legal y psicología.",
      unidades: "Servicios",
      navegacion: "Navegación",
      contacto: "Contacto",
      nosotros: "Nosotros",
      metodologia: "Metodología",
      casos: "Casos",
      blog: "Centro de conocimiento",
      faq: "Preguntas frecuentes",
      politicaCookies: "Política de cookies",
      rights: "uno consultores. Talento y tecnología, en una sola firma.",
      tagline: "Diseñado para crecer ✦",
    },
    cookies: {
      title: "Usamos cookies",
      desc: "Utilizamos cookies propias y de terceros para que el sitio funcione, recordar tus preferencias y analizar el uso de la web. Podés aceptarlas todas o rechazar las no esenciales.",
      accept: "Aceptar todas",
      reject: "Rechazar todas",
      more: "Política de cookies",
    },
    unitNames: {
      rrhh: { name: "Gestión del Talento", short: "Atracción, desarrollo y desempeño" },
      do: { name: "Desarrollo Organizacional", short: "Cultura, liderazgo y transformación" },
      psico: { name: "Psicología Laboral", short: "Evaluación y bienestar" },
      legal: { name: "Legal Integral", short: "Cumplimiento y relaciones laborales" },
      tech: { name: "Tecnología y Producto", short: "Productos digitales, automatización e IA" },
    },
    unitPage: {
      serviceLabel: "Servicio",
      crumbHome: "Inicio",
      crumbServices: "Servicios",
      ctaProposal: "Solicitar propuesta",
      ctaAll: "Ver todos los servicios",
      solveEyebrow: "Qué resolvemos",
      techCaps: [
        { t: "Automatización de operaciones", p: "Menos trabajo manual y repetitivo, menos errores y tiempos." },
        { t: "Agentes de IA", p: "Asistentes que ejecutan tareas conectados a tu información." },
        { t: "Integración de sistemas y datos", p: "Tus herramientas y datos trabajando como un solo sistema." },
        { t: "Estrategia y evolución", p: "Definimos qué construir y acompañamos cómo crece." },
      ],
      includeEyebrow: "Qué incluye",
      includeH2: "Lo que vas a obtener",
      includeP: "Cada proyecto se diseña según las necesidades de tu organización. Estos son algunos de los resultados concretos que vas a recibir.",
      includeCta: "Armar mi propuesta",
      ctaBandPre: "¿Listo para avanzar con",
      ctaBandP: "Contanos tu desafío y armamos juntos una propuesta a la medida de tu organización.",
      factoryEyebrow: "Software Factory",
      factoryH2: "Construimos las aplicaciones que tu negocio necesita.",
      factoryP: "Somos tu software factory: tomamos tu producto de punta a punta. Desarrollamos aplicaciones a medida para web, mobile y desktop, con inteligencia artificial integrada donde suma valor real.",
      stepsEyebrow: "Cómo lo hacemos",
      steps: [
        { t: "Descubrimiento", p: "Entendemos el problema, a los usuarios y los objetivos del negocio." },
        { t: "Diseño", p: "Definimos el alcance, la experiencia y cómo se ve la solución." },
        { t: "Desarrollo", p: "Construimos el producto en ciclos cortos y medibles." },
        { t: "Lanzamiento", p: "Probamos, ajustamos y ponemos la solución en producción." },
        { t: "Evolución", p: "Medimos el uso y hacemos crecer el producto con tu negocio." },
      ],
      burstEyebrow: "Tecnología + Inteligencia Artificial",
      burstH2: "Todo tu negocio, conectado e inteligente",
      burstP: "Integramos datos, procesos e IA en un mismo sistema que aprende y evoluciona con tu organización.",
      chatEyebrow: "Agentes de IA en acción",
      chatH2: "Asistentes que resuelven, no solo responden",
      chatP: "Conectamos agentes a tus sistemas para que ejecuten tareas reales: consultar datos, iniciar procesos y avanzar gestiones, en lenguaje natural.",
      chatOnline: "en línea",
      chatSolves: [
        "Atención y soporte 24/7",
        "Reportes y análisis de datos",
        "Automatización de tareas repetitivas",
        "Búsqueda en documentos internos",
      ],
      chatConvos: [
        {
          title: "Ventas",
          msgs: [
            { role: "user", text: "¿Cómo vienen las ventas este mes?" },
            { role: "assistant", text: "Vas +12% vs. el mes pasado. ¿Te armo el reporte completo?" },
            { role: "user", text: "Sí, y comparalo con el año pasado." },
            { role: "assistant", text: "Listo ✅ Te lo envié por correo con el comparativo interanual." },
          ],
        },
        {
          title: "RR.HH.",
          msgs: [
            { role: "user", text: "Necesito dar de alta a un empleado nuevo." },
            { role: "assistant", text: "Perfecto. ¿Nombre, puesto y fecha de ingreso?" },
            { role: "user", text: "Ana López, Diseñadora, 1 de abril." },
            { role: "assistant", text: "Hecho ✅ Creé el legajo y disparé el onboarding." },
          ],
        },
        {
          title: "Soporte",
          msgs: [
            { role: "user", text: "¿En qué estado está el pedido #4821?" },
            { role: "assistant", text: "Está en camino, llega mañana. ¿Le aviso al cliente?" },
            { role: "user", text: "Sí, avisale." },
            { role: "assistant", text: "Enviado ✅ Le compartí también el link de seguimiento." },
          ],
        },
      ],
      aiEyebrow: "Inteligencia Artificial",
      aiH2: "IA donde realmente aporta valor",
      aiP: "La implementamos solo donde mueve la aguja del negocio, de forma segura y medible.",
      aiPoints: [
        { t: "Agentes de IA", p: "Asistentes que responden y ejecutan tareas conectados a tus datos." },
        { t: "Automatización de procesos", p: "Flujos repetitivos resueltos de punta a punta." },
        { t: "IA aplicada al negocio", p: "Soluciones a medida con foco en resultados concretos." },
        { t: "Análisis de datos", p: "Información convertida en decisiones más rápidas." },
      ],
    },
  },

  en: {
    nav: {
      home: "Home",
      nosotros: "About",
      unidades: "Services",
      unidadesNeg: "Business services",
      metodologia: "Methodology",
      casos: "Cases",
      faq: "FAQ",
      blog: "Knowledge hub",
      cta: "Request a proposal",
      verMapa: "See full map →",
    },
    hero: {
      eyebrow: "Integral human-capital firm",
      h1a: "We build organizations",
      h1b: "ready for",
      h1em: "the future",
      lead: "We design solutions that combine human experience, specialized knowledge and technology to drive the sustainable growth of every organization.",
      cta1: "Request a proposal",
      cta2: "Explore services",
      tags: [
        "Talent",
        "Organizational development",
        "Labor law",
        "Technology",
        "End-to-end support",
      ],
      mediaTags: "Talent · Culture · Technology",
      cubes: ["Talent", "Culture", "Technology"],
      scroll: "Scroll",
    },
    stats: {
      exp: "Years of experience",
      gptw: "Great Place to Work",
      colab: "Employees supported",
      unidades: "Integrated services",
    },
    globe: {
      eyebrow: "Global reach",
      h2: "Wherever there's an organizational challenge, we can support you.",
      p: "We deliver integral human capital, technology and organizational development solutions for companies looking to grow, transform and empower their teams, regardless of their location.",
      points: [
        "National and international coverage",
        "Remote and hybrid format",
        "Technology and closeness in every project",
      ],
    },
    about: {
      eyebrow: "About us",
      h2: "People, culture and technology for organizations that grow.",
      lead: "uno consultores supports growing organizations with a proposal that integrates talent, organizational development, specialized advisory and technology. We design solutions that evolve with each company, combining closeness, expert knowledge and scalable tools.",
      b1t: "Professional rigor",
      b1p: "We work with methodologies, tools and technical criteria that back every recommendation and decision.",
      b2t: "Integral vision",
      b2p: "We integrate different disciplines to understand each organization's challenges from multiple perspectives.",
      b3t: "Actionable solutions",
      b3p: "We design realistic, actionable proposals adapted to the dynamics of each company.",
      quote:
        "“Sustainable growth is built when strategy, people and culture move in the same direction.”",
      pillars: ["Strategy", "People", "Culture"],
      aligned: "in the same direction",
      switchImg: "Image",
      switch3d: "3D",
      photoAlt: "uno consultores team",
      founderName: "Micaela Rivero",
      founderRole: "CEO · ÜNO",
      founderAlt: "Micaela Rivero, founder of uno consultores",
    },
    units: {
      eyebrow: "Solutions map",
      h2: "Five services, one team",
      p: "Tap each service to explore what it solves. Together, they are your integral edge.",
      verUnidad: "See full service",
      solicitar: "Request a proposal →",
    },
    methodology: {
      eyebrow: "How we work",
      h2: "Our working methodology",
      p: "Five phases designed to turn organizational challenges into sustainable results.",
      introH: "A clear method, in five phases",
      introP: "A structured process that guides your organization from diagnosis to the consolidation of results.",
      phases: [
        { t: "Diagnosis", p: "We analyze the starting point through indicators, processes and organizational dynamics." },
        { t: "Strategy", p: "We define priorities, objectives and an action plan aligned with the needs of the business." },
        { t: "Implementation", p: "We put the initiatives into practice alongside your team, integrating processes, tools and technology." },
        { t: "Measurement", p: "We monitor key indicators to assess progress, identify opportunities and adjust actions." },
        { t: "Follow-up", p: "We support the evolution of each initiative through continuous follow-up that fosters its sustainability over time." },
      ],
    },
    cases: {
      eyebrow: "Success stories",
      h2: "Results that speak for themselves",
      p: "A structure ready to add your cases as the firm grows.",
      pEm: "Replace these examples with real cases.",
      c1t: "Great Place to Work certification",
      c1p: "Culture and engagement support that strengthened the team's experience and sense of belonging.",
      c2t: "Development at scale",
      c2p: "Design and rollout of assessment and development processes for more than 2,000 employees.",
      c3t: "Your next case",
      c3p: "Space reserved for the transformation we'll build together in your organization.",
      c4t: "Digitalized, AI-Powered Processes",
      c4p: "We help companies digitalize all of their processes through custom-built web and mobile applications, incorporating Artificial Intelligence to automate tasks and optimize operations.",
      destacado: "Featured case",
      proximo: "Coming soon",
    },
    cta: {
      eyebrow: "Let's take the next step",
      h2: "Ready to transform your organization?",
      p: "Let's talk about your human-capital challenges and design a tailored proposal together.",
      btn: "Request a proposal",
    },
    blog: {
      eyebrow: "Knowledge hub",
      h2: "Ideas to drive the development of organizations",
      p: "Practical content and specialized perspectives on talent, culture, leadership and organizational transformation.",
      read: "Read article →",
      p1cat: "Leadership",
      p1t: "How to support a growing team",
      p1p: "What changes in people management when a company goes from 10 to 50 employees.",
      p2cat: "Experience",
      p2t: "Onboarding: the experience that defines retention",
      p2p: "Why the first 90 days matter more than any perk.",
      p3cat: "Transformation",
      p3t: "First-time leadership: where to begin",
      p3p: "Supporting those stepping into their first management role is key to sustaining growth.",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      h2: "We answer your questions",
      items: [
        { q: "What kind of organizations do you work with?", a: "We work with companies, institutions and ventures looking to strengthen their people management, optimize processes and boost their organizational development." },
        { q: "Do I have to hire all the services?", a: "No. You can hire a single service or combine several in an integral project. The advantage of having them together is coordinating everything with one team." },
        { q: "How are you different from a traditional consultancy?", a: "We integrate five disciplines in one team, support implementation end to end, and combine human closeness, technology and strategic vision." },
        { q: "What is the support like?", a: "Close and continuous. After implementing, we keep a follow-up phase with constant communication and feedback to ensure continuity and sustainability." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      h2: "Let's talk about your company",
      p: "Tell us what you need and we'll reply with a clear, tailored proposal.",
      email: "Email",
      phone: "Phone / WhatsApp",
      location: "Location",
      locationVal: "Argentina · nationwide service",
      formTitle: "Request a proposal",
      formSub: "Fill out the form and receive a personalized proposal.",
      ok: "✓ Thank you! We received your request and will reply shortly.",
      okEm: "(Demo: connect the form to a delivery service to make it work for real.)",
      fName: "Full name",
      fNamePh: "Your name",
      fCompany: "Company",
      fCompanyPh: "Your company",
      fEmail: "Email",
      fEmailPh: "you@email.com",
      fPhone: "Phone",
      fPhonePh: "+54 ...",
      fUnit: "Service of interest",
      fUnitPh: "Select",
      fUnitProj: "Integral project",
      fMsg: "Tell us what you need",
      fMsgPh: "Briefly describe your challenge...",
      submit: "Send request",
    },
    footer: {
      about: "An integral human-capital firm bringing together technology, recruitment, organizational development, legal and psychology.",
      unidades: "Services",
      navegacion: "Navigation",
      contacto: "Contact",
      nosotros: "About",
      metodologia: "Methodology",
      casos: "Cases",
      blog: "Knowledge hub",
      faq: "FAQ",
      politicaCookies: "Cookie policy",
      rights: "uno consultores. Talent and technology, in a single firm.",
      tagline: "Designed to grow ✦",
    },
    cookies: {
      title: "We use cookies",
      desc: "We use our own and third-party cookies to make the site work, remember your preferences and analyze how the site is used. You can accept all or reject the non-essential ones.",
      accept: "Accept all",
      reject: "Reject all",
      more: "Cookie policy",
    },
    unitNames: {
      rrhh: { name: "Talent Management", short: "Attraction, development and performance" },
      do: { name: "Organizational Development", short: "Culture, leadership and transformation" },
      psico: { name: "Workplace Psychology", short: "Assessment and wellbeing" },
      legal: { name: "Labor Law", short: "Compliance and labor relations" },
      tech: { name: "Technology & Product", short: "Digital products, automation and AI" },
    },
    unitPage: {
      serviceLabel: "Service",
      crumbHome: "Home",
      crumbServices: "Services",
      ctaProposal: "Request a proposal",
      ctaAll: "See all services",
      solveEyebrow: "What we solve",
      techCaps: [
        { t: "Operations automation", p: "Less manual, repetitive work — fewer errors and less time." },
        { t: "AI agents", p: "Assistants that run tasks connected to your information." },
        { t: "Systems & data integration", p: "Your tools and data working as a single system." },
        { t: "Strategy & evolution", p: "We define what to build and support how it grows." },
      ],
      includeEyebrow: "What's included",
      includeH2: "What you'll get",
      includeP: "Every project is designed around your organization's needs. These are some of the concrete results you'll receive.",
      includeCta: "Build my proposal",
      ctaBandPre: "Ready to move forward with",
      ctaBandP: "Tell us your challenge and we'll build a tailored proposal together.",
      factoryEyebrow: "Software Factory",
      factoryH2: "We build the applications your business needs.",
      factoryP: "We're your software factory: we take your product end to end. We build custom applications for web, mobile and desktop, with artificial intelligence integrated where it adds real value.",
      stepsEyebrow: "How we do it",
      steps: [
        { t: "Discovery", p: "We understand the problem, the users and the business goals." },
        { t: "Design", p: "We define the scope, the experience and how the solution looks." },
        { t: "Development", p: "We build the product in short, measurable cycles." },
        { t: "Launch", p: "We test, refine and ship the solution to production." },
        { t: "Evolution", p: "We measure usage and grow the product with your business." },
      ],
      burstEyebrow: "Technology + Artificial Intelligence",
      burstH2: "Your whole business, connected and intelligent",
      burstP: "We bring data, processes and AI into a single system that learns and evolves with your organization.",
      chatEyebrow: "AI agents in action",
      chatH2: "Assistants that solve, not just answer",
      chatP: "We connect agents to your systems so they run real tasks: query data, start processes and move things forward, in natural language.",
      chatOnline: "online",
      chatSolves: [
        "24/7 support and assistance",
        "Reports and data analysis",
        "Automation of repetitive tasks",
        "Search across internal documents",
      ],
      chatConvos: [
        {
          title: "Sales",
          msgs: [
            { role: "user", text: "How are sales doing this month?" },
            { role: "assistant", text: "You're up +12% vs. last month. Want the full report?" },
            { role: "user", text: "Yes, and compare it to last year." },
            { role: "assistant", text: "Done ✅ I emailed it to you with the year-over-year view." },
          ],
        },
        {
          title: "HR",
          msgs: [
            { role: "user", text: "I need to onboard a new employee." },
            { role: "assistant", text: "Sure. Name, role and start date?" },
            { role: "user", text: "Ana López, Designer, April 1st." },
            { role: "assistant", text: "Done ✅ I created the file and kicked off onboarding." },
          ],
        },
        {
          title: "Support",
          msgs: [
            { role: "user", text: "What's the status of order #4821?" },
            { role: "assistant", text: "It's on its way, arriving tomorrow. Should I notify the customer?" },
            { role: "user", text: "Yes, let them know." },
            { role: "assistant", text: "Sent ✅ I also shared the tracking link." },
          ],
        },
      ],
      aiEyebrow: "Artificial Intelligence",
      aiH2: "AI where it truly adds value",
      aiP: "We implement it only where it moves the needle for the business, safely and measurably.",
      aiPoints: [
        { t: "AI agents", p: "Assistants that respond and run tasks connected to your data." },
        { t: "Process automation", p: "Repetitive flows solved end to end." },
        { t: "Business-applied AI", p: "Tailored solutions focused on concrete results." },
        { t: "Data analysis", p: "Information turned into faster decisions." },
      ],
    },
  },
} as const;
