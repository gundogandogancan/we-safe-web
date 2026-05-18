/**
 * /support — Contact / help page. Minimal: hero copy + email CTA.
 * Apple's App Review will follow the Support URL declared in App Store
 * Connect, so this must return a 200 with a contactable email.
 */

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import LegalShell from "@/components/sections/LegalShell";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface SupportContent {
  brand: string;
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
}

const EN: SupportContent = {
  brand: "WeSafe",
  title: "Support",
  intro: "We typically respond within 24 hours on weekdays.",
  sections: [
    {
      title: "Contact us",
      body:
        "For general questions, feature requests, or help using WeSafe, reach us at **support@we-safe.io**.\n\n" +
        "For account deletion, data-export, or other privacy requests, email **privacy@we-safe.io**.",
    },
    {
      title: "Common questions",
      body:
        "- **How do I trigger SOS?** Long-press the orange SOS button for 1.5 seconds, or set up a Back Tap or Siri shortcut from Profile → Quick SOS Setup.\n" +
        "- **How do I become a volunteer?** Open Profile → Volunteer Program → toggle Volunteer on and complete the consent screen.\n" +
        "- **How do I delete my account?** Profile → Settings → Delete My Account. The deletion is permanent and removes your Firestore profile, FCM token, and Firebase Auth identity in two taps.\n" +
        "- **Is WeSafe free?** Yes, fully free. No ads, no subscriptions, no in-app purchases.\n" +
        "- **Does WeSafe replace 112 / 911?** No. WeSafe is a community-coordination tool. In any real emergency, call your local emergency number first.",
    },
    {
      title: "Status",
      body:
        "If something is not working, before contacting us please confirm you have a working internet connection and that the latest WeSafe build is installed from the App Store. We will post any platform-wide outage on this page.",
    },
  ],
};

const TR: SupportContent = {
  brand: "WeSafe",
  title: "Destek",
  intro: "Hafta içi 24 saat içinde yanıt veriyoruz.",
  sections: [
    {
      title: "Bize ulaşın",
      body:
        "Genel sorular, özellik talepleri veya WeSafe kullanımıyla ilgili yardım için **support@we-safe.io** adresinden bize ulaşın.\n\n" +
        "Hesap silme, veri dışa aktarma veya diğer gizlilik talepleri için **privacy@we-safe.io** adresine e-posta gönderin.",
    },
    {
      title: "Sık sorulan sorular",
      body:
        "- **SOS'u nasıl tetiklerim?** Turuncu SOS butonunu 1.5 saniye basılı tut veya Profil → Hızlı SOS Kurulumu üzerinden Back Tap (arkaya dokunma) ya da Siri kısayolu kur.\n" +
        "- **Nasıl gönüllü olurum?** Profil → Gönüllü Programı → Gönüllülüğü aç ve onay ekranını tamamla.\n" +
        "- **Hesabımı nasıl silerim?** Profil → Ayarlar → Hesabımı Sil. Silme kalıcıdır; Firestore profilini, FCM token'ını ve Firebase Auth kimliğini iki dokunuşta kaldırır.\n" +
        "- **WeSafe ücretsiz mi?** Evet, tamamen ücretsiz. Reklam yok, abonelik yok, uygulama içi satın alma yok.\n" +
        "- **WeSafe 112'nin yerine geçer mi?** Hayır. WeSafe bir topluluk-koordinasyon aracıdır. Gerçek bir acil durumda önce yerel acil yardım numaranızı arayın.",
    },
    {
      title: "Durum",
      body:
        "Bir şey çalışmıyorsa, bizimle iletişime geçmeden önce lütfen internet bağlantınızın çalıştığını ve App Store'dan en güncel WeSafe sürümünü yüklediğinizi onaylayın. Platform genelindeki herhangi bir kesintiyi bu sayfada duyururuz.",
    },
  ],
};

const MAP: Record<Locale, SupportContent> = { en: EN, tr: TR, es: EN, ar: EN };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const c = MAP[locale as Locale] ?? EN;
  return {
    title: `${c.title} — WeSafe`,
    description: c.intro,
    alternates: { canonical: `https://we-safe.io/${locale}/support` },
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const c = MAP[locale as Locale] ?? EN;

  return (
    <LegalShell
      locale={locale}
      eyebrow={c.brand}
      title={c.title}
      lastUpdated={c.intro}
      sections={c.sections}
    />
  );
}
