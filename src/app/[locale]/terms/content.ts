/**
 * Terms of Service content. Mirrors legal.terms.section* from the iOS app.
 */

import { type Locale } from "@/i18n/routing";

export interface TermsContent {
  brand: string;
  title: string;
  lastUpdated: string;
  sections: { title: string; body: string }[];
}

const EN: TermsContent = {
  brand: "WeSafe",
  title: "Terms of Service",
  lastUpdated: "Last updated: May 2026",
  sections: [
    {
      title: "1. Service Description and Scope",
      body:
        "WeSafe (the “Service”, “we”, “us”, or “our”) is a mobile application that provides community-supported personal-safety features, including an emergency SOS button, location sharing, safe-arrival check-ins, live audio and video streaming during emergencies, community safety reporting, and volunteer coordination.\n\n" +
        "By installing, accessing, or using WeSafe, you (the “User”) agree to be bound by these Terms of Service (the “Terms”). If you do not agree to these Terms you must not use the Service.",
    },
    {
      title: "2. Limitation of Liability",
      body:
        "**IMPORTANT**: WeSafe is an auxiliary technical tool. It is not, and does not purport to be, an emergency service, a substitute for official emergency services, or a guarantor of your safety. In any actual emergency you must contact the appropriate official emergency number in your jurisdiction — for example, 112 across the European Union and Türkiye, 911 in the United States and Canada, 999 in the United Kingdom, 000 in Australia, 110 / 118 / 119 in Japan, or the equivalent local number where you are located.\n\n" +
        "To the maximum extent permitted by applicable law:\n\n" +
        "- The Service is provided on an “as is” and “as available” basis, without warranties of any kind, express or implied, including fitness for a particular purpose, accuracy, reliability, availability, or non-infringement.\n" +
        "- We do not warrant that the Service will operate uninterrupted, error-free, or under all network, hardware, or environmental conditions.\n" +
        "- We are not liable for interruptions caused by internet connectivity, GPS or cellular signal, device malfunction, third-party platforms, or any cause outside our reasonable control.\n" +
        "- We are not liable for any acts, omissions, negligence, or misconduct of users, volunteers, or any other third party.\n" +
        "- We are not liable for any indirect, incidental, consequential, special, punitive, or exemplary damages arising from your use of, or inability to use, the Service.\n\n" +
        "Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under the mandatory law applicable to you (including consumer-protection law). WeSafe must never be relied upon as your sole safety measure.",
    },
    {
      title: "3. User Obligations",
      body:
        "You agree:\n\n" +
        "- To use the Service only for lawful purposes and in accordance with these Terms.\n" +
        "- To provide accurate, current, and complete information about yourself.\n" +
        "- Not to use the SOS feature for any false, frivolous, or malicious purpose.\n" +
        "- Not to submit safety reports that you know to be false, misleading, or unfounded.\n" +
        "- To respect the rights, privacy, and dignity of other users and volunteers.\n" +
        "- Not to reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Service, except to the extent expressly permitted by applicable law.\n" +
        "- Not to interfere with, disrupt, or attempt to gain unauthorised access to the Service or its infrastructure.\n\n" +
        "The submission of false emergency notifications or fictitious safety reports may constitute a criminal offence under the laws of your jurisdiction. You assume sole and exclusive responsibility — civil and criminal — for any such conduct.",
    },
    {
      title: "4. Volunteer Program",
      body:
        "The WeSafe volunteer program is a community solidarity-based support system.\n\n" +
        "- Volunteers are independent individuals; they are not employees, representatives, or agents of WeSafe.\n" +
        "- WeSafe cannot be held responsible for the actions, negligence, or faults of volunteers.\n" +
        "- Volunteer assistance does not replace professional security, health, or law enforcement services.\n" +
        "- WeSafe does not guarantee the qualifications, competence, or reliability of volunteers.\n" +
        "- Responsibility for any disputes arising from volunteer-user interactions lies with the relevant parties.",
    },
    {
      title: "5. Location Data and GPS",
      body:
        "The application's location-based features rely on GPS technology.\n\n" +
        "- GPS accuracy depends on environmental conditions (indoors, weather, signal strength).\n" +
        "- WeSafe does not guarantee that location information will always be accurate or up-to-date.\n" +
        "- WeSafe cannot be held responsible for technical errors that may occur during location sharing.\n" +
        "- Users acknowledge that location information is an approximate value.",
    },
    {
      title: "6. Service Continuity",
      body:
        "WeSafe provides the service “as is.”\n\n" +
        "- The application may be temporarily unavailable due to maintenance, updates, or technical reasons.\n" +
        "- WeSafe is not responsible for interruptions in third-party services (Firebase, internet providers, mobile operators).\n" +
        "- WeSafe reserves the right to modify, suspend, or terminate the service with or without prior notice.",
    },
    {
      title: "7. Intellectual Property",
      body:
        "All rights to the WeSafe application (including design, software, content, brand, and logo) are reserved. Users are granted only a limited license for personal and non-commercial use. Copying, distributing, reverse engineering, or modifying the application is prohibited.",
    },
    {
      title: "8. Account Termination",
      body:
        "We reserve the right to suspend or permanently terminate any user account, with or without prior notice, in the following cases:\n\n" +
        "- Material violation of these Terms\n" +
        "- False SOS notifications or submission of fictitious safety reports\n" +
        "- Conduct that endangers the safety or wellbeing of other users or volunteers\n" +
        "- Misuse, abuse, or manipulation of the Service or its infrastructure\n\n" +
        "Account termination does not affect your right to request deletion of your personal data under the data-protection law applicable to you in your jurisdiction.",
    },
    {
      title: "9. Governing Law and Jurisdiction",
      body:
        "These Terms shall be interpreted in accordance with the mandatory consumer-protection laws of your country of habitual residence. Any dispute arising out of or in connection with these Terms shall be resolved before the courts competent at your habitual residence, except where applicable mandatory law provides for an exclusive alternative forum (for example, the consumer-arbitration regimes available under EU, UK, and equivalent jurisdictions, or the consumer arbitration committees and consumer courts under Türkiye's Consumer Protection Law No. 6502).\n\n" +
        "Nothing in this section limits any right of action you have under applicable mandatory consumer-protection law, nor your right to bring proceedings in any forum that you are entitled to under that law.",
    },
    {
      title: "10. Amendments and Effective Date",
      body:
        "We reserve the right to update these Terms at any time. Material changes will be announced in-app before they take effect. Your continued use of the Service after such changes become effective constitutes your acceptance of the updated Terms.\n\n" +
        "For questions: **legal@we-safe.io**",
    },
    {
      title: "11. Local Legal Disclaimer",
      body:
        "By using WeSafe you agree to comply with all laws and regulations applicable to you in your country and region. All actions taken through the Service — including SOS notifications, safety reports, location sharing, and messaging — are taken under your sole responsibility. The Service is a communication and coordination tool only; it is not, and does not replace, official emergency services.\n\n" +
        "We process your personal data in accordance with the data-protection law applicable to you, including:\n\n" +
        "- **GDPR** (EU/EEA) and **UK GDPR** (United Kingdom)\n" +
        "- **KVKK** (Türkiye, Law No. 6698)\n" +
        "- **CCPA / CPRA** (California, USA)\n" +
        "- **LGPD** (Brazil)\n" +
        "- **PIPEDA** (Canada)\n" +
        "- **APPI** (Japan)\n" +
        "- **PDPA** (Singapore, Thailand)\n" +
        "- **POPIA** (South Africa)\n" +
        "- Any other data-protection regime applicable in your jurisdiction\n\n" +
        "Any dispute arising from your use of the Service will be resolved before the courts competent at your habitual residence under the mandatory law applicable to you.",
    },
  ],
};

const TR: TermsContent = {
  brand: "WeSafe",
  title: "Kullanım Koşulları",
  lastUpdated: "Son güncelleme: Mayıs 2026",
  sections: [
    {
      title: "1. Hizmet Tanımı ve Kapsam",
      body:
        "WeSafe (“Hizmet”, “biz”, “bizim”), kişisel güvenliğinize yardımcı olmayı amaçlayan; SOS acil durum butonu, konum paylaşımı, güvenli varış takibi (check-in), acil durumda canlı görüntü ve ses yayını, topluluk güvenlik raporlama ve gönüllü koordinasyon özellikleri sunan, topluluk-destekli bir mobil uygulamadır.\n\n" +
        "WeSafe'i yükleyerek, erişerek veya kullanarak siz (“Kullanıcı”), işbu Kullanım Koşulları (“Koşullar”) ile bağlı olmayı kabul edersiniz. Bu Koşulları kabul etmiyorsanız Hizmeti kullanmamalısınız.",
    },
    {
      title: "2. Sorumluluk Sınırlandırması",
      body:
        "**ÖNEMLİ**: WeSafe yalnızca yardımcı bir teknik araçtır. Bir acil yardım hizmeti, resmi acil yardım hizmetlerinin yerine geçen bir alternatif veya güvenliğinizin garantörü değildir; bu şekilde sunulmamaktadır. Herhangi bir gerçek acil durumda, bulunduğunuz ülkedeki uygun resmi acil yardım numarasını aramanız zorunludur — örneğin Türkiye ve Avrupa Birliği'nde 112, ABD ve Kanada'da 911, Birleşik Krallık'ta 999, Avustralya'da 000, Japonya'da 110/118/119 veya bulunduğunuz yerin yerel acil yardım numarası.\n\n" +
        "Uygulanabilir hukukun azami ölçüsünde:\n\n" +
        "- Hizmet, hiçbir açık veya zımni garanti olmaksızın “olduğu gibi” ve “kullanıma açık olduğu şekliyle” sunulur — belirli bir amaca uygunluk, doğruluk, güvenilirlik, erişilebilirlik veya ihlal etmeme dahil.\n" +
        "- Hizmetin kesintisiz, hatasız veya her ağ, donanım ya da çevresel koşulda çalışacağı garanti edilmez.\n" +
        "- İnternet bağlantısı, GPS veya hücresel sinyal, cihaz arızası, üçüncü taraf platformlar veya makul kontrolümüz dışındaki herhangi bir sebepten kaynaklanan kesintilerden sorumlu değiliz.\n" +
        "- Kullanıcıların, gönüllülerin veya herhangi bir üçüncü tarafın eylem, ihmal, kusur veya yanlış davranışından sorumlu değiliz.\n" +
        "- Hizmetin kullanımından veya kullanılamamasından doğabilecek hiçbir dolaylı, arızi, sonuçsal, özel, cezai veya ibret verici zarardan sorumlu değiliz.\n\n" +
        "Bu Koşullarda yer alan hiçbir hüküm, size uygulanabilir emredici hukuk (tüketici koruma hukuku dahil) uyarınca hariç tutulamayacak veya sınırlandırılamayacak bir sorumluluğu hariç tutmaz veya sınırlandırmaz. WeSafe'e asla tek başına güvenilmemelidir.",
    },
    {
      title: "3. Kullanıcı Yükümlülükleri",
      body:
        "Aşağıdakileri kabul edersiniz:\n\n" +
        "- Hizmeti yalnızca hukuka uygun amaçlarla ve işbu Koşullara uygun olarak kullanmak.\n" +
        "- Kendiniz hakkında doğru, güncel ve eksiksiz bilgi sağlamak.\n" +
        "- SOS özelliğini asılsız, gereksiz veya kötü niyetli amaçlarla kullanmamak.\n" +
        "- Yanlış, yanıltıcı veya asılsız olduğunu bildiğiniz güvenlik raporları paylaşmamak.\n" +
        "- Diğer kullanıcıların ve gönüllülerin haklarına, gizliliğine ve onuruna saygı göstermek.\n" +
        "- Uygulanabilir hukukun açıkça izin verdiği ölçü dışında Hizmeti tersine mühendislik etmemek, derleme ayrıştırma yapmamak veya kaynak kodunu çıkarmaya çalışmamak.\n" +
        "- Hizmete veya altyapısına müdahale etmemek, yetkisiz erişim girişiminde bulunmamak.\n\n" +
        "Asılsız acil durum bildirimi veya gerçek dışı güvenlik raporu paylaşımı, bulunduğunuz ülkenin yasaları kapsamında suç teşkil edebilir. Bu tür davranışların hukuki ve cezai sorumluluğunu münhasıran ve tek başınıza üstlenirsiniz.",
    },
    {
      title: "4. Gönüllü Programı",
      body:
        "WeSafe gönüllü programı, topluluk dayanışmasına dayalı bir destek sistemidir.\n\n" +
        "- Gönüllüler bağımsız bireylerdir; WeSafe'in çalışanı, temsilcisi veya vekili değildir.\n" +
        "- Gönüllülerin eylem, ihmal veya kusurlarından WeSafe sorumlu tutulamaz.\n" +
        "- Gönüllü yardımı profesyonel güvenlik, sağlık veya kolluk hizmeti yerine geçmez.\n" +
        "- WeSafe, gönüllülerin niteliği, yetkinliği veya güvenilirliği konusunda herhangi bir garanti vermez.\n" +
        "- Gönüllü-kullanıcı etkileşiminden doğan her türlü anlaşmazlıkta sorumluluk ilgili taraflara aittir.",
    },
    {
      title: "5. Konum Verileri ve GPS",
      body:
        "Uygulamanın konum tabanlı özellikleri GPS teknolojisine dayanmaktadır.\n\n" +
        "- GPS doğruluğu çevresel koşullara (bina içi, hava durumu, sinyal gücü) bağlıdır.\n" +
        "- WeSafe, konum bilgisinin her zaman doğru veya güncel olacağını garanti etmez.\n" +
        "- Konum paylaşımı sırasında oluşabilecek teknik hatalardan dolayı WeSafe sorumlu tutulamaz.\n" +
        "- Kullanıcılar, konum bilgisinin yaklaşık bir değer olduğunu kabul eder.",
    },
    {
      title: "6. Hizmet Sürekliliği",
      body:
        "WeSafe, hizmeti olduğu gibi (“as is”) sunmaktadır.\n\n" +
        "- Uygulama bakım, güncelleme veya teknik nedenlerle geçici olarak kullanılamayabilir.\n" +
        "- Üçüncü taraf hizmetlerindeki (Firebase, internet sağlayıcıları, mobil operatörler) kesintilerden WeSafe sorumlu değildir.\n" +
        "- WeSafe, önceden bildirimde bulunarak veya bulunmaksızın hizmeti değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.",
    },
    {
      title: "7. Fikri Mülkiyet",
      body:
        "WeSafe uygulamasının tüm hakları (tasarım, yazılım, içerik, marka ve logo dahil) saklıdır. Kullanıcılara yalnızca kişisel ve ticari olmayan kullanım için sınırlı bir lisans verilmektedir. Uygulamanın kopyalanması, dağıtılması, tersine mühendisliği veya değiştirilmesi yasaktır.",
    },
    {
      title: "8. Hesap Sonlandırma",
      body:
        "Aşağıdaki durumlarda, önceden bildirimde bulunarak veya bulunmaksızın, herhangi bir kullanıcı hesabını askıya alma veya kalıcı olarak sonlandırma hakkımızı saklı tutarız:\n\n" +
        "- İşbu Koşulların esaslı ihlali\n" +
        "- Asılsız SOS bildirimi veya gerçek dışı güvenlik raporu paylaşımı\n" +
        "- Diğer kullanıcıların veya gönüllülerin güvenliğini veya esenliğini tehlikeye atan davranışlar\n" +
        "- Hizmetin veya altyapısının kötüye kullanılması, suistimali veya manipüle edilmesi\n\n" +
        "Hesap sonlandırma, bulunduğunuz ülkede uygulanabilir veri koruma mevzuatı kapsamında kişisel verilerinizin silinmesini talep etme hakkınızı etkilemez.",
    },
    {
      title: "9. Uygulanacak Hukuk ve Yetkili Mahkeme",
      body:
        "İşbu Koşullar, mutad ikamet ettiğiniz ülkenin emredici tüketici koruma hukukuna uygun olarak yorumlanır. Bu Koşullardan doğan veya bunlarla bağlantılı her türlü uyuşmazlık, uygulanabilir emredici hukukun münhasır bir alternatif merci öngördüğü haller dışında — örneğin AB, BK ve eşdeğer yargı çevrelerinde mevcut tüketici tahkim rejimleri ya da Türkiye'de 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamındaki tüketici hakem heyetleri ve tüketici mahkemeleri gibi — mutad ikamet yerinizdeki yetkili mahkemeler önünde çözülür.\n\n" +
        "Bu bölüm, uygulanabilir emredici tüketici koruma hukuku kapsamında sahip olduğunuz hiçbir dava hakkını ya da o hukukun size tanıdığı herhangi bir mercide dava açma hakkınızı sınırlamaz.",
    },
    {
      title: "10. Değişiklikler ve Yürürlük",
      body:
        "İşbu Koşulları herhangi bir zamanda güncelleme hakkımızı saklı tutarız. Esaslı değişiklikler, yürürlüğe girmeden önce uygulama içinden duyurulur. Değişiklikler yürürlüğe girdikten sonra Hizmeti kullanmaya devam etmeniz, güncellenmiş Koşulları kabul ettiğiniz anlamına gelir.\n\n" +
        "Sorularınız için: **legal@we-safe.io**",
    },
    {
      title: "11. Yerel Hukuki Uyarı",
      body:
        "WeSafe'i kullanarak, bulunduğunuz ülke ve bölgede size uygulanabilir tüm yasa ve düzenlemelere uymayı kabul edersiniz. Hizmet üzerinden gerçekleştirilen tüm eylemler — SOS bildirimleri, güvenlik raporları, konum paylaşımı ve mesajlaşma dahil — tek başına sizin sorumluluğunuzdadır. Hizmet yalnızca bir iletişim ve koordinasyon aracıdır; resmi acil yardım hizmetlerinin yerini almaz ve onlarla eşdeğer değildir.\n\n" +
        "Kişisel verileriniz, size uygulanabilir veri koruma mevzuatına uygun olarak işlenir:\n\n" +
        "- **GDPR** (AB/AEA) ve **UK GDPR** (Birleşik Krallık)\n" +
        "- **KVKK** (Türkiye, 6698 sayılı Kanun)\n" +
        "- **CCPA / CPRA** (Kaliforniya, ABD)\n" +
        "- **LGPD** (Brezilya)\n" +
        "- **PIPEDA** (Kanada)\n" +
        "- **APPI** (Japonya)\n" +
        "- **PDPA** (Singapur, Tayland)\n" +
        "- **POPIA** (Güney Afrika)\n" +
        "- Bulunduğunuz ülkede geçerli diğer veri koruma rejimleri\n\n" +
        "Hizmeti kullanımınızdan doğabilecek her türlü uyuşmazlık, size uygulanabilir emredici hukuk çerçevesinde mutad ikamet yerinizdeki yetkili mahkemeler önünde çözülür.",
    },
  ],
};

const ES: TermsContent = EN;
const AR: TermsContent = EN;

const MAP: Record<Locale, TermsContent> = { en: EN, tr: TR, es: ES, ar: AR };

export function getTermsContent(locale: Locale): TermsContent {
  return MAP[locale] ?? EN;
}
