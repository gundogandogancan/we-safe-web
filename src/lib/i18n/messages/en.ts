/**
 * English — reference translation (source of truth for key structure).
 * When adding keys, add here first, then mirror into tr / es / ar.
 */

const en = {
  nav: {
    mission: "Mission",
    network: "Network",
    sos: "SOS",
    support: "Contribute",
    about: "About",
    download: "Download",
    ctaLaunching: "Open the App",
    aria: {
      home: "WeSafe — home",
      primary: "Primary",
      switchLanguage: "Switch language",
    },
  },

  common: {
    live: "Live",
    global: "Global",
    active: "Active",
    scroll: "Scroll",
    soon: "Live",
  },

  hero: {
    eyebrow: "A Global Safety Movement",
    titleA: "Together",
    titleB: "We Are",
    titleC: "Safer",
    subtitle:
      "A community-powered safety network that protects women before danger arrives. Free. Ad-free. Built for the world.",
    ctaPrimary: "Launching Soon",
    ctaSecondary: "Our Mission",
    activationEyebrow: "Network · Activating",
    activationTitleA: "A safety network,",
    activationTitleB: "waking up city by city.",
    closingA: "One app.",
    closingB: "Every city. Every woman.",
    closingSub: "Global · Always on",
    // 4-stage scroll stages
    growingA: "A safety network",
    growingB: "is growing.",
    everyCityA: "Across",
    everyCityB: "every city.",
    acrossTheA: "Across",
    acrossTheB: "the world.",
  },

  appShowcase: {
    eyebrow: "The App",
    titleA: "Built for the moment",
    titleB: "it matters most.",
    slides: {
      sos: {
        tag: "SOS",
        title: "One touch.",
        body: "Silent. Always on. Runs when the screen is black and words are impossible.",
      },
      map: {
        tag: "Live Map",
        title: "The city, honestly.",
        body: "Anonymous signals from the community. Safer corners, safer routes — live.",
      },
      volunteers: {
        tag: "Volunteers",
        title: "A hand nearby.",
        body: "Verified volunteers across 190 countries. The first human response, mapped.",
      },
      home: {
        tag: "Home",
        title: "Global presence.",
        body: "Open the app. See the world. Feel the network that carries you.",
      },
    },
  },

  problem: {
    eyebrow: "The Reality",
    titleA: "Safety is not a privilege.",
    titleB: "It is a right.",
    body: "Every minute, somewhere, a woman is made to feel unsafe. We built WeSafe because the world needed a tool that protects before the harm. Not after.",
    figures: [
      { value: "1 / 3",  label: "Women globally face violence in their lifetime" },
      { value: "736M",   label: "Survivors of intimate-partner or sexual violence" },
      { value: "190+",   label: "Countries WeSafe is expanding to" },
    ],
  },

  mission: {
    eyebrow: "Why WeSafe Exists",
    titleA: "A quiet promise to",
    titleB: "every woman.",
    titleC: "Anywhere in the world.",
    body: "WeSafe knows how precious it is to feel safe. That's why we built a system that stands with you every moment, not only in danger. It works in silence, stays beside you, and protects you.",
    pillars: [
      {
        num: "01",
        title: "Safety is a right.",
        body: "WeSafe acts before danger arrives. You live your life, the system protects in silence.",
      },
      {
        num: "02",
        title: "You're not alone.",
        body: "An invisible but powerful network connecting women. Every user makes it stronger.",
      },
      {
        num: "03",
        title: "For everyone.",
        body: "WeSafe is free. Ad-free. Forever. No woman is ever left outside the network.",
      },
    ],
  },

  network: {
    eyebrow: "Global Network",
    titleA: "One movement.",
    titleB: "Every city.",
    body: "A volunteer in Tokyo. A report in Lagos. A check-in in São Paulo. One network, one promise — carried in the pocket of every user who joins.",
    caption: "Home · Global presence",
    stats: {
      volunteers: "Volunteers worldwide",
      countries: "Active countries",
      pulse: "Continuous protection",
    },
  },

  sos: {
    eyebrow: "SOS Experience",
    titleA: "In danger?",
    titleB: "One touch",
    titleC: "is enough.",
    body: "A silent, always-on system. It runs when the screen is black, when the phone is locked, when words are not possible.",
    caption: "SOS · Live countdown",
    alt: "WeSafe — SOS countdown in progress",
    steps: [
      { t: "00:00", label: "Trigger",          body: "Hold. No screen needed." },
      { t: "00:02", label: "Location locked",  body: "GPS + cell triangulation sent." },
      { t: "00:04", label: "Network alerted",  body: "Trusted contacts + nearby volunteers." },
      { t: "00:06", label: "Response live",    body: "155 + emergency routes activated." },
    ],
  },

  reporting: {
    eyebrow: "Reporting System",
    titleA: "Anonymous reports.",
    titleB: "Verified",
    titleC: "by community.",
    body: "A tap marks a street. Another confirms it. The map breathes with collective awareness — which alleys to avoid, which corners need light, which routes go home safer tonight.",
    caption: "Live map · User card",
    alt: "WeSafe — user card on live map",
    alerts: "5 active alerts · İstanbul",
    facts: [
      { label: "Privacy",      value: "Zero identity" },
      { label: "Verification", value: "Community" },
      { label: "Coverage",     value: "Global" },
      { label: "Response",     value: "Live" },
    ],
  },

  volunteer: {
    eyebrow: "Volunteer Network",
    titleA: "A stranger nearby",
    titleB: "becomes",
    titleC: "a sister.",
    body: "Verified volunteers — women and allies — choose to be reachable. When an SOS lights up within their radius, they become the first human response. Trust, mapped in real time.",
    caption: "Country ranking · Live",
    alt: "WeSafe — volunteer country ranking",
    badges: ["Background check", "Community rating", "Opt-in radius", "24/7 consent"],
    cta: "Become a volunteer",
  },

  support: {
    eyebrow: "Power The Mission",
    titleA: "WeSafe is free.",
    titleB: "And always will be.",
    body: "Not a subscription. Not a donation. An act of belonging to the network that keeps every woman standing. If the app feels like the work of many hands, this is how you join them.",
    badgeFeatured: "★ Most chosen",
    coffeeSubtext:
      "In the app, a small cup stands for the same thing — a quiet gesture of care. Here we say it plainly: your support keeps the network on.",
    footnote: "Region-aware pricing · No ads, ever · 100% to the network",
    paymentSuccess: "Thank you! Payment received — we're grateful for your support.",
    plans: {
      monthly: {
        kind: "Monthly",
        tag: "Sustain the Mission",
        cadence: "per month",
        body: "The steady pulse. Keeps the signal alive for every woman who cannot pay.",
        cta: "Back Monthly",
      },
      onetime: {
        kind: "One-Time",
        tag: "Keep WeSafe Growing",
        cadence: "a single gift",
        body: "One act of solidarity. Powers a city, a block, a walk home.",
        cta: "Give Once",
      },
      crypto: {
        kind: "Crypto · TRC20",
        tag: "Back a Safer Future",
        cadence: "USDT / TRC20",
        amount: "Any amount",
        body: "No borders, no banks. Contribute from anywhere on the planet.",
        cta: "Copy Wallet",
        copied: "Copied",
      },
    },
  },

  download: {
    eyebrow: "Download",
    titleA: "Carry the network",
    titleB: "in your pocket.",
    body: "Available on iOS and Android, worldwide. One tap to join — your place among millions of users who already carry the signal.",
    store: {
      iosPre: "Download on the",
      iosLabel: "App Store",
      androidPre: "Get it on",
      androidLabel: "Google Play",
    },
    closingSlogan: "Together · We · Are · Safer",
  },

  footer: {
    tagline:
      "A global, community-powered safety movement. Free. Ad-free. Built so every woman feels safer, anywhere in the world.",
    slogan: "Together We Are Safer",
    rights: "All rights reserved.",
    columns: {
      platform: {
        title: "Platform",
        items: {
          mission: "Mission",
          network: "Network",
          sos: "SOS",
          support: "Contribute",
        },
      },
      company: {
        title: "Company",
        items: { about: "About", press: "Press", contact: "Contact" },
      },
      legal: {
        title: "Legal",
        items: { privacy: "Privacy", terms: "Terms", consent: "Consent History" },
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

export default en;
export type Messages = typeof en;
