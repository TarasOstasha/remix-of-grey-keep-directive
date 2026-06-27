import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const contactInquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("A valid email is required"),
  message: z.string().trim().min(1, "Message is required"),
});

export const sendContactInquiry = createServerFn({ method: "POST" })
  .inputValidator(contactInquirySchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const to = process.env.CONTACT_TO_EMAIL ?? "contact@graykeep.ai";
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Gray Keep <notifications@graykeep.ai>";

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Contact inquiry from ${data.name}`,
      text: [`Name: ${data.name}`, `Email: ${data.email}`, "", data.message].join("\n"),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { ok: true as const };
  });
