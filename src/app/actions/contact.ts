"use server";

import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/nav";

export type ContactState = {
  status: "idle" | "success" | "error";
};

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 Mo — cohérent avec bodySizeLimit (next.config.ts)

export async function sendContactMessage(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const channel = String(formData.get("channel") ?? "").trim();
  const attachment = formData.get("attachment");

  if (!name || !email || !subject || !message) {
    return { status: "error" };
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  if (attachment instanceof File && attachment.size > 0) {
    if (attachment.size > MAX_ATTACHMENT_BYTES) {
      return { status: "error" };
    }
    attachments.push({
      filename: attachment.name,
      content: Buffer.from(await attachment.arrayBuffer()),
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Stroke Action — Site" <${process.env.SMTP_USER}>`,
      to: CONTACT.email,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        phone ? `Téléphone : ${phone}` : null,
        channel ? `Canal préféré : ${channel}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      attachments,
    });

    return { status: "success" };
  } catch (err) {
    console.error("contact form: send failed", err);
    return { status: "error" };
  }
}
