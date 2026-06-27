import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { useState, type FormEvent } from "react";
import { sendContactInquiry } from "@/lib/contact/sendContactInquiry";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await sendContactInquiry({
        data: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        },
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container size="narrow">
          <Reveal>
            <h1 className="display text-4xl md:text-6xl leading-[1.02]">Contact</h1>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 space-y-6 max-w-3xl">
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                Reach out for advisory inquiries, speaking requests, press, partnerships, research
                conversations, or serious correspondence.
              </p>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                A useful note includes who you are, what question or request you are bringing, and
                whether there is a decision timeline attached.
              </p>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                Every message is reviewed. Gray Keep responds where there is a clear fit.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <form
              className="mt-12 rounded-xl border border-border bg-card/50 p-8 md:p-10"
              onSubmit={handleSubmit}
            >
              <div className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-3">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-3">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="How can we help?"
                    required
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold resize-y"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send inquiry"}
              </button>
              {status === "success" ? (
                <p className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                  Thank you. Your message has been received. Gray Keep will respond where there is
                  a clear fit.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                  Something went wrong. Please try again or email{" "}
                  <a
                    href="mailto:contact@graykeep.ai"
                    className="text-foreground underline underline-offset-4"
                  >
                    contact@graykeep.ai
                  </a>{" "}
                  directly.
                </p>
              ) : null}
            </form>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
