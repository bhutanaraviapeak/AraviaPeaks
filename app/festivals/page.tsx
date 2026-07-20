"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import {
  CalendarDays,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CalendarClock,
  BookMarked,
  Shirt,
  Camera,
} from "lucide-react"

const festivalSchedule2026 = [
  { festival: "Lhamoi Dromche", location: "Trongsa", date: "Feb 23-25" },
  { festival: "Punakha Drupchen", location: "Punakha", date: "Feb 22-25" },
  { festival: "Punakha Tshechu", location: "Punakha", date: "Feb 26-28" },
  { festival: "Tharpaling Thongdrol", location: "Chumi, Bumthang", date: "Mar 3" },
  { festival: "Tangsibi Mani", location: "Ura, Bumthang", date: "Mar 4-6" },
  { festival: "Bhutan International Marathon", location: "Annual Event", date: "Mar 5" },
  { festival: "Gomphukora", location: "Trashigang", date: "Mar 26-28" },
  { festival: "Talo Tshechu", location: "Talo, Punakha", date: "Mar 26-28" },
  { festival: "Gasa Tshechu", location: "Gasa", date: "Mar 26-28" },
  { festival: "Zhemgang Tshechu", location: "Zhemgang", date: "Mar 26-28" },
  { festival: "Paro Tshechu", location: "Paro", date: "Mar 28-April 1", popular: true },
  { festival: "Chhorten Kora", location: "Trashiyangtse", date: "Mar 28" },
  { festival: "Haa Spring Festival", location: "Haa Valley", date: "April 7-9" },
  { festival: "Rhododendron Festival", location: "Lampelri Botanical Garden, Dochula", date: "April 17-19" },
  { festival: "Domkhar Tshechu", location: "Chumi, Bumthang", date: "April 18-20" },
  { festival: "Ura Yakchoe", location: "Ura, Bumthang", date: "April 20-24" },
  { festival: "Nimalung Tshechu", location: "Chumi, Bumthang", date: "June 14-16" },
  { festival: "Kurjey Tshechu", location: "Choekor, Bumthang", date: "June 16" },
  { festival: "Mushroom Festival", location: "Genekha, Thimphu", date: "Aug 15-16" },
  { festival: "Matsutaki Mushroom Festival", location: "Ura, Bumthang", date: "Aug 23-24" },
  { festival: "Tour of the Dragon - Bicycle Race", location: "Bumthang-Thimphu", date: "Sept 5" },
  { festival: "Thimphu Drupchen", location: "Thimphu", date: "Sep 9" },
  { festival: "Paro Dromche", location: "Paro", date: "Sep 11" },
  { festival: "Wangdue Tshechu", location: "Wangduephodrang", date: "Sep 11-13" },
  { festival: "Thimphu Tshechu", location: "Thimphu", date: "Sep 13-15", popular: true },
  { festival: "Tamshing Phala Choepa", location: "Tamshing, Bumthang", date: "Sep 13-15" },
  { festival: "Gangtey Tshechu", location: "Gangtey, Phobjikha Valley", date: "Sep 16-18" },
  { festival: "Thangbi Mani", location: "Choekor, Bumthang", date: "Sep 17-19" },
  { festival: "Jhomolhari Mountain Festival", location: "Dangochang (Jhomolhari Base Camp)", date: "Oct 14-15" },
  { festival: "Royal Highlander Festival", location: "TBA", date: "Oct 23-24" },
  { festival: "Chukha Tshechu", location: "Chukha", date: "Nov 11-13" },
  { festival: "Jakar Tshechu", location: "Choekor, Bumthang", date: "Nov 8-12" },
  { festival: "Jambay Lhakhang Drup", location: "Choekor, Bumthang", date: "Nov 15-18", popular: true },
  { festival: "Prakhar Duchhoed", location: "Chumi, Bumthang", date: "Nov 16-18" },
  { festival: "Dechenphu Tshechu", location: "Thimphu", date: "Nov 11" },
  { festival: "Black Necked Crane Festival", location: "Phobjikha Valley", date: "Nov 11", popular: true },
  { festival: "Goenpi Dromche", location: "Trongsa", date: "Nov 6-8" },
  { festival: "Mongar Tshechu", location: "Mongar", date: "Nov 9-11" },
  { festival: "Trashigang Tshechu", location: "Trashigang", date: "Nov 9-11" },
  { festival: "Jambay Lhakhang Singye Cham", location: "Bumthang", date: "Nov 15" },
  { festival: "Pemagatshel Tshechu", location: "Pema Gatshel", date: "Nov 9-11" },
  { festival: "Nalakhar Tshechu", location: "Bumthang", date: "Nov 15-17" },
  { festival: "Druk Wangyel Tshechu", location: "Dochula", date: "Dec 13" },
  { festival: "Trongsa Tshechu", location: "Trongsa", date: "Dec 9-12 (Dec 8 Chamjur)" },
  { festival: "Lhuentse Tshechu", location: "Lhuentse", date: "Dec 8-10" },
]

const festivals = [
  {
    id: "paro-tshechu",
    name: "Paro Tshechu",
    month: "March-April",
    location: "Paro Dzong",
    description:
      "The most famous festival in Bhutan, featuring spectacular masked dances, the unfurling of the giant thongdrel, and thousands of pilgrims from across the kingdom.",
    highlights: ["Sacred mask dances", "Giant thongdrel unveiling", "Atsara performances"],
    duration: "5 days",
    image: "/images/packages/paro-tshechu.jpg",
    packageLink: "/packages/festival/paro-tshechu",
    popular: true,
  },
  {
    id: "thimphu-tshechu",
    name: "Thimphu Tshechu",
    month: "September-October",
    location: "Tashichho Dzong, Thimphu",
    description:
      "Bhutan's largest festival held in the capital, attracting massive crowds to witness sacred dances and receive blessings in the presence of the royal family.",
    highlights: ["Largest festival gathering", "Royal family attendance", "Spectacular costumes"],
    duration: "3 days",
    image: "/images/packages/thimphu-tshechu.jpg",
    packageLink: "/packages/festival/thimphu-tshechu",
    popular: true,
  },
  {
    id: "punakha-drubchen",
    name: "Punakha Drubchen & Tshechu",
    month: "February-March",
    location: "Punakha Dzong",
    description:
      "Unique festival featuring dramatic reenactments of historic battles, followed by traditional tshechu dances in one of Bhutan's most beautiful dzongs.",
    highlights: ["Battle reenactments", "Warrior dances", "Punakha Dzong setting"],
    duration: "4 days",
    image: "/images/packages/punakha-drubchen.jpg",
    packageLink: "/packages/festival/punakha-drubchen",
  },
  {
    id: "jambay-lhakhang",
    name: "Jambay Lhakhang Drup",
    month: "October-November",
    location: "Jambay Lhakhang, Bumthang",
    description:
      "One of the most unique festivals featuring the sacred fire ceremony and midnight naked dance, performed to bless infertile women.",
    highlights: ["Sacred fire ceremony", "Ancient temple setting", "Spiritual blessings"],
    duration: "3 days",
    image: "/images/packages/jambay-lhakhang.jpg",
    packageLink: "/packages/festival/jambay-lhakhang",
  },
  {
    id: "black-necked-crane",
    name: "Black-Necked Crane Festival",
    month: "November",
    location: "Phobjikha Valley",
    description:
      "Celebrates the arrival of endangered black-necked cranes to Phobjikha Valley with cultural performances, conservation awareness, and nature walks.",
    highlights: ["Crane spotting", "Environmental awareness", "Folk dances"],
    duration: "1 day",
    image: "/images/packages/birdwatching.jpg",
    packageLink: "/inquiry",
  },
  {
    id: "wangdue-tshechu",
    name: "Wangdue Phodrang Tshechu",
    month: "September-October",
    location: "Wangdue Phodrang",
    description:
      "Traditional festival featuring the famous Raksha Mangcham (Ox Dance) and other sacred mask dances unique to this region.",
    highlights: ["Ox Dance", "Regional traditions", "Mountain views"],
    duration: "3 days",
    image: "/wangdue-phodrang-tshechu-festival-ox-dance-bhutan.jpg",
    packageLink: "/inquiry",
  },
  {
    id: "haa-summer",
    name: "Haa Summer Festival",
    month: "July",
    location: "Haa Valley",
    description:
      "Celebrates the nomadic herders of Haa Valley with yak rides, traditional games, local cuisine, and stunning alpine scenery.",
    highlights: ["Yak culture", "Traditional sports", "Alpine setting"],
    duration: "2 days",
    image: "/haa-valley-summer-festival-yak-nomadic-herders.jpg",
    packageLink: "/inquiry",
  },
  {
    id: "royal-highlander",
    name: "Royal Highlander Festival",
    month: "October",
    location: "Laya, Gasa",
    description:
      "Remote highland festival celebrating the unique culture of the highland communities, featuring yak shows and traditional customs.",
    highlights: ["Highland culture", "Yak competitions", "Remote location"],
    duration: "2 days",
    image: "/royal-highlander-festival-laya-highland-culture.jpg",
    packageLink: "/inquiry",
  },
]

const notes = [
  { icon: CalendarClock, titleKey: "festivals_dates_vary", descKey: "festivals_dates_vary_description" },
  { icon: BookMarked, titleKey: "festivals_book_early", descKey: "festivals_book_early_description" },
  { icon: Shirt, titleKey: "festivals_what_to_wear", descKey: "festivals_what_to_wear_description" },
  { icon: Camera, titleKey: "festivals_photography_etiquette", descKey: "festivals_photography_etiquette_description" },
] as const

export default function FestivalsPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="absolute inset-0">
            <Image
              src="/images/packages/cultural-heritage.jpg"
              alt="Bhutan festivals"
              fill
              priority
              className="scale-105 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-background" />
            <div className="absolute inset-0 hero-gradient" />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t("festivals_badge")}
              </span>
              <h1 className="mb-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl md:text-6xl">
                {t("festivals_title")}
              </h1>
              <p className="text-lg text-white/85 text-balance">{t("festivals_description")}</p>
            </div>
          </div>
        </section>

        {/* What are Tshechus */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Sacred Tradition</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {t("festivals_what_are")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("festivals_explanation")}</p>
            </div>
          </div>
        </section>

        {/* Featured Festivals Grid */}
        <section className="py-20 md:py-28 section-tint">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Signature Celebrations</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                Featured Festivals
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Experience the most celebrated festivals in Bhutan
              </p>
            </div>

            <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {festivals.map((festival) => (
                <div key={festival.id} className="group card-premium flex flex-col overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={festival.image}
                      alt={festival.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    {festival.popular && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                        <Sparkles className="h-3 w-3" /> {t("festivals_most_popular")}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-xl font-semibold text-white">{festival.name}</h3>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>{festival.month}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-accent" /> {festival.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-accent" /> {festival.duration}
                      </span>
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{festival.description}</p>

                    <div className="mt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                        {t("festivals_highlights")}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {festival.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-[11px] text-foreground/75"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={festival.packageLink}
                      className="btn-premium mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide"
                    >
                      {festival.packageLink === "/inquiry"
                        ? t("festivals_plan_around")
                        : t("festivals_view_package")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Festival Schedule */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow justify-center">Plan Ahead</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                Bhutanese Festival Schedule 2026
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Complete list of festivals happening throughout the year
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-5xl">
              <div className="card-premium overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border/70 bg-muted/40">
                        <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Festival
                        </th>
                        <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Location
                        </th>
                        <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {festivalSchedule2026.map((item, index) => (
                        <tr
                          key={index}
                          className={`border-b border-border/50 transition-colors last:border-0 hover:bg-accent/5 ${
                            item.popular ? "bg-accent/[0.04]" : ""
                          }`}
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{item.festival}</span>
                              {item.popular && (
                                <span className="inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                                  Popular
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground">{item.location}</td>
                          <td className="px-5 py-3.5 text-muted-foreground">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-border/70 bg-muted/30 px-5 py-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> Choose the festival of your interest from the
                    list above and contact us — we&rsquo;ll provide more detailed information and help plan your trip
                    around it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-20 md:py-28 section-tint">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Before You Go</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {t("festivals_important_notes_title")}
              </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
              {notes.map(({ icon: Icon, titleKey, descKey }) => (
                <div key={titleKey} className="card-premium p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{t(titleKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, #b08733 0%, transparent 42%), radial-gradient(circle at 88% 85%, #1d5238 0%, transparent 46%)",
            }}
          />
          <div className="container relative mx-auto px-4 text-center md:px-6">
            <span className="eyebrow justify-center">Join the Celebration</span>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl">
              {t("festivals_cta_title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-balance text-white/70">
              {t("festivals_cta_description")}
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href="/inquiry"
                className="btn-premium group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide"
              >
                {t("festivals_cta_button")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
