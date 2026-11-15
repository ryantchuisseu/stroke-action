type CommissionMember = { name: string; role: string; photo?: string };
type Commission = { name: string; members: readonly CommissionMember[] };

const initials = (name: string) =>
  name
    .replace(/^(Dr\.?|M\.?|Mr\.?|Mme\.?)\s+/i, "")
    .split(/\s+/)
    .filter((w) => /[A-ZÀ-Ý]/.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** Commissions : une colonne par commission, le chef en premier (mis en avant). */
export function CommissionsGrid({ commissions }: { commissions: readonly Commission[] }) {
  return (
    <div className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-2">
      {commissions.map((c) => (
        <article key={c.name} className="bg-paper p-6 sm:p-8">
          <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">
            <span className="mr-2 inline-block h-[0.6em] w-[0.6em] rounded-full bg-red align-middle" aria-hidden="true" />
            {c.name}
          </h3>
          <ul className="mt-6 space-y-5">
            {c.members.map((m, i) => (
              <li key={m.name} className="flex items-center gap-4">
                <div
                  className={`flex-none overflow-hidden rounded-full bg-paper-deep ${
                    i === 0 ? "h-20 w-20 ring-2 ring-blue ring-offset-2 ring-offset-paper" : "h-14 w-14"
                  }`}
                >
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-[50%_20%]" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-semibold text-blue-ink/45" aria-hidden="true">
                      {initials(m.name)}
                    </div>
                  )}
                </div>
                <div>
                  <p className={`text-[0.8rem] font-semibold uppercase tracking-[0.14em] ${i === 0 ? "text-red-ink" : "text-grey"}`}>
                    {m.role}
                  </p>
                  <p className="mt-0.5 text-[0.98rem] font-semibold leading-snug tracking-[-0.01em]">{m.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
