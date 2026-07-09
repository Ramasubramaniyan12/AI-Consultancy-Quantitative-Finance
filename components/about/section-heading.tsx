export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <div className={className}>
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent mb-3">
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">{title}</h2>
    </div>
  )
}
