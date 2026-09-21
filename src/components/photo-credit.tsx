/** Image avec crédit photo : au survol, un bandeau affiche le lien source
 *  (photo tierce, cf. suivi des droits d'auteur) ; cliquer ouvre la source. */
export function CreditedPhoto({
  src,
  alt,
  href,
  className = "",
  imgClassName = "h-full w-full object-cover",
}: {
  src: string;
  alt: string;
  href: string;
  className?: string;
  imgClassName?: string;
}) {
  const label = href.replace(/^https?:\/\//, "");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`group relative block overflow-hidden ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={imgClassName} />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 px-3 py-1.5 text-[0.7rem] text-paper opacity-0 transition-[transform,opacity] duration-200 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100">
        <span className="block truncate">{label}</span>
      </span>
    </a>
  );
}
