import { useEffect, useState } from "react";
import { profile, about, projects, experience, skills } from "./data.js";

/* ---------- Ikon ---------- */
const Svg = ({ children, size = 20, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const GithubIcon = (p) => (
  <Svg {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Svg>
);
const LinkedinIcon = (p) => (
  <Svg {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </Svg>
);
const ExternalIcon = (p) => (
  <Svg {...p}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
  </Svg>
);
const DownloadIcon = (p) => (
  <Svg {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </Svg>
);
const MailIcon = (p) => (
  <Svg {...p}>
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6" />
  </Svg>
);
const MoonIcon = (p) => (
  <Svg {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Svg>
);
const SunIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

/* ---------- Hooks ---------- */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = document.documentElement.dataset.theme;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

const NAV = [
  { id: "tentang", label: "Tentang" },
  { id: "proyek", label: "Proyek" },
  { id: "keahlian", label: "Keahlian" },
  { id: "kontak", label: "Kontak" },
];

// Menandai menu yang sedang dibaca
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const ids = NAV.map((n) => n.id);

/* ---------- Halaman ---------- */
export default function App() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(ids);

  return (
    <div className="layout">
      {/* Panel profil (tetap di kiri saat scroll) */}
      <aside className="side">
        <div className="side-top">
          <div className="monogram" aria-hidden="true">
            {initials(profile.name)}
          </div>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="short">{profile.short}</p>

          <nav className="menu" aria-label="Navigasi utama">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={active === n.id ? "is-active" : undefined}
                aria-current={active === n.id ? "true" : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="side-bottom">
          <a className="btn btn-solid" href={profile.cv}>
            <DownloadIcon size={17} /> Unduh CV
          </a>
          <div className="side-tools">
            <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email">
              <MailIcon size={18} />
            </a>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Pakai tema terang" : "Pakai tema gelap"}
            >
              {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Konten */}
      <main className="content">
        <section id="tentang" className="block">
          <h2>Tentang</h2>
          <div className="prose">
            {about.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <p className="where">{profile.location}</p>
        </section>

        <section id="proyek" className="block">
          <h2>Proyek</h2>
          <ul className="rows">
            {projects.map((p) => (
              <li key={p.title} className="project">
                <div className="project-body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <ul className="tags">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-links">
                  <a href={p.demo} target="_blank" rel="noreferrer">
                    <ExternalIcon size={16} /> Demo
                  </a>
                  <a href={p.github} target="_blank" rel="noreferrer">
                    <GithubIcon size={16} /> Kode
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="keahlian" className="block">
          <h2>Keahlian</h2>
          <ul className="rows">
            {skills.map((g) => (
              <li key={g.group} className="entry">
                <span className="entry-period">{g.group}</span>
                <ul className="chips">
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section id="kontak" className="block">
          <div className="cta">
            <h2>Punya proyek untuk dikerjakan?</h2>
            <p>Ceritakan kebutuhanmu lewat email. Saya biasanya membalas dalam satu hari kerja.</p>
            <a className="btn btn-light" href={`mailto:${profile.email}`}>
              <MailIcon size={17} /> {profile.email}
            </a>
          </div>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </main>
    </div>
  );
}
