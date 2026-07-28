import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "project", label: "Project", num: "03" },
  { id: "experience", label: "Experience", num: "04" },
  { id: "certifications", label: "Certifications", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

const RESUME_URL = "https://raw.githubusercontent.com/sunildevra754-cell/portfolio-assets/main/Sunil_Devra_Resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/sunil-devra-6471b7355";

/**
 * Robustly open an external URL, even when the app is embedded in a
 * sandboxed preview iframe that blocks target="_blank" or popups.
 * Strategy:
 *  1. Try window.open in a new tab with noopener,noreferrer.
 *  2. If popup is blocked/null, try navigating the top-most frame.
 *  3. If cross-origin blocks that, navigate the current window.
 */
export function openExternal(url: string) {
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) {
      try { win.opener = null; } catch {}
      return;
    }
  } catch {}
  try {
    if (window.top && window.top !== window) {
      window.top.location.href = url;
      return;
    }
  } catch {}
  window.location.href = url;
}

type ExtLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export function ExtLink({ href, onClick, children, ...rest }: ExtLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        // Let modifier-click / middle-click use native behavior.
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e as any).button === 1) {
          onClick?.(e);
          return;
        }
        e.preventDefault();
        onClick?.(e);
        openExternal(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

const CERTS = [
  { title: "Oracle Certified Foundations Associate — Agentic AI", issuer: "Oracle", date: "2026", img: "/certs/oracle-foundations-agentic-ai.png" },
  { title: "Oracle Certified Professional — OCI 2025 Generative AI", issuer: "Oracle", date: "Oct 2025 · valid till Oct 2027", img: "/certs/oracle-professional-oci-genai.png" },
  { title: "Google AI Essentials Specialization", issuer: "Google · Coursera", date: "May 2026", img: "/certs/google-ai-essentials.png", verify: "https://coursera.org/verify/specialization/MYT68495ZW80" },
  { title: "Google Prompting Essentials Specialization", issuer: "Google · Coursera", date: "May 2026", img: "/certs/google-prompting-essentials.png", verify: "https://coursera.org/verify/specialization/WCWDI0H8XY7T" },
  { title: "MERN Stack Internship Completion", issuer: "Webstack Academy", date: "July 2026", img: "/certs/wsa-mern-internship.png" },
  { title: "Certificate of Excellence — National Cloud Innovation Challenge", issuer: "3SVK, Hyderabad", date: "April 2026", img: "/certs/3svk-cloud-innovation.png" },
];

const SKILL_GROUPS = [
  { label: "languages", items: ["C++", "Python", "JavaScript", "HTML", "CSS", "SQL"] },
  { label: "frameworks_&_tools", items: ["React", "React Native / Expo", "Firebase", "MongoDB", "REST APIs", "Bootstrap", "Git / GitHub", "VS Code"] },
  { label: "ai_ml", items: ["Google AI Studio", "Generative AI", "Prompt Engineering", "ML Fundamentals"] },
  { label: "rapid_prototyping", items: ["Lovable", "Base44"] },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.min(1, Math.max(0, scrolled)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return p;
}

function Nav({ active }: { active: string }) {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b hairline">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <a href="#top" className="mono text-sm font-semibold tracking-tight">
          <span className="text-gold">$</span> sunil.devra
        </a>
        <ul className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`mono text-xs uppercase tracking-widest transition-colors gold-underline ${
                  active === n.id ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="opacity-60">{n.num}.</span> {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-xs px-3 py-2 border border-gold text-gold hover:bg-gold hover:text-accent-foreground transition-colors"
        >
          Resume ↗
        </a>
      </div>
    </nav>
  );
}

function ScrollRail({ progress }: { progress: number }) {
  return (
    <div className="fixed left-4 top-24 bottom-8 z-30 hidden lg:flex flex-col items-center pointer-events-none">
      <div className="relative flex-1 w-px bg-hairline overflow-hidden" style={{ backgroundColor: "var(--hairline)" }}>
        <div
          className="absolute top-0 left-0 w-px bg-gold"
          style={{ height: `${progress * 100}%`, boxShadow: "0 0 8px var(--gold)" }}
        />
        {[0.15, 0.32, 0.5, 0.66, 0.82, 0.95].map((y, i) => (
          <div
            key={i}
            className="absolute -left-1 w-2 h-2 rounded-full border"
            style={{
              top: `${y * 100}%`,
              borderColor: progress >= y ? "var(--gold)" : "var(--hairline)",
              background: progress >= y ? "var(--gold)" : "var(--background)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-3">
      <span className="comment">// {num} —</span>
      <h2 className="mono text-2xl md:text-3xl font-semibold text-foreground">{title}</h2>
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--hairline)" }} />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center px-6">
      <div className="mx-auto max-w-6xl w-full py-24">
        <p className="comment reveal">// hello_world.init()</p>
        <h1 className="reveal mt-4 mono text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
          Sunil <span className="text-gold">Devra</span>
        </h1>
        <p className="reveal mt-4 mono text-lg md:text-xl text-muted-foreground">
          AI/ML Engineer <span className="text-gold">&</span> Full-Stack Developer
        </p>
        <p className="reveal mt-8 max-w-2xl text-base md:text-lg text-foreground/85 leading-relaxed">
          Building AI-powered solutions for real Indian problems — from{" "}
          <span className="text-gold">agriculture</span> to <span className="text-gold">elderly care</span>.
        </p>

        <div className="reveal mt-10 flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-sm px-5 py-3 bg-gold text-accent-foreground hover:bg-transparent hover:text-gold border border-gold transition-colors"
          >
            View Resume ↗
          </a>
          <a
            href="#project"
            className="mono text-sm px-5 py-3 border border-hairline text-foreground hover:border-gold hover:text-gold transition-colors"
            style={{ borderColor: "var(--hairline)" }}
          >
            View Live Project →
          </a>
        </div>

        <div className="reveal mt-10 flex items-center gap-6 mono text-xs text-muted-foreground">
          <a href="https://github.com/sunildevra754-cell" target="_blank" rel="noopener noreferrer" className="gold-underline hover:text-foreground">GitHub</a>
          <ExtLink href={LINKEDIN_URL} className="gold-underline hover:text-foreground">LinkedIn</ExtLink>
          <a href="mailto:sunildevra26@gmail.com" className="gold-underline hover:text-foreground">Email</a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 comment animate-pulse">scroll ↓</div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24 border-t hairline" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="01" title="About" />
        <div className="grid md:grid-cols-3 gap-8 reveal">
          <div className="md:col-span-2 space-y-4 text-foreground/85 leading-relaxed">
            <p>
              I'm a Full-Stack Developer and AI/ML engineer focused on shipping products that solve tangible problems for
              Indian users — not chasing benchmarks, but building things farmers, families, and small businesses can actually
              use tomorrow.
            </p>
            <p>
              My work sits at the intersection of competitive programming discipline (C++, Python), modern web/mobile
              development, and generative AI. I care about clean architecture, fast iteration, and interfaces that feel
              obvious.
            </p>
          </div>
          <ul className="space-y-4 mono text-sm">
            <li><span className="comment block">education</span><span className="text-foreground">B.Tech AI & ML</span><br /><span className="text-muted-foreground">NIAT Jaipur</span></li>
            <li><span className="comment block">coursework</span><span className="text-foreground">B.Tech CSE</span><br /><span className="text-muted-foreground">Vivekananda Global University, Jaipur</span></li>
            <li><span className="comment block">based_in</span><span className="text-foreground">Jaipur, Rajasthan · India</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-6 py-24 border-t hairline" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="02" title="Skills" />
        <div className="space-y-8">
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className="reveal grid md:grid-cols-[220px_1fr] gap-4 md:gap-8 items-start">
              <div className="comment pt-1">// {g.label}</div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="mono text-xs px-3 py-1.5 border transition-colors hover:border-gold hover:text-gold"
                    style={{ borderColor: "var(--hairline)", color: "var(--foreground)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Project() {
  const [loaded, setLoaded] = useState(false);
  const features = [
    "Kissan Feed", "Mandi Prices", "Crop Doctor", "Spray Advisor",
    "Fertilizer Budget", "Profit Predictor", "Action Plan", "Village Intel",
    "Live Location", "Drone", "IoT Dashboard", "Schemes", "AI Assistant",
  ];
  return (
    <section id="project" className="px-6 py-24 border-t hairline" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="03" title="Featured Project" />
        <div className="reveal">
          <p className="comment mb-2">// flagship</p>
          <h3 className="mono text-3xl md:text-4xl font-bold">
            Smart Farmer <span className="text-gold">One Touch</span>
          </h3>
          <p className="mt-2 mono text-sm text-muted-foreground">AI-powered agriculture platform</p>
          <p className="mt-6 max-w-3xl text-foreground/85 leading-relaxed">
            An AI-powered application solving major problems Indian farmers face — bringing technology that exists globally
            into an Indian-first product: crop disease detection, mandi price tracking, weather updates, fertilizer
            budgeting, profit prediction, and government scheme info, all in one app.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {features.map((f) => (
              <span key={f} className="mono text-xs px-2.5 py-1 border" style={{ borderColor: "var(--hairline)", color: "var(--sage)" }}>
                {f}
              </span>
            ))}
          </div>

          <div className="mt-6 comment">
            // built_with: Firebase · Google AI Studio · HTML/CSS/JS · REST APIs · Base44
          </div>
        </div>

        <div className="reveal mt-10 border" style={{ borderColor: "var(--hairline)" }}>
          <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "var(--hairline)" }}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3a3a3a" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3a3a3a" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--gold)" }} />
            </div>
            <span className="mono text-xs text-muted-foreground truncate">smart-farmer-connect.base44.app</span>
            <a
              href="https://smart-farmer-connect.base44.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs text-gold gold-underline"
            >
              Open ↗
            </a>
          </div>
          <div className="relative w-full" style={{ aspectRatio: "16/10", background: "var(--surface)" }}>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center comment animate-pulse">
                loading live preview...
              </div>
            )}
            <iframe
              src="https://smart-farmer-connect.base44.app"
              title="Smart Farmer One Touch live preview"
              className="absolute inset-0 w-full h-full"
              onLoad={() => setLoaded(true)}
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <a
            href="https://smart-farmer-connect.base44.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-sm px-5 py-3 border border-gold text-gold hover:bg-gold hover:text-accent-foreground transition-colors"
          >
            Open Live App ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      role: "Full-Stack AI Developer",
      org: "Personal Projects & Hackathons",
      period: "2025 — Present",
      points: [
        "Built and deployed Smart Farmer One Touch, live at smart-farmer-connect.base44.app",
        "Solved 100+ competitive programming problems in C++ and Python",
        "Participated in the National Cloud Innovation Challenge by 3SVK, Hyderabad (Phase 2: Idea Submission)",
      ],
    },
    {
      role: "MERN Stack Intern",
      org: "Webstack Academy",
      period: "June 2026 — July 2026",
      points: [
        "Completed a 4-week online internship in full-stack web development (MERN stack)",
        'Built "Food Genie" — an AI food ordering app — as the capstone project',
      ],
    },
  ];
  return (
    <section id="experience" className="px-6 py-24 border-t hairline" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="04" title="Experience" />
        <div className="space-y-12">
          {items.map((e) => (
            <article key={e.role} className="reveal grid md:grid-cols-[220px_1fr] gap-4 md:gap-8">
              <div className="mono text-xs text-muted-foreground pt-1">{e.period}</div>
              <div>
                <h3 className="mono text-lg font-semibold">{e.role}</h3>
                <p className="mono text-sm text-gold">{e.org}</p>
                <ul className="mt-4 space-y-2 text-foreground/85 leading-relaxed">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="text-gold mono select-none">→</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="certifications" className="px-6 py-24 border-t hairline" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="05" title="Certifications" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((c, i) => (
            <article
              key={c.title}
              className="reveal group border transition-colors hover:border-gold flex flex-col"
              style={{ borderColor: "var(--hairline)", background: "var(--surface)" }}
            >
              <button
                type="button"
                onClick={() => onOpen(i)}
                className="relative aspect-[4/3] overflow-hidden bg-muted focus-visible:outline-gold"
                style={{ background: "var(--muted)" }}
                aria-label={`View ${c.title}`}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    (el.nextElementSibling as HTMLElement).style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center comment text-center px-4">
                  {c.title}
                </div>
              </button>
              <div className="p-4 border-t" style={{ borderColor: "var(--hairline)" }}>
                <h3 className="mono text-sm font-semibold leading-snug">{c.title}</h3>
                <p className="mt-1 mono text-xs text-muted-foreground">{c.issuer} · {c.date}</p>
                {c.verify && (
                  <a
                    href={c.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 mono text-xs text-gold gold-underline"
                  >
                    Verify ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-24 border-t hairline" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="06" title="Contact" />
        <div className="reveal">
          <h3 className="mono text-3xl md:text-5xl font-bold leading-tight">
            Let's build something <span className="text-gold">together</span>.
          </h3>
          <p className="mt-4 max-w-2xl text-foreground/85">
            Open to paid internships and roles where I can ship AI-powered products end-to-end. If you're hiring, let's talk.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-6 mono text-sm">
            <a href="mailto:sunildevra26@gmail.com" className="group border p-5 hover:border-gold transition-colors" style={{ borderColor: "var(--hairline)" }}>
              <div className="comment">// email</div>
              <div className="mt-1 group-hover:text-gold transition-colors">sunildevra26@gmail.com</div>
            </a>
            <a href="tel:+919521449675" className="group border p-5 hover:border-gold transition-colors" style={{ borderColor: "var(--hairline)" }}>
              <div className="comment">// phone</div>
              <div className="mt-1 group-hover:text-gold transition-colors">+91 95214 49675</div>
            </a>
            <a href="https://github.com/sunildevra754-cell" target="_blank" rel="noopener noreferrer" className="group border p-5 hover:border-gold transition-colors" style={{ borderColor: "var(--hairline)" }}>
              <div className="comment">// github</div>
              <div className="mt-1 group-hover:text-gold transition-colors">sunildevra754-cell</div>
            </a>
            <ExtLink href={LINKEDIN_URL} className="group border p-5 hover:border-gold transition-colors" style={{ borderColor: "var(--hairline)" }}>
              <div className="comment">// linkedin</div>
              <div className="mt-1 group-hover:text-gold transition-colors">sunil-devra-6471b7355</div>
            </ExtLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: "var(--hairline)" }}>
            <div className="comment">// jaipur, rajasthan · india</div>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm px-5 py-3 bg-gold text-accent-foreground hover:bg-transparent hover:text-gold border border-gold transition-colors"
            >
              Download Resume ↗
            </a>
          </div>

          <p className="mt-16 comment text-center">© 2026 Sunil Devra — hand-built with care.</p>
        </div>
      </div>
    </section>
  );
}

function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = "cert-lightbox-title";
  const descId = "cert-lightbox-desc";

  useEffect(() => {
    if (index === null) return;
    const total = CERTS.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((index + 1) % total);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((index - 1 + total) % total);
      } else if (e.key === "Home") {
        e.preventDefault();
        onNavigate(0);
      } else if (e.key === "End") {
        e.preventDefault();
        onNavigate(total - 1);
      } else if (e.key === "Tab") {
        // simple focus trap within the dialog
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNavigate]);

  if (index === null) return null;
  const total = CERTS.length;
  const c = CERTS[index];
  const prev = () => onNavigate((index - 1 + total) % total);
  const next = () => onNavigate((index + 1) % total);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div
        ref={dialogRef}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 gap-3">
          <div className="min-w-0">
            <p id={titleId} className="mono text-sm text-gold truncate">{c.title}</p>
            <p id={descId} className="mono text-xs text-muted-foreground truncate">
              {c.issuer} · {c.date} · {index + 1} / {total}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={prev}
              className="mono text-sm px-3 py-1.5 border border-hairline text-foreground hover:border-gold hover:text-gold transition-colors"
              style={{ borderColor: "var(--hairline)" }}
              aria-label="Previous certificate"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={next}
              className="mono text-sm px-3 py-1.5 border border-hairline text-foreground hover:border-gold hover:text-gold transition-colors"
              style={{ borderColor: "var(--hairline)" }}
              aria-label="Next certificate"
            >
              Next →
            </button>
            {c.verify && (
              <a
                href={c.verify}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-sm px-3 py-1.5 border border-gold text-gold hover:bg-gold hover:text-accent-foreground transition-colors"
                aria-label={`Verify ${c.title} (opens in new tab)`}
              >
                Verify ↗
              </a>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="mono text-sm px-3 py-1.5 border border-gold text-gold hover:bg-gold hover:text-accent-foreground transition-colors"
              aria-label="Close certificate viewer"
            >
              Close ✕
            </button>
          </div>
        </div>
        <img
          src={c.img}
          alt={`${c.title} — issued by ${c.issuer}, ${c.date}`}
          className="w-full max-h-[80vh] object-contain border"
          style={{ borderColor: "var(--hairline)", background: "var(--surface)" }}
        />
        <p className="sr-only" aria-live="polite">
          Showing certificate {index + 1} of {total}: {c.title}
        </p>
      </div>
    </div>
  );
}

function Index() {
  const active = useActiveSection();
  const progress = useScrollProgress();
  const [lightbox, setLightbox] = useState<number | null>(null);
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav active={active} />
      <ScrollRail progress={progress} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Project />
        <Experience />
        <Certifications onOpen={(i) => setLightbox(i)} />
        <Contact />
      </main>
      <Lightbox index={lightbox} onClose={() => setLightbox(null)} onNavigate={(i) => setLightbox(i)} />
    </div>
  );
}
