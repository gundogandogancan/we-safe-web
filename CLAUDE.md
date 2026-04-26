# WeSafe Web — we-safe.io

## Proje
WeSafe, Türkiye pazarını hedefleyen bir kadın güvenliği mobil uygulamasıdır.
Domain: we-safe.io
Stack: Next.js 14 App Router + Framer Motion + Tailwind CSS + TypeScript

## Tasarım Referansı
worldquantfoundry.com tasarım dili model alınıyor:
- Tam ekran seksiyonlar, scroll-triggered animasyonlar
- Sinematik geçişler, minimal uppercase navigasyon
- Karanlık, premium, duygusal estetik

## Marka Sistemi (DEĞİŞTİRİLEMEZ KURALLAR)
- Primary: Royal Purple #4A1A6B
- Deep Violet: #2D0F42
- Rose Gold: #C9A96E
- Cream Ivory: #FAF8F5 (açık arka plan)
- Soft Lavender: #C4B5D9
- SOS: #D64545 — YALNIZCA SOS elementlerinde. Başka hiçbir yerde kullanılmaz.
- Display font: Cormorant Garamond (Google Fonts)
- Body font: DM Sans (Google Fonts)
- Brand voice: "bilge abla" — güven verir, yargılamaz, güçlendirir

## Site Seksiyon Sırası
1. Navbar (minimal, uppercase, sticky)
2. Hero (tam ekran, sinematik, duygusal)
3. Neden WeSafe (4 özellik: Safe Journey, SOS, City Counter, Community)
4. Nasıl Çalışır (adım adım)
5. İstatistikler / Etki
6. Ekip
7. Basın
8. İndir (App Store + Google Play CTA)
9. İletişim formu
10. Footer

## Kod Standartları
- Her section: src/components/sections/NamSection.tsx
- Paylaşılan componentler: src/components/ui/
- Animasyonlar: Framer Motion (useInView + motion)
- Mobile-first responsive
- next/image zorunlu, img tag yasak
- SOS rengi (#D64545) ihlali kabul edilmez
- Türkçe öncelikli, İngilizce için next-intl altyapısı

## Animasyon Standartları
- Scroll reveal: fade up (y: 40→0, opacity: 0→1, duration: 0.6s)
- Sayfa hover: scale 1→1.02, 0.2s ease
- SOS elementleri: pulse, #D64545
