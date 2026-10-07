import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Code2,
  Facebook,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  MoveUpRight,
  Palette,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { projectApplications, projectMeta } from "./projectApps.jsx";

const projects = [
  {
    number: "01",
    name: "LeadFlow",
    type: "SALES ENABLEMENT PLATFORM",
    description:
      "A streamlined system for organizing leads, improving follow-ups, and making sales conversations more consistent and focused.",
    stack: ["React", "JavaScript", "Client Journey"],
    theme: "project-finova",
    icon: Layers3,
    github: "",
    demo: "",
    slug: "leadflow",
  },
  {
    number: "02",
    name: "ClientConnect",
    type: "CUSTOMER RELATIONSHIP APP",
    description:
      "A simple, responsive experience built to support customer communication, retention, and better service touchpoints.",
    stack: ["React", "REST API", "CRM"],
    theme: "project-nomad",
    icon: Globe2,
    github: "",
    demo: "",
    slug: "clientconnect",
  },
  {
    number: "03",
    name: "DealTracker",
    type: "SALES PERFORMANCE TRACKER",
    description:
      "A dashboard-style concept for tracking opportunities, closing stages, performance trends, and daily priorities in one place.",
    stack: ["React", "JavaScript", "Responsive UI"],
    theme: "project-goodspace",
    icon: Palette,
    github: "",
    demo: "",
    slug: "dealtracker",
  },
  {
    number: "04",
    name: "Taskflow",
    type: "PRODUCTIVITY WEB APP",
    description:
      "A practical planning tool for managing tasks, progress, and daily execution without losing focus.",
    stack: ["React", "Node.js", "MongoDB"],
    theme: "project-taskflow",
    icon: Code2,
    github: "",
    demo: "",
    slug: "taskflow",
  },
  {
    number: "05",
    name: "BrandBoost",
    type: "MARKETING SUPPORT TOOL",
    description:
      "A creative concept for reinforcing brand presence through smarter campaign planning and customer engagement ideas.",
    stack: ["React", "Express", "MongoDB"],
    theme: "project-bloom",
    icon: Sparkles,
    github: "",
    demo: "",
    slug: "brandboost",
  },
  {
    number: "06",
    name: "SalesPilot",
    type: "SALES PERFORMANCE HUB",
    description:
      "A practical sales-focused concept for tracking outreach, engagement, priority opportunities, and stronger conversion activity.",
    stack: ["React", "Sales Ops", "Performance"],
    theme: "project-taskflow",
    icon: Layers3,
    github: "",
    demo: "",
    slug: "salespilot",
  },
];

const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Git & GitHub",
  "Sales & Client Communication",
  "Problem Solving",
];

const socials = [
  { label: "GitHub", href: "https://github.com/muhammadsaleem-codes", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-saleem", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/search/top?q=Muhammad%20Saleem%20Naqshbandi", icon: Facebook },
  { label: "WhatsApp", href: "https://wa.me/923366605036", icon: MessageCircle },
];

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="label-line" />
      <span>{children}</span>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  const ProjectIcon = project.icon;

  return (
    <article
      className="project-card"
      onClick={() => onOpen(project.slug)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project.slug);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className={`project-art ${project.theme}`}>
        <div className="art-topline">
          <span>{project.name.toLowerCase()}</span>
          <span className="art-topline-dot" />
        </div>
        <div className="art-orbit art-orbit-one" />
        <div className="art-orbit art-orbit-two" />
        <div className="art-center">
          <ProjectIcon aria-hidden="true" strokeWidth={1.25} />
        </div>
        <div className="art-caption">A little idea, made real.</div>
        <span className="art-number">{project.number}</span>
      </div>
      <div className="project-info">
        <div className="project-heading">
          <div>
            <span className="eyebrow">{project.type}</span>
            <h3>{project.name}</h3>
          </div>
          <span className="project-index">{project.number}</span>
        </div>
        <p>{project.description}</p>
        <div className="project-bottom">
          <div className="tag-list">
            {project.stack.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="project-links">
            {project.github && (
              <a
                className="icon-link"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} source on GitHub`}
                onClick={(event) => event.stopPropagation()}
              >
                <Github size={17} />
              </a>
            )}
            {project.demo && (
              <a
                className="icon-link"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.name} live demo`}
                onClick={(event) => event.stopPropagation()}
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileSrc, setProfileSrc] = useState(`${import.meta.env.BASE_URL}profile.png`);
  const [activeProject, setActiveProject] = useState(null);

  const closeMenu = () => setMenuOpen(false);

  const handleProfileError = (event) => {
    if (profileSrc === `${import.meta.env.BASE_URL}profile.png`) {
      setProfileSrc(`${import.meta.env.BASE_URL}profile.jpg`);
      return;
    }

    event.currentTarget.style.display = "none";
  };

  useEffect(() => {
    const syncProjectFromHash = () => {
      const hash = window.location.hash.replace(/^#\//, "").replace(/^#/, "");
      if (hash.startsWith("project/")) {
        const slug = hash.replace("project/", "");
        setActiveProject(slug in projectMeta ? slug : null);
      } else {
        setActiveProject(null);
      }
    };

    syncProjectFromHash();
    window.addEventListener("hashchange", syncProjectFromHash);

    return () => window.removeEventListener("hashchange", syncProjectFromHash);
  }, []);

  const openProject = (slug) => {
    if (!slug || !(slug in projectMeta)) return;
    window.history.pushState(null, "", `#project/${slug}`);
    setActiveProject(slug);
  };

  const closeProject = () => {
    window.history.pushState(null, "", "/");
    setActiveProject(null);
  };

  const ProjectScreen = activeProject ? projectApplications[activeProject] : null;

  return (
    <>
      <div className="site-shell">
        <header className="site-header custom-hero-header">
          <nav className={`main-nav custom-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            <a className="wordmark" href="#home" onClick={closeMenu}>
              <span className="wordmark-icon">M</span>
              <span>MUHAMMAD SALEEM.</span>
            </a>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#work" onClick={closeMenu}>Case Studies</a>
            <a href="#contact" onClick={closeMenu}>Get In Touch</a>
            <div className="header-socials">
              <a href="https://www.linkedin.com/in/muhammad-saleem" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="https://github.com/muhammadsaleem-codes" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
            </div>
          </nav>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        <main>
          <section className="hero custom-hero" id="home">
            <div className="hero-copy custom-hero-copy">
              <h1>
                Muhammad Saleem
              </h1>
              <p className="hero-description custom-hero-description">
                I build practical digital experiences, understand sales and client needs, and create solutions that are useful, reliable, and easy to trust.
              </p>
              <div className="hero-actions">
                <a className="button button-primary custom-cta" href="#work">
                  Let&apos;s get started <ArrowDownRight size={17} />
                </a>
              </div>
              <div className="brand-band">
                <span>Training &amp; Experience</span>
                <div className="brand-list">
                  <div className="brand-box">SMIT</div>
                  <div className="brand-box">Saylani</div>
                  <div className="brand-box">Mass IT</div>
                  <div className="brand-box">Training</div>
                  <div className="brand-box">Web Dev</div>
                </div>
              </div>
            </div>

            <div className="hero-visual custom-hero-visual" aria-label="Portrait">
              <div className="portrait-frame custom-portrait-frame">
                <img
                  className="portrait-image"
                  src={profileSrc}
                  alt="Portrait"
                  onError={handleProfileError}
                />
              </div>
            </div>
          </section>

          <section className="intro-strip" aria-label="Introduction">
            <p>
              GOOD WORK <span>×</span> GOOD PEOPLE <span>×</span> GOOD ENERGY
            </p>
            <span className="intro-strip-note">THAT&apos;S HOW I WORK.</span>
          </section>

          <section className="about section-wrap" id="about">
            <div className="about-label">
              <SectionLabel number="01">A LITTLE INTRO</SectionLabel>
              <span className="about-aside">DEVELOPER. SALESMAN. BUILDER.</span>
            </div>
            <div className="about-content">
              <h2>
                Curious by nature.
                <br />
                <span>Focused on growth.</span>
              </h2>
              <div className="about-columns">
                <p>
                  I&apos;m Muhammad Saleem, a self-driven professional who enjoys building digital experiences
                  while also understanding how to connect with people, sell ideas, and deliver value.
                  I care about quality, consistency, and clear communication.
                </p>
                <p>
                  Over the last year, I&apos;ve worked in a hands-on environment where responsibility, problem-solving,
                  and consistency mattered. I&apos;m growing my skills across the MERN stack and bringing the same
                  energy to sales, client engagement, and business growth.
                </p>
              </div>
              <a className="inline-link" href="#contact">
                A little more about me <ArrowRight size={16} />
              </a>
            </div>
            <div className="about-mark" aria-hidden="true"><Asterisk /></div>
          </section>

          <section className="work section-wrap" id="work">
            <div className="section-heading">
              <div>
                <SectionLabel number="02">SELECTED WORK</SectionLabel>
                <h2>Things I&apos;ve <span>helped shape.</span></h2>
              </div>
              <p>Small projects, practical thinking, and a focus on real-world value.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.number} project={project} onOpen={openProject} />
              ))}
            </div>
            <p className="projects-note">
              BUILT WITH A PRACTICAL MINDSET — FOCUSED ON USEFUL RESULTS.
            </p>
          </section>

          <section className="skills section-wrap" id="skills">
            <div className="skills-intro">
              <SectionLabel number="03">MY TOOLKIT</SectionLabel>
              <h2>Good tools.<br /><span>Better outcomes.</span></h2>
              <p>
                I combine technical skills with communication, sales awareness, and a strong
                work ethic to create value in different situations.
              </p>
            </div>
            <div className="skills-content">
              <div className="skills-topline">
                <span>THINGS I WORK WITH</span>
                <span>01 — 08</span>
              </div>
              <div className="skill-list">
                {skills.map((skill, index) => (
                  <div className="skill-item" key={skill}>
                    <span className="skill-number">0{index + 1}</span>
                    <span className="skill-name">{skill}</span>
                    <MoveUpRight size={17} className="skill-arrow" />
                  </div>
                ))}
              </div>
              <div className="skills-footnote">
                <span className="availability-dot" />
                ALWAYS LEARNING, IMPROVING, AND GROWING
              </div>
            </div>
          </section>

          <section className="contact section-wrap" id="contact">
            <SectionLabel number="04">LET&apos;S CONNECT</SectionLabel>
            <div className="contact-main">
              <div>
                <span className="eyebrow">HAVE A GOOD OPPORTUNITY IN MIND?</span>
                <h2>Let&apos;s build<br /><span>something valuable.</span></h2>
              </div>
              <a className="contact-button" href="mailto:muhammadsaleembaloch798@gmail.com" aria-label="Email Muhammad Saleem">
                <Mail size={26} strokeWidth={1.5} />
                <span>SAY HELLO</span>
                <ArrowUpRight size={20} />
              </a>
            </div>
            <div className="contact-bottom">
              <p>Open to new opportunities, strong conversations, and meaningful work.</p>
              <div className="contact-details">
                <a href="mailto:muhammadsaleembaloch798@gmail.com">muhammadsaleembaloch798@gmail.com</a>
                <span className="contact-divider">|</span>
                <a href="tel:+923357667834"><Phone size={14} /> 0335 7667834</a>
                <span className="contact-divider">|</span>
                <a href="https://wa.me/923366605036" target="_blank" rel="noreferrer"><MessageCircle size={14} /> 0336 6605036</a>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a className="wordmark footer-wordmark" href="#home">
            <span className="wordmark-icon">M</span>
            <span>MUHAMMAD SALEEM<span className="wordmark-period">.</span></span>
          </a>
          <span className="footer-note">DEVELOPER. SALES-MINDED PROFESSIONAL. READY TO GROW.</span>
          <div className="social-links">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon size={17} />
              </a>
            ))}
            <a href="mailto:muhammadsaleembaloch798@gmail.com" aria-label="Send an email">
              <Mail size={17} />
            </a>
          </div>
          <span className="copyright">© 2026 MUHAMMAD SALEEM</span>
        </footer>
      </div>

      {ProjectScreen ? (
        <div className="project-overlay">
          <div className="project-overlay-content">
            <ProjectScreen onBack={closeProject} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
