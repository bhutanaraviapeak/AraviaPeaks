import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackageCard } from "@/components/packages/package-card"
import { packages, packageCategories, type PackageCategory } from "@/lib/data/packages"

type PackagesSearchParams = {
  [key: string]: string | string[] | undefined
}

type CategoryPageProps = {
  params: Promise<{ category: string }>
  searchParams?: Promise<PackagesSearchParams>
}

const getStringValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] ?? "" : value ?? ""

const durationBucket = (days: number) => {
  if (days <= 6) return "short"
  if (days <= 10) return "medium"
  return "long"
}

export function generateStaticParams() {
  return packageCategories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const categorySlug = category as PackageCategory
  const categoryInfo = packageCategories.find((item) => item.slug === categorySlug)

  if (!categoryInfo) {
    return { title: "Package Category Not Found" }
  }

  const title = `${categoryInfo.label} | Bhutan Aravia Peaks`
  const description = `Browse curated ${categoryInfo.label.toLowerCase()} with trusted Bhutanese guides.`

  return {
    title,
    description,
    alternates: {
      canonical: `/packages/${categorySlug}`,
    },
    openGraph: {
      title,
      description,
      url: `/packages/${categorySlug}`,
      type: "website",
    },
  }
}

export default async function PackagesCategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params
  const categorySlug = category as PackageCategory
  const categoryInfo = packageCategories.find((item) => item.slug === categorySlug)

  if (!categoryInfo) {
    notFound()
  }

  const paramsSearch = (await searchParams) ?? {}
  const searchTerm = getStringValue(paramsSearch.q)
  const difficultyFilter = getStringValue(paramsSearch.difficulty)
  const durationFilter = getStringValue(paramsSearch.duration)
  const regionFilter = getStringValue(paramsSearch.region)

  const regions = Array.from(new Set(packages.map((pkg) => pkg.region))).sort()

  const filteredPackages = packages.filter((pkg) => {
    if (pkg.category !== categorySlug) return false

    const difficultyMatch =
      !difficultyFilter || difficultyFilter === "all" || pkg.difficulty.toLowerCase() === difficultyFilter
    const durationMatch =
      !durationFilter || durationFilter === "all" || durationBucket(pkg.durationDays) === durationFilter
    const regionMatch = !regionFilter || regionFilter === "all" || pkg.region === regionFilter
    const searchMatch =
      !searchTerm ||
      [pkg.title, pkg.summary, pkg.description, pkg.region, pkg.bestTime, ...pkg.highlights]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    return difficultyMatch && durationMatch && regionMatch && searchMatch
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/package-bg.webp" alt="" fill priority className="scale-105 object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-background" />
            <div className="absolute inset-0 hero-gradient" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center text-white">
              <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Journeys
              </span>
              <h1 className="mb-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
                {categoryInfo.label}
              </h1>
              <p className="text-lg text-white/85 text-balance">
                Browse curated {categoryInfo.label.toLowerCase()} with trusted local guides and seamless planning.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 section-tint">
          <div className="container px-4 md:px-6 space-y-8">
            <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" method="get">
              <input
                name="q"
                placeholder="Search within this category"
                defaultValue={searchTerm}
                className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <select
                name="difficulty"
                defaultValue={difficultyFilter || "all"}
                className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="all">All Difficulty</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="challenging">Challenging</option>
                <option value="extreme">Extreme</option>
              </select>
              <select
                name="duration"
                defaultValue={durationFilter || "all"}
                className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="all">All Durations</option>
                <option value="short">4–6 Days</option>
                <option value="medium">7–10 Days</option>
                <option value="long">11+ Days</option>
              </select>
              <select
                name="region"
                defaultValue={regionFilter || "all"}
                className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="all">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn-premium hover-glow w-full h-10 text-sm font-semibold lg:col-span-4">
                Update results
              </button>
            </form>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{filteredPackages.length} tours found in {categoryInfo.label}</span>
              <span>Need a custom itinerary? We tailor every journey.</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPackages.map((pkg) => (
                <PackageCard key={`${pkg.category}-${pkg.slug}`} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
