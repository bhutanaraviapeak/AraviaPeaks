import Link from "next/link"
import { ArrowRight, Clock, MapPin, Gauge } from "lucide-react"
import { ImageLoader } from "@/components/media/image-loader"
import { getPackagePath, packageCategories, type TourPackage } from "@/lib/data/packages"

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const categoryLabel = packageCategories.find((cat) => cat.slug === pkg.category)?.label ?? pkg.category
  const priceLabel = pkg.startingFrom ? `$${pkg.startingFrom.toLocaleString()}` : null
  const heroImage = pkg.heroImage

  return (
    <Link href={getPackagePath(pkg)} className="group card-premium flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageLoader
          src={heroImage}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary backdrop-blur-sm">
          {categoryLabel}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <Clock className="h-3.5 w-3.5" /> {pkg.durationLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-4 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" /> {pkg.region}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-accent" /> {pkg.difficulty}
          </span>
        </div>

        <h3 className="font-serif text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
          {pkg.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{pkg.summary}</p>

        <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5">
          <div>
            {priceLabel ? (
              <>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">From</span>
                <span className="font-serif text-lg font-semibold text-primary">
                  {priceLabel}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">/ person</span>
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-muted-foreground">Bespoke pricing</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5 group-hover:text-accent">
            View journey <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
