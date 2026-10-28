type Member = { name: string; job: string; photo?: string };

const initials = (name: string) =>
  name
    .replace(/^(Dr\.?|Mr\.?|Mme\.?)\s+/i, "")
    .split(/\s+/)
    .filter((w) => w[0] === w[0]?.toUpperCase() && /[A-ZÀ-Ý]/.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** Liste de tous les membres : photo (ou initiales en attendant), nom, profession. */
export function MembersGrid({ members }: { members: readonly Member[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {members.map((m) => (
        <li key={m.name} className="text-center">
          <div className="mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-full bg-paper-deep">
            {m.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-[50%_20%]" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[0.04em] text-blue-ink/45" aria-hidden="true">
                {initials(m.name)}
              </div>
            )}
          </div>
          <h3 className="mt-4 text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-balance">{m.name}</h3>
          <p className="mt-1 text-[0.85rem] leading-snug text-ink-soft text-balance">{m.job}</p>
        </li>
      ))}
    </ul>
  );
}
