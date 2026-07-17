import type React from "react"

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
}) {
  const isCenter = align === "center"
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}>
      {eyebrow ? (
        <div className={`mb-5 flex ${isCenter ? "justify-center" : "justify-start"}`}>
          {typeof eyebrow === "string" ? <span className="eyebrow">{eyebrow}</span> : eyebrow}
        </div>
      ) : null}
      <h2 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-lg leading-relaxed text-muted-foreground ${isCenter ? "mx-auto" : ""}`}>{description}</p>
      ) : null}
    </div>
  )
}
