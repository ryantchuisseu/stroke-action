type CommissionMember = { name: string; job: string; role: string; photo?: string };
type Commission = { name: string; members: readonly CommissionMember[] };

const initials = (name: string) =>
  name
    .replace(/^(Dr\.?|Mr\.?|M\.?|Mme\.?)\s+/i, "")
    .split(/\s+/)
    .filter((w) => /[A-ZÀ-Ý]/.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** Commissions côte à côte, séparées par un filet vertical : photo carrée à gauche, nom + rôle à droite. */
export function CommissionsGrid({
  commissions,
  roleLabels,
}: {
  commissions: readonly Commission[];
  roleLabels: Record<string, string>;
}) {
  return (
    <div className="mt-10 grid gap-y-12 md:grid-cols-2">
      {commissions.map((c, i) => (
        <div key={c.name} className={i > 0 ? "md:border-l md:border-rule md:pl-[clamp(1.5rem,4vw,3.5rem)]" : "md:pr-[clamp(1.5rem,4vw,3.5rem)]"}>
          <h3 className="text-[clamp(1.1rem,2vw,1.35rem)] text-blue-ink">{c.name}</h3>
          <ul className="mt-6 space-y-6">
            {c.members.map((m) => (
              <li key={m.name} className="flex items-center gap-5">
                <div className="aspect-square w-[clamp(5rem,12vw,7rem)] shrink-0 overflow-hidden bg-paper-deep">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-[50%_20%]" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[1.4rem] font-semibold tracking-[0.04em] text-blue-ink/45" aria-hidden="true">
                      {initials(m.name)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[1rem] font-semibold leading-snug tracking-[-0.01em] text-balance">{m.name}</p>
                  <p className={`mt-1 text-[0.85rem] ${m.role === "chair" ? "font-bold text-red-ink" : "text-ink-soft"}`}>
                    ({roleLabels[m.role]})
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
