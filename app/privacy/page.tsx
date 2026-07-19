import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Bhutan Aravia Peaks",
  description: "How Bhutan Aravia Peaks collects, uses, and protects the personal information you share with us.",
  alternates: {
    canonical: "/privacy",
  },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border/60 py-8 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-xl font-semibold text-primary sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/30 pt-28 pb-20 md:pt-32">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center">Legal</span>
            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              We collect only what we need to plan your journey and respond to you. Last updated July 2026.
            </p>
          </div>

          <div className="card-premium border border-border/70 px-6 py-8 shadow-sm sm:px-10 sm:py-10">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              This policy explains how <strong className="text-foreground">Bhutan Aravia Peaks</strong> collects,
              uses, and protects your personal information when you use this website, submit an inquiry, or book a
              journey with us.
            </p>

            <Section title="1. Information We Collect">
              <p>When you submit an inquiry or contact form, we collect:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Your full name, email address, and phone number</li>
                <li>Your country of residence</li>
                <li>Trip details you provide — package interest, travel dates, group size, and your message</li>
              </ul>
              <p>
                We also use privacy-respecting analytics (Vercel Analytics and Speed Insights) to understand overall
                site traffic and performance. These do not identify you personally.
              </p>
            </Section>

            <Section title="2. How We Use Your Information">
              <ul className="list-disc space-y-2 pl-5">
                <li>To respond to your inquiry and prepare a tailored travel proposal</li>
                <li>To send you a confirmation email and, where relevant, your booking reference number</li>
                <li>To arrange visas, permits, and bookings with hotels, guides, and other Providers on your behalf</li>
                <li>To improve our website and the services we offer</li>
              </ul>
              <p>We do not sell your personal information to third parties, and we do not use it for advertising.</p>
            </Section>

            <Section title="3. Where Your Information Is Stored">
              <p>
                Submissions are stored securely in a MongoDB Atlas database that only authorized Bhutan Aravia Peaks
                staff can access. Emails are sent through Resend and, as a backup, Gmail — both reputable email
                providers with their own security practices.
              </p>
            </Section>

            <Section title="4. Sharing With Third Parties">
              <p>
                We share the minimum information necessary with the Royal Government of Bhutan and our trusted
                Providers (hotels, guides, drivers) solely to arrange your visa, permits, and bookings. We do not
                share your information with any other third party for marketing purposes.
              </p>
            </Section>

            <Section title="5. Your Rights">
              <p>
                You may ask us to access, correct, or delete the personal information we hold about you at any time
                by emailing{" "}
                <a
                  href="mailto:info@bhutanaraviapeaks.com"
                  className="font-semibold text-primary underline underline-offset-2"
                >
                  info@bhutanaraviapeaks.com
                </a>
                . We will respond within a reasonable time.
              </p>
            </Section>

            <Section title="6. Cookies">
              <p>
                This website uses only essential and analytics cookies needed for the site to function and for us
                to understand site usage. We do not use third-party advertising or tracking cookies.
              </p>
            </Section>

            <Section title="7. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices. Continued
                use of this website after an update constitutes acceptance of the revised policy. See also our{" "}
                <Link href="/terms" className="font-semibold text-primary underline underline-offset-2">
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
