import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Profile Data ────────────────────────────────────────────────────────────

const PROFILE = {
  name: "Krity Sharma",
  tagline: "Full-Stack Developer",
  bio: "Crafting elegant digital experiences with clean code and creative vision. I build full-stack web applications that are as beautiful as they are functional.",
  email: "krity8780sharma@gmail.com",
  phone: "+91-9610040623",
  github: "https://github.com/Krity2004",
  linkedin: "https://www.linkedin.com/in/krity-sharma-996832297",
  // resume.pdf must be in the public/ folder
  resumeUrl: import.meta.env.BASE_URL + "resume.pdf",
};

const SKILLS = {
  "Languages": ["C++", "JavaScript", "C", "PHP"],
  "Frameworks": ["React.js", "Node.js", "Express.js", "Bootstrap", "Tailwind CSS", "REST APIs"],
  "Databases & Tools": ["MongoDB", "MySQL", "Git", "GitHub"],
  "Soft Skills": ["Problem Solving", "Teamwork", "Time Management", "Adaptability"],
};

const PROJECTS = [
  {
    title: "Applicant Tracking System",
    subtitle: "MERN-Stack Job Portal",
    date: "Jan 2026",
    description: "A comprehensive ATS handling end-to-end hiring workflows — job creation, multi-stage approval, candidate applications, and recruiter screening.",
    highlights: [
      "JWT-based authentication with 4 distinct user roles and protected route middleware",
      "15+ REST API endpoints for job posting CRUD, approval workflows, and candidate shortlisting",
      "Role-specific dashboards with Redux state management and responsive Tailwind CSS UI",
    ],
    tags: ["React", "Redux", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    github: "https://github.com/Krity2004/application-tracking-system",
    color: "#b8860b",
  },
  {
    title: "Real-Time Chat App",
    subtitle: "Instant Messaging Platform",
    date: "Feb 2025",
    description: "A full-stack real-time messaging application supporting instant communication with rich features and responsive design.",
    highlights: [
      "WebSocket-based messaging with Socket.io for one-on-one and group chats",
      "Online status indicators, typing notifications, and message alerts",
      "Secure authentication with bcrypt hashing and avatar uploads",
    ],
    tags: ["React", "Socket.io", "Node.js", "MongoDB", "JWT", "Bcrypt"],
    github: "https://github.com/Krity2004/Real-Time-Chat-Application",
    color: "#c77dba",
  },
];

const CERTIFICATES = [
  { name: "Hardware & OS Essentials by Coursera", issuer: "IBM (Coursera)", date: "Oct 2025", link: "https://www.linkedin.com/posts/krity-sharma_hardware-and-operating-system-essentials-activity-7398https://www.credly.com/badges/a762f4f9-6360-4822-b280-ecc8fa7b35dc/linked_in?t=t68p8x763872129753088-b-L4?utm_source=share&&utm_medium=member_desktop&&rcm=ACoAAEfZFgIBI1feKdhrhYJ-l0iIh1eWq1dHSgk" },
  { name: "Computational Theory & Finite Automata", issuer: "Infosys Springboard", date: "Aug 2025", link: "https://www.linkedin.com/posts/krity-sharma_infosys-springboard-computationaltheory-activity-7383489723249569792-_MjC?utm_source=share&&utm_medium=member_desktop&&rcm=ACoAAEfZFgIBI1feKdhrhYJ-l0iIh1eWq1dHSgk" },
  { name: "SQL to MongoDB Document Model", issuer: "MongoDB University", date: "Jun 2025", link: "https://www.credly.com/badges/ccf527d0-20af-4867-87e2-8ad87d78b169/linked_in_profile" },
  { name: "Responsive Web Design by FreeCodeCamp", issuer: "FreeCodeCamp", date: "Dec 2023", link: "https://www.freecodecamp.org/certification/krity10042004/responsive-web-design" },
];

const ACHIEVEMENTS = [
  { text: 'Gold Level in "Go for Gold" Contest by Accenture (iAspire)', date: "Jan 2026" },
  { text: "Solved 150+ DSA problems across LeetCode", date: "Dec 2025" },
  { text: "Built & deployed full-stack projects with REST API integration", date: "Nov 2025" },
];

const EDUCATION = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "Lovely Professional University",
    location: "Punjab, India",
    period: "2023 — Present",
    grade: "CGPA: 6.9",
  },
  {
    degree: "Intermediate (XII)",
    school: "Kendriya Vidyalaya No. 2",
    location: "Rajasthan, India",
    period: "2021 — 2022",
    grade: "80%",
  },
  {
    degree: "Matriculation (X)",
    school: "Kendriya Vidyalaya No. 2",
    location: "Rajasthan, India",
    period: "2019 — 2020",
    grade: "87%",
  },
];

// ─── Theme ───────────────────────────────────────────────────────────────────

const THEMES = {
  dark: {
    bg: "#0f0d0e",
    bgSoft: "#171415",
    bgCard: "#1c1819",
    text: "#f5ede6",
    textSoft: "#a39890",
    accent: "#d4a574",
    accentSoft: "rgba(212,165,116,0.12)",
    accentHover: "#e8c49a",
    border: "#2d2628",
    rose: "#c77dba",
    roseSoft: "rgba(199,125,186,0.1)",
    gold: "#d4a574",
  },
  light: {
    bg: "#faf6f2",
    bgSoft: "#f3ede6",
    bgCard: "#ffffff",
    text: "#2c1810",
    textSoft: "#7a6860",
    accent: "#9e6b3a",
    accentSoft: "rgba(158,107,58,0.1)",
    accentHover: "#b8860b",
    border: "#e4dbd2",
    rose: "#a0527a",
    roseSoft: "rgba(160,82,122,0.08)",
    gold: "#9e6b3a",
  },
};

// ─── NAV SECTIONS ───────────────────────────────────────────────────────────

const SECTIONS = ["Home", "About", "Projects", "Contact"];

// ─── Icons ───────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.752 15.002A9.718 9.718 0 0112.478 3.004a9.72 9.72 0 00-3.478.67A10 10 0 1021.752 15.002z" />
  </svg>
);
const GithubIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="3" /><path d="M22 7l-10 7L2 7" />
  </svg>
);
const ExternalIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 7h16M4 12h12M4 17h8" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

// ─── Animated Typing ─────────────────────────────────────────────────────────

function TypeWriter({ words, theme }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (sub === words[idx].length + 1 && !del) {
      const t = setTimeout(() => setDel(true), 2000);
      return () => clearTimeout(t);
    }
    if (sub === 0 && del) {
      setDel(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setSub((s) => s + (del ? -1 : 1)), del ? 40 : 80);
    return () => clearTimeout(t);
  }, [sub, idx, del, words]);

  return (
    <span style={{ color: theme.accent, fontStyle: "italic" }}>
      {words[idx].substring(0, sub)}
      <span style={{ animation: "blink 1s step-end infinite", color: theme.rose }}>|</span>
    </span>
  );
}

// ─── Floral Divider ──────────────────────────────────────────────────────────

function FloralDivider({ theme }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "40px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${theme.border})` }} />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" fill={theme.accent} opacity="0.35" />
        <circle cx="10" cy="10" r="1.2" fill={theme.rose} opacity="0.5" />
      </svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${theme.border})` }} />
    </div>
  );
}

// ─── Section Title ───────────────────────────────────────────────────────────

function SectionTitle({ label, title, theme }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: 40 }}
    >
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9rem", color: theme.rose, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>
        {label}
      </p>
      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 500, color: theme.text, lineHeight: 1.2,
        letterSpacing: "-0.01em",
      }}>
        {title}<span style={{ color: theme.rose }}>.</span>
      </h1>
    </motion.div>
  );
}

// ─── Scroll-reveal wrapper ───────────────────────────────────────────────────

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Smooth scroll helper ────────────────────────────────────────────────────

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 72;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ activeSection, mode, setMode, theme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        background: mode === "dark" ? "rgba(15,13,14,0.85)" : "rgba(250,246,242,0.88)",
        borderBottom: `1px solid ${scrolled ? theme.border : "transparent"}`,
        transition: "border-color 0.3s",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => scrollToSection("Home")}
          style={{
            cursor: "pointer", fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.4rem", fontWeight: 600, color: theme.text, fontStyle: "italic",
          }}
        >
          K<span style={{ color: theme.rose }}>.</span>S
        </motion.div>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {SECTIONS.map((s) => (
            <motion.button
              key={s}
              whileHover={{ y: -1 }}
              onClick={() => scrollToSection(s)}
              style={{
                background: activeSection === s ? theme.accentSoft : "transparent",
                border: "none", borderRadius: 8, padding: "8px 16px",
                color: activeSection === s ? theme.accent : theme.textSoft,
                fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem",
                fontWeight: 600, cursor: "pointer", transition: "all 0.25s",
                letterSpacing: 0.5,
              }}
            >
              {s}
            </motion.button>
          ))}

          {/* Download Resume button in nav */}
          <motion.a
            whileHover={{ y: -1, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={PROFILE.resumeUrl}
            download
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.rose})`,
              border: "none", borderRadius: 50, padding: "8px 18px",
              color: "#fff",
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9rem",
              fontWeight: 700, cursor: "pointer", letterSpacing: 0.5,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
              marginLeft: 4,
            }}
          >
            <DownloadIcon /> Resume
          </motion.a>

          <div style={{ width: 1, height: 20, background: theme.border, margin: "0 8px" }} />
          <motion.button
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            style={{
              background: theme.accentSoft, border: "none", borderRadius: 50,
              width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: theme.accent,
            }}
          >
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </motion.button>
        </div>

        <div style={{ display: "none" }} className="mobile-toggle">
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: theme.text, cursor: "pointer", padding: 4 }}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", background: theme.bg, borderTop: `1px solid ${theme.border}`, padding: "0 32px" }}
          >
            <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 6 }}>
              {SECTIONS.map((s) => (
                <button key={s} onClick={() => { scrollToSection(s); setMobileOpen(false); }}
                  style={{
                    background: activeSection === s ? theme.accentSoft : "transparent",
                    border: "none", borderRadius: 8, padding: "12px 16px",
                    color: activeSection === s ? theme.accent : theme.textSoft,
                    fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem", fontWeight: 600,
                    cursor: "pointer", textAlign: "left",
                  }}
                >{s}</button>
              ))}

              {/* Download Resume in mobile menu */}
              <a
                href={PROFILE.resumeUrl}
                download
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.rose})`,
                  border: "none", borderRadius: 8, padding: "12px 16px",
                  color: "#fff",
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem", fontWeight: 600,
                  cursor: "pointer", textAlign: "left", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 8,
                }}
                onClick={() => setMobileOpen(false)}
              >
                <DownloadIcon /> Download Resume
              </a>

              <button onClick={() => { setMode(mode === "dark" ? "light" : "dark"); setMobileOpen(false); }}
                style={{ background: theme.accentSoft, border: "none", borderRadius: 8, padding: "12px 16px", color: theme.accent, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem", cursor: "pointer", textAlign: "left" }}>
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Home Section ────────────────────────────────────────────────────────────

function HomeSection({ theme, mode }) {
  return (
    <section id="Home" style={{ minHeight: "100vh", paddingTop: 110, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", minHeight: "75vh" }} className="hero-grid">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", color: theme.rose, letterSpacing: 3, marginBottom: 16 }}>
              Hello, I'm
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 500, color: theme.text, lineHeight: 1.1,
              marginBottom: 10, letterSpacing: "-0.02em",
            }}>
              {PROFILE.name}
            </h1>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              fontWeight: 400, color: theme.textSoft, marginBottom: 28,
              fontStyle: "italic", lineHeight: 1.5,
            }}>
              <TypeWriter words={["Full-Stack Developer", "MERN Enthusiast", "Problem Solver", "Creative Coder"]} theme={theme} />
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem",
              color: theme.textSoft, lineHeight: 1.8, marginBottom: 36, maxWidth: 480,
            }}>
              {PROFILE.bio}
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                href={`mailto:${PROFILE.email}`}
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.rose})`,
                  color: "#fff", padding: "13px 30px", borderRadius: 50,
                  textDecoration: "none", fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700, fontSize: "0.95rem", letterSpacing: 1,
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}
              >
                Say Hello
              </motion.a>

              {/* Download Resume CTA on Hero */}
              <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                href={PROFILE.resumeUrl}
                download
                style={{
                  background: "transparent", color: theme.text,
                  border: `1.5px solid ${theme.border}`, padding: "13px 30px",
                  borderRadius: 50, textDecoration: "none",
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700,
                  fontSize: "0.95rem", letterSpacing: 1,
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}
              >
                <DownloadIcon /> Resume
              </motion.a>

              <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                href={PROFILE.github} target="_blank" rel="noopener noreferrer"
                style={{
                  background: "transparent", color: theme.text,
                  border: `1.5px solid ${theme.border}`, padding: "13px 30px",
                  borderRadius: 50, textDecoration: "none",
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700,
                  fontSize: "0.95rem", letterSpacing: 1,
                }}
              >
                GitHub
              </motion.a>
            </div>

            <div style={{ display: "flex", gap: 18, marginTop: 36 }}>
              {[
                { icon: <GithubIcon />, href: PROFILE.github },
                { icon: <LinkedInIcon />, href: PROFILE.linkedin },
                { icon: <MailIcon />, href: `mailto:${PROFILE.email}` },
              ].map((s, i) => (
                <motion.a key={i} whileHover={{ y: -3, color: theme.accent }}
                  href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" style={{ color: theme.textSoft, transition: "color 0.2s" }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Profile Photo */}
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 340, height: 400, borderRadius: 200, overflow: "hidden", position: "relative",
                background: `linear-gradient(160deg, ${theme.accentSoft}, ${theme.roseSoft}, ${theme.bgCard})`,
                border: `2px solid ${theme.border}`,
              }}>
                <img
                  src={import.meta.env.BASE_URL + "profile.jpg"}
                  alt={PROFILE.name}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ position: "absolute", top: -30, left: -30, width: 80, height: 80, borderRadius: "50%", background: theme.rose, opacity: 0.06, filter: "blur(25px)" }} />
              <div style={{ position: "absolute", bottom: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: theme.accent, opacity: 0.06, filter: "blur(30px)" }} />
            </div>
          </motion.div>
        </div>

        <FloralDivider theme={theme} />

        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="stats-grid">
            {[
              { num: "2+", label: "Projects Built" },
              { num: "150+", label: "DSA Problems" },
              { num: "5", label: "Certifications" },
              { num: "15+", label: "API Endpoints" },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "28px 16px",
                background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16,
              }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.2rem", fontWeight: 500, color: theme.accent }}>{s.num}</span>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.85rem", color: theme.textSoft, marginTop: 6, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────────────────────

function AboutSection({ theme }) {
  return (
    <section id="About" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle label="About Me" title="Passion Meets Purpose" theme={theme} />

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: 40, marginBottom: 56 }} className="about-grid">
            <div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", color: theme.textSoft, lineHeight: 1.85, marginBottom: 18 }}>
                I'm Krity Sharma — a Computer Science student at Lovely Professional University with a love for building full-stack web applications. From crafting secure authentication systems to engineering real-time communication, I enjoy turning complex problems into elegant, user-friendly solutions.
              </p>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", color: theme.textSoft, lineHeight: 1.85, marginBottom: 18 }}>
                My toolkit revolves around the MERN stack — React, Node.js, Express, and MongoDB — and I'm constantly sharpening my skills through competitive programming, certifications, and hands-on project building.
              </p>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", color: theme.textSoft, lineHeight: 1.85 }}>
                Beyond code, I believe in giving back. I've contributed to environmental awareness initiatives with Familial Forestry NGO and enjoy mentoring peers. Every line of code I write is a step toward building something meaningful.
              </p>
            </div>
            <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 28, height: "fit-content" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.85rem", color: theme.rose, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
                Quick Glance
              </h3>
              {[
                ["Name", "Krity Sharma"],
                ["Studying", "B.Tech CSE"],
                ["University", "LPU, Punjab"],
                ["Focus", "MERN Stack"],
                ["DSA", "150+ on LeetCode"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${theme.border}` }}>
                  <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.88rem", color: theme.textSoft }}>{k}</span>
                  <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.88rem", color: theme.text, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", fontWeight: 500, color: theme.text, marginBottom: 24 }}>
            Skills & Technologies
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="skills-grid">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 24 }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.8rem", color: theme.rose, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>{cat}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((s) => (
                    <motion.span key={s} whileHover={{ y: -2, background: theme.accent, color: "#fff" }}
                      style={{
                        padding: "6px 14px", borderRadius: 50,
                        border: `1px solid ${theme.border}`, background: theme.bgSoft,
                        fontFamily: "'Lora', Georgia, serif", fontSize: "0.82rem", color: theme.text,
                        cursor: "default", transition: "all 0.25s",
                      }}>{s}</motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <FloralDivider theme={theme} />

        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", fontWeight: 500, color: theme.text, marginBottom: 24 }}>Education</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.05rem", color: theme.text, fontWeight: 600 }}>{e.degree}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem", color: theme.rose, fontStyle: "italic" }}>{e.school}, {e.location}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.82rem", color: theme.textSoft, background: theme.accentSoft, padding: "5px 12px", borderRadius: 8, display: "inline-block" }}>{e.period}</span>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.88rem", color: theme.accent, fontWeight: 600, marginTop: 6 }}>{e.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <FloralDivider theme={theme} />

        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", fontWeight: 500, color: theme.text, marginBottom: 24 }}>Certifications</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {CERTIFICATES.map((c, i) => {
              const Wrapper = c.link ? "a" : "div";
              const linkProps = c.link ? { href: c.link, target: "_blank", rel: "noopener noreferrer" } : {};
              return (
                <motion.div key={i} whileHover={{ y: -3 }}>
                  <Wrapper {...linkProps}
                    style={{
                      background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14,
                      padding: "18px 22px", transition: "border-color 0.3s",
                      cursor: c.link ? "pointer" : "default",
                      textDecoration: "none", display: "block",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.rose}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.92rem", color: theme.text, fontWeight: 500, flex: 1 }}>{c.name}</p>
                      {c.link && <span style={{ color: theme.textSoft, flexShrink: 0 }}><ExternalIcon /></span>}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.85rem", color: theme.rose, fontStyle: "italic" }}>{c.issuer}</span>
                      <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.78rem", color: theme.textSoft }}>{c.date}</span>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        <FloralDivider theme={theme} />

        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", fontWeight: 500, color: theme.text, marginBottom: 24 }}>Achievements</h2>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16, padding: "14px 20px", background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12 }}>
              <span style={{ color: theme.accent, marginTop: 2, flexShrink: 0, fontSize: "0.7rem" }}>◆</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", color: theme.text, lineHeight: 1.6 }}>{a.text}</p>
              </div>
              <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.78rem", color: theme.textSoft, whiteSpace: "nowrap" }}>{a.date}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ─── Projects Section ────────────────────────────────────────────────────────

function ProjectsSection({ theme }) {
  return (
    <section id="Projects" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle label="My Work" title="Things I've Built" theme={theme} />

        <Reveal>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", color: theme.textSoft, maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
            Each project is a labor of love — from the architecture to the last pixel. Here are the highlights.
          </p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <motion.div
                style={{
                  background: theme.bgCard, border: `1px solid ${theme.border}`,
                  borderRadius: 20, padding: 36, position: "relative", overflow: "hidden",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = `0 6px 30px ${p.color}18`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.boxShadow = "none"; }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "5rem", fontWeight: 500, color: p.color, opacity: 0.08, position: "absolute", top: -10, right: 20, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 500, color: theme.text }}>{p.title}</h3>
                    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem", color: theme.rose, fontStyle: "italic" }}>{p.subtitle}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.8rem", color: theme.textSoft, background: theme.accentSoft, padding: "5px 12px", borderRadius: 8 }}>{p.date}</span>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: theme.textSoft }}><GithubIcon /></a>
                  </div>
                </div>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", color: theme.textSoft, lineHeight: 1.75, margin: "16px 0 18px" }}>{p.description}</p>
                <ul style={{ margin: "0 0 20px 0", paddingLeft: 18 }}>
                  {p.highlights.map((h, j) => (
                    <li key={j} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", color: theme.textSoft, lineHeight: 1.7, marginBottom: 5 }}>{h}</li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.78rem",
                      fontWeight: 600, letterSpacing: 0.5, color: theme.accent,
                      background: theme.accentSoft, padding: "4px 12px", borderRadius: 50,
                    }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────

function ContactSection({ theme }) {
  return (
    <section id="Contact" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <SectionTitle label="Get In Touch" title="Let's Connect" theme={theme} />

        <Reveal>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.05rem", color: theme.textSoft, lineHeight: 1.8, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>
            Whether you have a project idea, a collaboration opportunity, or just want to say hello — I'd love to hear from you.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            {[
              { icon: <MailIcon />, label: PROFILE.email, href: `mailto:${PROFILE.email}` },
              { icon: <GithubIcon />, label: "github.com/Krity2004", href: PROFILE.github },
              { icon: <LinkedInIcon />, label: "Krity Sharma", href: PROFILE.linkedin },
            ].map((c, i) => (
              <motion.a key={i} whileHover={{ y: -3 }}
                href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: theme.bgCard, border: `1px solid ${theme.border}`,
                  borderRadius: 14, padding: "16px 28px", width: "100%", maxWidth: 400,
                  textDecoration: "none", transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.rose}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}>
                <span style={{ color: theme.rose }}>{c.icon}</span>
                <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", color: theme.text }}>{c.label}</span>
                <span style={{ marginLeft: "auto", color: theme.textSoft }}><ExternalIcon /></span>
              </motion.a>
            ))}
          </div>
        </Reveal>

        <FloralDivider theme={theme} />

        <Reveal delay={0.3}>
          <div style={{
            background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.roseSoft})`,
            border: `1px solid ${theme.border}`, borderRadius: 24, padding: 40,
          }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 500, color: theme.text, fontStyle: "italic", marginBottom: 12 }}>
              "The best way to predict the future is to create it."
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem", color: theme.textSoft, letterSpacing: 1 }}>
              — Abraham Lincoln
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ theme }) {
  return (
    <footer style={{ borderTop: `1px solid ${theme.border}`, padding: "36px 32px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 16 }}>
        {[
          { icon: <GithubIcon />, href: PROFILE.github },
          { icon: <LinkedInIcon />, href: PROFILE.linkedin },
          { icon: <MailIcon />, href: `mailto:${PROFILE.email}` },
        ].map((s, i) => (
          <motion.a key={i} whileHover={{ y: -3, color: theme.rose }}
            href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer" style={{ color: theme.textSoft, transition: "color 0.2s" }}>
            {s.icon}
          </motion.a>
        ))}
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.88rem", color: theme.textSoft, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        Made By <span style={{ color: theme.accent, fontWeight: 600 }}>Krity Sharma</span> · {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// ─── useActiveSection hook ───────────────────────────────────────────────────

function useActiveSection() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      const offset = 120;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(SECTIONS[i]);
          return;
        }
      }
      setActive("Home");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return active;
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [mode, setMode] = useState("dark");
  const theme = THEMES[mode];
  const activeSection = useActiveSection();

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", transition: "background 0.5s, color 0.5s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-grid > div:last-child { order: -1; }
          .hero-grid > div:first-child > div { justify-content: center; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }

        ::selection {
          background: ${theme.rose};
          color: #fff;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.textSoft}; }
      `}</style>

      <Nav activeSection={activeSection} mode={mode} setMode={setMode} theme={theme} />

      <HomeSection theme={theme} mode={mode} />
      <AboutSection theme={theme} />
      <ProjectsSection theme={theme} />
      <ContactSection theme={theme} />

      <Footer theme={theme} />
    </div>
  );
}
