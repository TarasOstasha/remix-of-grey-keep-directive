import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <div className="container-keep max-w-4xl">
          <Reveal>
            <h1 className="display text-4xl md:text-6xl leading-[1.02]">Contact</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-base md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Reach out for advisory inquiries, press, or general correspondence. We read
              everything and respond to what merits a reply.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <form
              className="mt-12 rounded-xl border border-border bg-card/50 p-8 md:p-10"
              onSubmit={(event) => event.preventDefault()}
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
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold resize-y"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Send
              </button>
            </form>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
