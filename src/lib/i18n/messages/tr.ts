/**
 * Türkçe.Phase 1 default locale.
 * "Bilge abla" tonu: sıcak, güven veren, yargılamayan, güçlendiren.
 */

import type { Messages } from "./en";

const tr: Messages = {
  nav: {
    mission: "Misyon",
    network: "Ağ",
    sos: "SOS",
    support: "Destek",
    about: "Biz Kimiz",
    download: "İndir",
    ctaLaunching: "Uygulamayı Aç",
    aria: {
      home: "WeSafe ana sayfa",
      primary: "Ana menü",
      switchLanguage: "Dil değiştir",
    },
  },

  common: {
    live: "Canlı",
    global: "Küresel",
    active: "Aktif",
    scroll: "Kaydır",
    soon: "Canlı",
  },

  hero: {
    eyebrow: "Küresel bir güvenlik hareketi",
    titleA: "Birlikte",
    titleB: "Daha",
    titleC: "Güvendeyiz",
    subtitle:
      "Tehlike gelmeden önce harekete geçen, toplulukla güçlenen bir güvenlik ağı. Ücretsiz. Reklamsız. Dünyanın her yerinde.",
    ctaPrimary: "Yakında Açılıyor",
    ctaSecondary: "Misyonumuz",
    activationEyebrow: "Ağ · Uyanıyor",
    activationTitleA: "Bir güvenlik ağı,",
    activationTitleB: "şehir şehir uyanıyor.",
    closingA: "Tek bir uygulama.",
    closingB: "Her şehir. Her kadın.",
    closingSub: "Küresel · Daima açık",
    growingA: "Bir güvenlik ağı",
    growingB: "büyüyor.",
    everyCityA: "Her",
    everyCityB: "şehirde.",
    acrossTheA: "Tüm",
    acrossTheB: "dünyada.",
  },

  appShowcase: {
    eyebrow: "Uygulama",
    titleA: "En önemli an için",
    titleB: "tasarlandı.",
    slides: {
      sos: {
        tag: "SOS",
        title: "Tek dokunuş.",
        body: "Sessiz. Daima açık. Ekran kapalıyken, söz çıkmazken çalışır.",
      },
      map: {
        tag: "Canlı Harita",
        title: "Şehir, dürüstçe.",
        body: "Topluluktan gelen anonim sinyaller; daha güvenli köşeler, daha güvenli yollar, gerçek zamanlı.",
      },
      volunteers: {
        tag: "Gönüllüler",
        title: "Yakınında bir el.",
        body: "190 ülkede doğrulanmış gönüllüler. İlk insani yanıt, haritada.",
      },
      home: {
        tag: "Ana Ekran",
        title: "Küresel varlık.",
        body: "Uygulamayı aç. Dünyayı gör. Seni taşıyan ağı hisset.",
      },
    },
  },

  problem: {
    eyebrow: "Gerçek",
    titleA: "Güvenlik bir ayrıcalık değil.",
    titleB: "Bir haktır.",
    body: "Her dakika, bir yerde bir kadın güvende hissetmiyor. WeSafe’i kurduk; çünkü dünyanın, zarar gelmeden önce koruyan bir araca ihtiyacı vardı. Sonra değil, önce.",
    figures: [
      { value: "1 / 3", label: "Her üç kadından biri hayatı boyunca şiddete maruz kalıyor." },
      { value: "736M",  label: "Partner veya cinsel şiddetten kurtulan kadın sayısı." },
      { value: "190+",  label: "WeSafe’in ulaşmayı hedeflediği ülke sayısı." },
    ],
  },

  mission: {
    eyebrow: "Her Kadın · Her Şehir · Her An",
    titleA: "Her kadın.",
    titleB: "Her şehir.",
    titleC: "Her an.",
    body: "WeSafe, kendini güvende hissetmenin ne kadar değerli olduğunu bilir. Bu yüzden sadece tehlike anında değil, her an seninle olan bir sistem kurduk. Sessizce çalışır, yanında olur, seni korur.",
    pillars: [
      {
        num: "01",
        title: "Güvenlik bir hak.",
        body: "WeSafe, risk oluşmadan önce harekete geçer. Sen hayatına odaklanırken sistem sessizce seni korur.",
      },
      {
        num: "02",
        title: "Yalnız değilsin.",
        body: "Kadınları birbirine bağlayan görünmez ama güçlü bir ağ. Her kullanıcı bu ağı büyütür.",
      },
      {
        num: "03",
        title: "Herkes için.",
        body: "WeSafe ücretsizdir. Reklamsızdır. Ve öyle kalacaktır. Hiçbir kadın bu ağın dışında kalmaz.",
      },
    ],
  },

  network: {
    eyebrow: "Küresel Ağ",
    titleA: "Tek bir hareket.",
    titleB: "Her şehir.",
    body: "Tokyo'da bir gönüllü, Lagos'ta bir rapor, São Paulo'da bir check-in. Tek bir ağ ve tek bir söz; her kullanıcının cebinde.",
    caption: "Ana ekran · Küresel varlık",
    stats: {
      volunteers: "Dünya çapında gönüllü",
      countries: "Aktif ülke",
      pulse: "Sürekli koruma",
    },
  },

  sos: {
    eyebrow: "SOS Deneyimi",
    titleA: "Tehlikede misin?",
    titleB: "Tek dokunuş",
    titleC: "yeterli.",
    body: "Sessiz ve daima aktif bir sistem. Ekran kapalıyken, telefon kilitliyken, hatta söz söyleyemediğinde bile çalışır.",
    caption: "SOS · Canlı geri sayım",
    alt: "WeSafe.SOS geri sayım ekranı",
    steps: [
      { t: "00:00", label: "Tetiklendi",       body: "Tek dokunuş yeterli; ekrana bakmadan." },
      { t: "00:02", label: "Konum kilitlendi", body: "GPS ve hücre verisi iletildi." },
      { t: "00:04", label: "Ağ uyarıldı",      body: "Güvenilir kişiler ve yakındaki gönüllüler haberdar oldu." },
      { t: "00:06", label: "Müdahale başladı", body: "Acil hatlar arandı, en yakın rota açıldı." },
    ],
  },

  reporting: {
    eyebrow: "Raporlama Sistemi",
    titleA: "Anonim raporlar.",
    titleB: "Topluluk",
    titleC: "doğrular.",
    body: "Bir dokunuş sokağı işaretler, bir başkası onaylar. Harita ortak bir farkındalıkla nefes alır: kaçınılacak sokaklar, ışık isteyen köşeler, bu gece daha güvenli yollar.",
    caption: "Canlı harita · Kullanıcı kartı",
    alt: "WeSafe haritada kullanıcı kartı",
    alerts: "5 aktif uyarı · İstanbul",
    facts: [
      { label: "Gizlilik",   value: "Sıfır kimlik" },
      { label: "Doğrulama",  value: "Topluluk" },
      { label: "Kapsam",     value: "Küresel" },
      { label: "Yanıt",      value: "Canlı" },
    ],
  },

  volunteer: {
    eyebrow: "Gönüllü Ağı",
    titleA: "Yakınındaki bir yabancı",
    titleB: "senin",
    titleC: "kardeşin olur.",
    body: "Doğrulanmış gönüllüler; kadınlar ve destekçiler ulaşılabilir olmayı seçer. Yakınlarında bir SOS yandığında, ilk insani yanıt onlar olur. Gerçek zamanlı bir güven ağı.",
    caption: "Ülke sıralaması · Canlı",
    alt: "WeSafe gönüllü ülke sıralaması",
    badges: ["Geçmiş kontrolü", "Topluluk puanı", "Gönüllü yarıçapı", "7/24 rıza"],
    cta: "Gönüllü ol",
  },

  support: {
    eyebrow: "Misyona Destek Ol",
    titleA: "WeSafe ücretsiz.",
    titleB: "Ve daima öyle kalacak.",
    body: "Bir abonelik değil. Bir bağış değil. Her kadını ayakta tutan ağa ait olmanın bir yolu. Uygulama pek çok elin işi gibi hissettiriyorsa, onlardan biri olmanın yolu budur.",
    badgeFeatured: "★ En çok seçilen",
    coffeeSubtext:
      "Uygulamadaki küçük fincan, aynı şeyin sessiz bir ifadesi: küçük ve içten bir destek. Burada açıkça söylüyoruz: senin desteğin, ağın hep açık kalmasını sağlar.",
    footnote: "Bölgeye duyarlı fiyat · Reklamsız, her zaman · %100 ağa",
    plans: {
      monthly: {
        kind: "Aylık",
        tag: "Misyonu Sürdür",
        cadence: "aylık",
        body: "Her ay küçük bir destek; her kadın için sürekli bir sinyal. Düzenli katkın, ağı bir adım daha güçlü tutar.",
        cta: "Aylık Destek Ol",
      },
      onetime: {
        kind: "Tek Seferlik",
        tag: "WeSafe'i Büyüt",
        cadence: "tek sefer ödeme",
        body: "Tek seferlik bir dayanışma. Bir şehre, bir sokağa, eve güvenle dönen bir kadına dokunur.",
        cta: "Tek Sefer Öde",
      },
      crypto: {
        kind: "Kripto · TRC20",
        tag: "Güvenli Bir Geleceği Destekle",
        cadence: "USDT / TRC20",
        amount: "",
        body: "Sınır tanımayan bir destek. Dünyanın her yerinden, dilediğin miktarda katkıda bulun.",
        cta: "Cüzdanı Kopyala",
        copied: "Kopyalandı",
      },
    },
  },

  download: {
    eyebrow: "Uygulamayı İndir",
    titleA: "Ağı",
    titleB: "cebinde taşı.",
    body: "iOS ve Android'de, dünyanın her yerinde. Tek bir dokunuşla aramıza katıl, milyonlarca kullanıcı arasındaki yerini al.",
    store: {
      iosPre: "Şuradan indir",
      iosLabel: "App Store",
      androidPre: "Şuradan al",
      androidLabel: "Google Play",
    },
    closingSlogan: "Birlikte · Daha · Güvendeyiz",
  },

  footer: {
    tagline:
      "Küresel, topluluk destekli bir güvenlik hareketi. Ücretsiz. Reklamsız. Her kadın, her yerde kendini güvende hissetsin diye.",
    slogan: "Birlikte Daha Güvendeyiz",
    rights: "Tüm hakları saklıdır.",
    columns: {
      platform: {
        title: "Platform",
        items: {
          mission: "Misyon",
          network: "Ağ",
          sos: "SOS",
          support: "Destek",
        },
      },
      company: {
        title: "Şirket",
        items: { about: "Hakkında", press: "Basın", contact: "İletişim" },
      },
      legal: {
        title: "Yasal",
        items: { privacy: "Gizlilik", terms: "Koşullar", consent: "Onay Geçmişi" },
      },
      social: {
        title: "Sosyal",
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

export default tr;
