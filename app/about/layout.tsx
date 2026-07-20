import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Bhutan Aravia Peaks",
  description:
    "Meet Bhutan Aravia Peaks — a locally owned, licensed Bhutanese tour operator crafting personalized cultural journeys, treks, and festival experiences.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
