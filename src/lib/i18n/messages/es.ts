/**
 * Español — Phase 2 locale.
 * Traducción premium. Se recomienda revisión por hablante nativo antes
 * del lanzamiento público.
 */

import type { Messages } from "./en";

const es: Messages = {
  nav: {
    mission: "Misión",
    network: "Red",
    sos: "SOS",
    support: "Contribuir",
    about: "Quiénes somos",
    download: "Descargar",
    ctaLaunching: "Abrir la App",
    aria: {
      home: "WeSafe — inicio",
      primary: "Menú principal",
      switchLanguage: "Cambiar idioma",
    },
  },

  common: {
    live: "En vivo",
    global: "Global",
    active: "Activo",
    scroll: "Desliza",
    soon: "En vivo",
  },

  hero: {
    eyebrow: "Un movimiento global de seguridad",
    titleA: "Juntas",
    titleB: "Somos Más",
    titleC: "Seguras",
    subtitle:
      "Una red de seguridad impulsada por la comunidad que protege a las mujeres antes de que llegue el peligro. Gratis. Sin anuncios. Hecha para el mundo.",
    ctaPrimary: "Próximamente",
    ctaSecondary: "Nuestra Misión",
    activationEyebrow: "Red · Activándose",
    activationTitleA: "Una red de seguridad,",
    activationTitleB: "despertando ciudad a ciudad.",
    closingA: "Una sola app.",
    closingB: "Cada ciudad. Cada mujer.",
    closingSub: "Global · Siempre activa",
    growingA: "Una red de seguridad",
    growingB: "está creciendo.",
    everyCityA: "En cada",
    everyCityB: "ciudad.",
    acrossTheA: "Por todo",
    acrossTheB: "el mundo.",
  },

  appShowcase: {
    eyebrow: "La App",
    titleA: "Creada para el momento",
    titleB: "que más importa.",
    slides: {
      sos: {
        tag: "SOS",
        title: "Un toque.",
        body: "Silenciosa. Siempre activa. Funciona con la pantalla negra y cuando las palabras no son posibles.",
      },
      map: {
        tag: "Mapa en Vivo",
        title: "La ciudad, honesta.",
        body: "Señales anónimas de la comunidad. Esquinas más seguras, rutas más seguras — en vivo.",
      },
      volunteers: {
        tag: "Voluntarias",
        title: "Una mano cerca.",
        body: "Voluntarias verificadas en 190 países. La primera respuesta humana, en el mapa.",
      },
      home: {
        tag: "Inicio",
        title: "Presencia global.",
        body: "Abre la app. Mira el mundo. Siente la red que te sostiene.",
      },
    },
  },

  problem: {
    eyebrow: "La Realidad",
    titleA: "La seguridad no es un privilegio.",
    titleB: "Es un derecho.",
    body: "Cada minuto, en algún lugar, una mujer se siente insegura. Construimos WeSafe porque el mundo necesitaba una herramienta que protegiera antes del daño. No después.",
    figures: [
      { value: "1 / 3",  label: "Mujeres en el mundo sufren violencia en algún momento" },
      { value: "736M",   label: "Sobrevivientes de violencia íntima o sexual" },
      { value: "190+",   label: "Países a los que WeSafe se está expandiendo" },
    ],
  },

  mission: {
    eyebrow: "Por Qué Existe WeSafe",
    titleA: "Una promesa silenciosa",
    titleB: "a cada mujer.",
    titleC: "En cualquier parte del mundo.",
    body: "WeSafe sabe lo valioso que es sentirse a salvo. Por eso construimos un sistema que está contigo en todo momento, no solo en el peligro. Trabaja en silencio, se queda a tu lado y te protege.",
    pillars: [
      {
        num: "01",
        title: "La seguridad es un derecho.",
        body: "WeSafe actúa antes de que llegue el peligro. Tú vives tu vida, el sistema te protege en silencio.",
      },
      {
        num: "02",
        title: "No estás sola.",
        body: "Una red invisible pero poderosa que conecta mujeres. Cada usuaria la hace más fuerte.",
      },
      {
        num: "03",
        title: "Para todas.",
        body: "WeSafe es gratis. Sin anuncios. Para siempre. Ninguna mujer queda fuera de la red.",
      },
    ],
  },

  network: {
    eyebrow: "Red Global",
    titleA: "Un movimiento.",
    titleB: "Cada ciudad.",
    body: "Una voluntaria en Tokio. Un reporte en Lagos. Un check-in en São Paulo. Una red, una promesa — en el bolsillo de cada persona que se une.",
    caption: "Inicio · Presencia global",
    stats: {
      volunteers: "Voluntarias en todo el mundo",
      countries: "Países activos",
      pulse: "Protección continua",
    },
  },

  sos: {
    eyebrow: "Experiencia SOS",
    titleA: "¿En peligro?",
    titleB: "Un toque",
    titleC: "basta.",
    body: "Un sistema silencioso, siempre activo. Funciona con la pantalla negra, con el teléfono bloqueado, cuando las palabras no son posibles.",
    caption: "SOS · Cuenta regresiva en vivo",
    alt: "WeSafe — cuenta regresiva SOS en curso",
    steps: [
      { t: "00:00", label: "Activación",      body: "Mantén presionado. Sin pantalla." },
      { t: "00:02", label: "Ubicación fija",  body: "GPS y triangulación enviados." },
      { t: "00:04", label: "Red alertada",    body: "Contactos de confianza y voluntarias cercanas." },
      { t: "00:06", label: "Respuesta activa", body: "Emergencias y rutas activadas." },
    ],
  },

  reporting: {
    eyebrow: "Sistema de Reportes",
    titleA: "Reportes anónimos.",
    titleB: "Verificados",
    titleC: "por la comunidad.",
    body: "Un toque marca una calle. Otro la confirma. El mapa respira con una consciencia colectiva — qué callejones evitar, qué esquinas necesitan luz, qué rutas llevan a casa esta noche.",
    caption: "Mapa en vivo · Tarjeta de usuaria",
    alt: "WeSafe — tarjeta de usuaria en mapa en vivo",
    alerts: "5 alertas activas · Estambul",
    facts: [
      { label: "Privacidad",    value: "Cero identidad" },
      { label: "Verificación",  value: "Comunidad" },
      { label: "Cobertura",     value: "Global" },
      { label: "Respuesta",     value: "En vivo" },
    ],
  },

  volunteer: {
    eyebrow: "Red de Voluntariado",
    titleA: "Una extraña cercana",
    titleB: "se convierte en",
    titleC: "una hermana.",
    body: "Voluntarias verificadas — mujeres y aliadas — eligen estar disponibles. Cuando un SOS se enciende en su radio, son la primera respuesta humana. Confianza trazada en tiempo real.",
    caption: "Ranking por país · En vivo",
    alt: "WeSafe — ranking de voluntarias por país",
    badges: ["Verificación de antecedentes", "Valoración comunitaria", "Radio opcional", "Consentimiento 24/7"],
    cta: "Hazte voluntaria",
  },

  support: {
    eyebrow: "Impulsa la Misión",
    titleA: "WeSafe es gratis.",
    titleB: "Y siempre lo será.",
    body: "No es una suscripción. No es una donación. Es un acto de pertenencia a la red que sostiene a cada mujer. Si la app se siente como el trabajo de muchas manos, así te sumas a ellas.",
    badgeFeatured: "★ La más elegida",
    coffeeSubtext:
      "En la app, una pequeña taza representa lo mismo — un gesto silencioso de cuidado. Aquí lo decimos claro: tu apoyo mantiene la red encendida.",
    footnote: "Precio por región · Sin anuncios, nunca · 100% a la red",
    paymentSuccess: "¡Gracias! Pago recibido — te agradecemos tu apoyo.",
    plans: {
      monthly: {
        kind: "Mensual",
        tag: "Sostén la Misión",
        cadence: "al mes",
        body: "El pulso constante. Mantiene viva la señal para cada mujer que no puede pagar.",
        cta: "Apoyar Mensual",
      },
      onetime: {
        kind: "Una Vez",
        tag: "Haz Crecer WeSafe",
        cadence: "un solo gesto",
        body: "Un acto de solidaridad. Alimenta una ciudad, una cuadra, un regreso a casa.",
        cta: "Dar Una Vez",
      },
      crypto: {
        kind: "Cripto · TRC20",
        tag: "Respalda un Futuro Seguro",
        cadence: "USDT / TRC20",
        amount: "Cualquier monto",
        body: "Sin fronteras, sin bancos. Contribuye desde cualquier rincón del planeta.",
        cta: "Copiar Billetera",
        copied: "Copiado",
      },
    },
  },

  download: {
    eyebrow: "Descargar",
    titleA: "Lleva la red",
    titleB: "en tu bolsillo.",
    body: "Disponible en iOS y Android, en todo el mundo. Un toque para unirte — tu lugar entre millones que ya llevan la señal.",
    store: {
      iosPre: "Descargar en",
      iosLabel: "App Store",
      androidPre: "Obtener en",
      androidLabel: "Google Play",
    },
    closingSlogan: "Juntas · Somos · Más · Seguras",
  },

  footer: {
    tagline:
      "Un movimiento global de seguridad impulsado por la comunidad. Gratis. Sin anuncios. Hecho para que cada mujer se sienta más segura, en cualquier parte del mundo.",
    slogan: "Juntas Somos Más Seguras",
    rights: "Todos los derechos reservados.",
    columns: {
      platform: {
        title: "Plataforma",
        items: {
          mission: "Misión",
          network: "Red",
          sos: "SOS",
          support: "Contribuir",
        },
      },
      company: {
        title: "Empresa",
        items: { about: "Sobre nosotras", press: "Prensa", contact: "Contacto" },
      },
      legal: {
        title: "Legal",
        items: { privacy: "Privacidad", terms: "Términos", consent: "Historial de consentimiento" },
      },
      social: {
        title: "Social",
        items: {
          instagram: "Instagram",
          x: "X",
          tiktok: "TikTok",
          facebook: "Facebook",
        },
      },
    },
  },
};

export default es;
