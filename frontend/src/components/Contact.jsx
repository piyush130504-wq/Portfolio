import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { ArrowUpRight, Check, CheckCircle2, Copy, Github, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { PROFILE } from "@/data/content";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — the email is piyush130504@gmail.com");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs = {};
      parsed.error.issues.forEach((i) => {
        if (!errs[i.path[0]]) errs[i.path[0]] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
      await axios.post(`${backendUrl}/api/contact`, parsed.data);
      setStatus("success");
      toast.success("Message sent", { description: "Thanks for reaching out — I'll get back to you soon." });
    } catch {
      setStatus("error");
      toast.error("Couldn't send the message", { description: "Please try again in a moment." });
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setStatus("idle");
  };

  const inputCls = (err) =>
    `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-blue-500/70 ${
      err ? "border-red-500/60" : "border-white/10"
    }`;

  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-16 border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 right-[-10%] h-[380px] w-[480px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-4">Contact</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.1]">
                Have an interesting product to build?
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-base text-zinc-400 leading-relaxed max-w-md">
                I'm open to select opportunities and interesting collaborations. The fastest way to reach me is email
                — or just use the form.
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              <Reveal delay={0.2}>
                <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-surface p-4" data-testid="contact-email-row">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-blue-400">
                    <Mail size={16} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Email</span>
                    <a href={`mailto:${PROFILE.email}`} data-testid="contact-email-link" className="block text-sm text-zinc-200 hover:text-blue-400 transition-colors truncate">
                      {PROFILE.email}
                    </a>
                  </span>
                  <button
                    onClick={copyEmail}
                    data-testid="contact-copy-email"
                    aria-label="Copy email"
                    className="p-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-full transition-colors"
                  >
                    {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                  </button>
                </div>
              </Reveal>
              {[
                { href: PROFILE.github, icon: Github, label: "GitHub", id: "github" },
                { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn", id: "linkedin" },
              ].map(({ href, icon: Icon, label, id }, i) => (
                <Reveal key={id} delay={0.24 + i * 0.06}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`contact-link-${id}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/8 bg-surface p-4 hover:border-blue-500/30 transition-colors"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-blue-400">
                      <Icon size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
                      <span className="block text-sm text-zinc-200 group-hover:text-blue-400 transition-colors truncate">
                        {href.replace("https://", "")}
                      </span>
                    </span>
                    <ArrowUpRight size={15} className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-surface shadow-card p-6 md:p-8" data-testid="contact-form-card">
              {status === "success" ? (
                <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center" data-testid="contact-success">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                    <CheckCircle2 size={26} />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-zinc-50">Message received</h3>
                  <p className="mt-2 text-sm text-zinc-400 max-w-xs">
                    Thanks for reaching out — your message is saved and I'll get back to you soon.
                  </p>
                  <button
                    onClick={reset}
                    data-testid="contact-send-another"
                    className="mt-8 rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-300 hover:border-blue-500/50 hover:text-zinc-100 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="c-name" className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                    <input id="c-name" data-testid="contact-input-name" value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls(errors.name)} />
                    {errors.name && <p className="mt-1.5 text-xs text-red-400" data-testid="contact-error-name">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                    <input id="c-email" data-testid="contact-input-email" type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" className={inputCls(errors.email)} />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400" data-testid="contact-error-email">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-message" className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                    <textarea id="c-message" data-testid="contact-input-message" rows={5} value={form.message} onChange={set("message")} placeholder="Tell me about the product you want to build…" className={`${inputCls(errors.message)} resize-none`} />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400" data-testid="contact-error-message">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-testid="contact-submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-medium text-white hover:bg-blue-500 shadow-glow transition-colors disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send size={15} />
                      </>
                    )}
                  </button>
                  <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    Stored securely · No spam, ever
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
