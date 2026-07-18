import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"

type ThankYouSearchParams = {
  [key: string]: string | string[] | undefined
}

export const metadata: Metadata = {
  title: "Inquiry Received | Bhutan Aravia Peaks",
  description: "Thanks for your inquiry. Our travel specialists will respond within 24 hours.",
}

const getStringValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] ?? "" : value ?? ""

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams?: Promise<ThankYouSearchParams>
}) {
  const params = (await searchParams) ?? {}
  const referenceNumber = getStringValue(params.ref)
  const name = getStringValue(params.name)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/30 pt-28 pb-20 md:pt-32">
        <div className="container mx-auto max-w-2xl px-4 md:px-6">
          <Card className="card-premium overflow-hidden border border-border/70 shadow-sm">
            <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent" />
            <CardHeader className="border-b border-border/60 bg-muted/30 px-6 py-8 text-center md:px-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              </div>
              <CardTitle className="font-serif text-3xl font-semibold">
                Thank you{name ? `, ${name}` : ""}!
              </CardTitle>
              <CardDescription className="text-lg">
                Your inquiry has been received. A Bhutan specialist will reach out within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-6 py-8 md:px-8">
              {referenceNumber && (
                <div className="rounded-xl bg-primary p-6 text-center">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                    Inquiry reference
                  </p>
                  <p className="font-serif text-3xl font-semibold tracking-wide text-primary-foreground md:text-4xl">
                    {referenceNumber}
                  </p>
                  <p className="mt-3 text-xs text-primary-foreground/70">
                    Save this number for your records — you can quote it in any future correspondence.
                  </p>
                </div>
              )}

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:border-accent/60 hover:text-primary"
                >
                  <ArrowLeft
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  Back home
                </Link>
                <Link
                  href="/packages"
                  className="btn-premium hover-glow group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                >
                  Explore packages
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
