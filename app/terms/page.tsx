import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms & Conditions | Bhutan Aravia Peaks",
  description:
    "Booking, payment, cancellation, and travel terms for journeys arranged through Bhutan Aravia Peaks.",
  alternates: {
    canonical: "/terms",
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

const cancellationTiers = [
  { window: "90 days and above", fee: "10% of Land Cost" },
  { window: "60 to 89 days", fee: "20% of Land Cost" },
  { window: "30 to 59 days", fee: "30% of Land Cost" },
  { window: "15 to 29 days", fee: "50% of Land Cost" },
  { window: "14 days or fewer", fee: "100% of Land Cost" },
]

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/30 pt-28 pb-20 md:pt-32">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center">Legal</span>
            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Please read these terms carefully before booking a journey with us. Last updated July 2026.
            </p>
          </div>

          <div className="card-premium border border-border/70 px-6 py-8 shadow-sm sm:px-10 sm:py-10">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              By accessing this website, submitting an inquiry, or booking a journey with{" "}
              <strong className="text-foreground">Bhutan Aravia Peaks</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or the &ldquo;Company&rdquo;), you acknowledge that you have read, understood, and agree to be bound
              by these Terms &amp; Conditions. If you do not agree to these terms, please do not proceed with your
              booking.
            </p>

            <Section title="1. Introduction & Definitions">
              <p>
                Bhutan Aravia Peaks is a locally owned and licensed Bhutanese tour operator (Business License
                No. 06013153, Department of Industry, MoICE; Department of Tourism Clearance No. DOT/2025/918).
                We arrange travel and tourism services by coordinating with hotels, guides, drivers, airlines,
                and other third-party suppliers (&ldquo;Providers&rdquo;) on your behalf.
              </p>
              <p>
                <strong className="text-foreground">Relationship:</strong> We manage the planning, coordination,
                and logistics of your journey. While we carefully vet every Provider we work with, we do not
                directly operate hotels, airlines, or transport companies, and cannot be held responsible for
                service failures, delays, or losses caused directly by a third-party Provider.
              </p>
              <p>
                <strong className="text-foreground">Client:</strong> Unless stated otherwise, &ldquo;Client&rdquo;
                refers to every traveler included in a booking, not only the person who made the payment.
              </p>
            </Section>

            <Section title="2. Booking, Pricing & Payment">
              <p>
                Final pricing and the payment schedule are confirmed in writing between you and Bhutan Aravia Peaks
                before your booking is secured. Quoted prices include the itinerary items, meals, and
                accommodations specified in your written proposal, along with the planning, coordination, and
                administrative work required to prepare your journey. Minor itinerary adjustments may occur due to
                local availability; we will always inform you of any material change.
              </p>
              <p>The following are non-refundable once processed, regardless of the cancellation window below:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-foreground">Bhutan Visa Fee</strong> — the USD 40 visa fee paid to the
                  Royal Government of Bhutan.
                </li>
                <li>
                  <strong className="text-foreground">Payment processing fees</strong> — any bank transfer, wire, or
                  card-processing charges levied by our payment providers.
                </li>
                <li>
                  <strong className="text-foreground">Airfare</strong> — once any domestic or international flight
                  ticket is issued on your behalf, its cost is non-refundable.
                </li>
              </ul>
            </Section>

            <Section title="3. Cancellation Policy">
              <p>If written notice of cancellation is received, the following cancellation fee applies:</p>
              <div className="overflow-hidden rounded-xl border border-border/70">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <th className="px-4 py-3">Notice Before Travel</th>
                      <th className="px-4 py-3">Cancellation Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancellationTiers.map((row) => (
                      <tr key={row.window} className="border-t border-border/60">
                        <td className="px-4 py-3 text-foreground">{row.window}</td>
                        <td className="px-4 py-3 font-semibold text-primary">{row.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                <strong className="text-foreground">Note:</strong> If your trip is shortened or interrupted after
                arrival in Bhutan for any reason beyond our control, no refund can be issued for the unused portion
                — hotels, guides, and other logistics for your full itinerary are paid for in advance.
              </p>
            </Section>

            <Section title="4. Delayed Arrivals & Departures">
              <p>
                We are unable to offer refunds for delayed arrivals, missed connections, or early departures caused
                by weather conditions, flight disruptions, roadblocks, or other circumstances outside our control.
                Any additional food, accommodation, transportation, or related costs arising from such delays are
                the responsibility of the Client.
              </p>
            </Section>

            <Section title="5. Travel Requirements: Visas, Insurance & Health">
              <p>
                <strong className="text-foreground">Visas:</strong> A visa is required for all visitors except
                Indian nationals, who require a valid permit instead. We assist with
                your Bhutan visa application as part of your booking; however, you are responsible for any transit
                or entry visas required for other countries on your itinerary. We cannot issue a refund if travel is
                prevented due to incomplete or incorrect personal travel documentation.
              </p>
              <p>
                <strong className="text-foreground">Health:</strong> Please disclose in writing, at the time of
                booking, any medical condition that may require special arrangements. We will make reasonable
                efforts to accommodate your needs, but you remain responsible for your own medications, vaccinations,
                and medical care before, during, and after your journey.
              </p>
              <p>
                <strong className="text-foreground">Travel Insurance:</strong> Comprehensive travel insurance
                covering medical treatment and emergency evacuation is required for all travelers to Bhutan. Any
                costs not covered by your insurance remain your responsibility.
              </p>
            </Section>

            <Section title="6. Client Responsibilities & Conduct">
              <p>
                We ask every traveler to behave respectfully toward Bhutan&rsquo;s culture, people, religious sites,
                and laws. Clients are financially responsible for any loss or damage caused by their own conduct.
                Please take the time to note fire safety and emergency evacuation information at each hotel. Bhutan
                Aravia Peaks and its Providers are not liable for Clients during unguided personal or &ldquo;free
                time&rdquo; outside the scheduled itinerary.
              </p>
            </Section>

            <Section title="7. Itinerary Changes & Force Majeure">
              <p>
                Bhutan Aravia Peaks may adjust, reorder, substitute, or cancel elements of an itinerary where
                necessary for safety, weather, road conditions, or operational reasons, and will keep you informed
                of any material change. We are not responsible for delays, losses, or changes arising from events
                beyond our reasonable control, including natural disasters, government restrictions, epidemics,
                strikes, civil unrest, or mechanical failure of third-party transport.
              </p>
            </Section>

            <Section title="8. Liability & Indemnity">
              <p>
                Travel, and particularly trekking and mountain travel, carries inherent risk. By booking with us,
                you confirm that you are fit to participate in your chosen itinerary. We are not liable for
                arrangements you book independently, outside of your confirmed Bhutan Aravia Peaks itinerary. To the
                extent permitted by law, you agree to hold Bhutan Aravia Peaks, its staff, guides, and Providers
                harmless from claims arising from your participation in the journey, except where caused by our own
                negligence.
              </p>
            </Section>

            <Section title="9. Privacy & Media">
              <p>
                We share the personal information necessary to arrange your visa, permits, and bookings with the
                relevant government offices and Providers — see our{" "}
                <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                for details. We may photograph or film during group journeys and may use resulting images for
                promotional purposes; let us know in advance if you would prefer not to be included.
              </p>
            </Section>

            <Section title="10. Governing Law & Changes to These Terms">
              <p>
                These Terms &amp; Conditions are governed by the laws of the Kingdom of Bhutan. We may update these
                terms from time to time; the version in effect at the time of your booking confirmation will apply
                to your journey.
              </p>
              <p>
                Questions about these terms can be sent to{" "}
                <a href="mailto:info@bhutanaraviapeaks.com" className="font-semibold text-primary underline underline-offset-2">
                  info@bhutanaraviapeaks.com
                </a>
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
