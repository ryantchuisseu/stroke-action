"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const field = "w-full border border-rule bg-paper px-3 py-2.5 text-[0.95rem] outline-none focus:border-blue";

type ContactFormDict = {
  title: string;
  formName: string;
  formPhone: string;
  formEmail: string;
  formSubject: string;
  formMessage: string;
  formChannel: string;
  channels: readonly string[];
  formAttachment: string;
  submit: string;
  sending: string;
  note: string;
  successTitle: string;
  successText: string;
  errorText: string;
};

const initialState: ContactState = { status: "idle" };

function SubmitButton({ label, sendingLabel }: { label: string; sendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 justify-self-start bg-blue-ink px-[1.1rem] py-[0.7rem] text-[0.88rem] font-semibold text-paper transition-colors hover:bg-red hover:text-white active:scale-[0.97] disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? sendingLabel : label}
    </button>
  );
}

export function ContactForm({ c }: { c: ContactFormDict }) {
  const [state, formAction] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="grid gap-2 self-start border border-rule bg-paper-deep p-6">
        <p className="text-[1.05rem] font-semibold text-blue-ink">{c.successTitle}</p>
        <p className="text-[0.92rem] text-ink-soft">{c.successText}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="grid gap-4" aria-label={c.title}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[0.85rem] font-medium">
          {c.formName}
          <input className={field} type="text" name="name" required />
        </label>
        <label className="grid gap-1.5 text-[0.85rem] font-medium">
          {c.formPhone}
          <input className={field} type="tel" name="phone" />
        </label>
      </div>
      <label className="grid gap-1.5 text-[0.85rem] font-medium">
        {c.formEmail}
        <input className={field} type="email" name="email" required />
      </label>
      <label className="grid gap-1.5 text-[0.85rem] font-medium">
        {c.formSubject}
        <input className={field} type="text" name="subject" required />
      </label>
      <label className="grid gap-1.5 text-[0.85rem] font-medium">
        {c.formMessage}
        <textarea className={field} name="message" rows={5} required />
      </label>
      <fieldset className="grid gap-2 text-[0.85rem] font-medium">
        <legend className="mb-1">{c.formChannel}</legend>
        <div className="flex flex-wrap gap-4 font-normal text-ink-soft">
          {c.channels.map((o) => (
            <label key={o} className="flex items-center gap-2">
              <input type="radio" name="channel" value={o} /> {o}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-1.5 text-[0.85rem] font-medium">
        {c.formAttachment}
        <input className={field} type="file" name="attachment" />
      </label>
      <SubmitButton label={c.submit} sendingLabel={c.sending} />
      {state.status === "error" && <p className="text-[0.85rem] text-red-ink">{c.errorText}</p>}
      <p className="text-[0.8rem] text-grey">{c.note}</p>
    </form>
  );
}
