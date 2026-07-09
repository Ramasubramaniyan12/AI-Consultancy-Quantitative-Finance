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
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
    </div>
  )
}
