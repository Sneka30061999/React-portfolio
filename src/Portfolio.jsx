import { useEffect, useState } from "react";
import "./Portfolio.css";
const COLORS = ["#FF4D8D", "#00C2A8", "#7B4DFF", "#FF8A1F"];

/* ---------- EDIT YOUR DETAILS HERE ---------- */
const PROFILE = {
  name: "Sneka.R",
  role: "Front end developer",
  email: "https://mail.google.com/mail/u/0/#inbox",
  github: "https://github.com/sneka30061999",
  linkedin: "https://www.linkedin.com/in/sneka-undefined-35b03341b/",
  location: "Open to junior roles · Remote or hybrid"
};

const PROJECTS = [
  {
    title: "Taskboard", type: "React",
    text: "A drag-and-drop kanban board. Tasks save to local storage and filter by label.",
    stack: ["React", "Vite", "CSS Modules"], live: "#", code: "#"
  },
  {
    title: "Weather Now", type: "React",
    text: "Search any city and see a five-day forecast. Handles loading, errors and empty states.",
    stack: ["React", "REST API", "Vitest"], live: "#", code: "#"
  },
  {
    title: "Bloom Café", type: "HTML & CSS",
    text: "A responsive café site built mobile-first with CSS Grid and no frameworks.",
    stack: ["HTML", "CSS Grid", "Accessibility"], live: "#", code: "#"
  },
  {
    title: "Budget Buddy", type: "React",
    text: "Track income and spending, with a monthly chart. Built to practice useReducer and context.",
    stack: ["React", "Context", "Chart.js"], live: "#", code: "#"
  }
];

const SKILLS = {
  "Building": ["React and hooks", "JavaScript (ES6+)", "HTML5 and semantic markup", "CSS, Flexbox and Grid"],
  "Tooling": ["Git and GitHub", "Vite", "npm", "VS Code and browser DevTools"],
  "Quality": ["Responsive design", "Accessibility basics (WCAG)", "Vitest and Testing Library", "Lighthouse audits"]
};

/* ---------- COMPONENTS ---------- */
function ThemeToggle() {
  const [dark, setDark] = useState(() => matchMedia("(prefers-color-scheme: dark)").matches);
  const flip = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  };
  return (<button className="icon-btn" onClick={flip} aria-pressed={dark}>{dark ? "Light mode" : "Dark mode"}</button>);
}

function Typer() {
  const words = ["React.", "accessible UIs.", "smooth animations.", "ideas that move."];
  const [w, setW] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[w];
    let t;
    if (!del && n < word.length) t = setTimeout(() => setN(n + 1), 85);
    else if (!del) t = setTimeout(() => setDel(true), 1400);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 45);
    else { setDel(false); setW((w + 1) % words.length); }
    return () => clearTimeout(t);
  }, [n, del, w]);
  return (<><b>{words[w].slice(0, n)}</b><i aria-hidden="true"></i></>);
}

function Marquee() {
  const items = ["React", "JavaScript", "HTML5", "CSS Grid", "Flexbox", "Git", "Vite", "Accessibility", "Responsive", "Testing"];
  const row = [...items, ...items];
  return (<div className="marquee" aria-hidden="true"><div className="track">{row.map((t, i) => <span key={i}>{t} ✦</span>)}</div></div>);
}

function Nav() {
  return (<nav aria-label="Main">
    <a className="logo" href="#top">{PROFILE.name}</a>
    <ul>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><ThemeToggle /></li>
    </ul>
  </nav>);
}

function LikeDemo() {
  const [count, setCount] = useState(12);
  const [liked, setLiked] = useState(false);
  const toggle = () => { setCount(c => c + (liked ? -1 : 1)); setLiked(l => !l); };
  return (<div className="demo">
    <small>Live component. Click it.</small>
    <button className="like" onClick={toggle} aria-pressed={liked}>
      <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
      {liked ? "Liked" : "Like"} · {count}
    </button>
  </div>);
}

function Hero() {
  const code = "const [liked, setLiked] = useState(false);\nconst [count, setCount] = useState(12);";
  return (<header className="hero" id="top">
    <span className="blob b1"></span><span className="blob b2"></span><span className="blob b3"></span><span className="blob b4"></span>
    <div>
      <h1>I build clear, friendly <span>interfaces</span> for the web.</h1>
      <p className="lead">Hi, I'm {PROFILE.name.split(" ")[0]}, a junior front end developer who works mostly in React. I care about accessible, responsive pages that are easy to use and easy to maintain.</p>
      <p className="typer">Right now I'm into <Typer /></p>
      <div className="btns">
        <a className="btn primary" href="#projects">See my projects</a>
        <a className="btn ghost" href="#contact">Get in touch</a>
      </div>
    </div>
    <div className="win" aria-label="A small React component demo">
      <div className="win-bar"><i></i><i></i><i></i><b>LikeButton.jsx</b></div>
      <pre><code>{code}</code></pre>
      <LikeDemo />
    </div>
  </header>);
}

function Projects() {
  const types = ["All", ...new Set(PROJECTS.map(p => p.type))];
  const [active, setActive] = useState("All");
  const shown = PROJECTS.filter(p => active === "All" || p.type === active);
  return (<section id="projects">
    <span className="blob b5"></span>
    <span className="blob b6"></span>
    <h2>Projects</h2>
    <p className="sub">Four things I've built while learning. Each one has a live demo and the code on GitHub.</p>
    <div className="tabs" role="tablist" aria-label="Filter projects">
      {types.map(t => <button key={t} role="tab" className="tab" aria-selected={active === t} onClick={() => setActive(t)}>{t}</button>)}
    </div>
    <div className="grid">
      {shown.map((p, i) => <article className="card" key={p.title} style={{ "--cc": COLORS[PROJECTS.indexOf(p) % 4], "--i": i }}>
        <h3>{p.title}</h3>
        <p>{p.text}</p>
        <div className="chips">{p.stack.map(s => <span className="chip" key={s}>{s}</span>)}</div>
        <div className="links"><a href={p.live}>Live demo</a><a href={p.code}>Source code</a></div>
      </article>)}
    </div>
  </section>);
}

function Skills() {
  return (<section id="skills">
    <h2>Skills</h2>
    <p className="sub">What I use day to day.</p>
    <div className="skills">
      {Object.entries(SKILLS).map(([group, items], gi) => <div key={group} style={{ "--gc": COLORS[(gi + 1) % 4] }}>
        <h3>{group}</h3>
        <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
      </div>)}
    </div>
  </section>);
}

function About() {
  return (<section id="about">
    <div className="about">
      <div>
        <h2>About me</h2>
        <p>I started coding after finishing a bootcamp and haven't stopped since. I like turning a design into a page that works well on a phone, a laptop and a screen reader.</p>
        <p>I learn best by building, asking questions and reading other people's code. I'm looking for a team where I can ship real features and grow with good code reviews.</p>
      </div>
      <div className="learning">
        <h3>Currently learning</h3>
        <ul>
          <li>TypeScript with React</li>
          <li>Next.js routing and data fetching</li>
          <li>Writing better component tests</li>
        </ul>
      </div>
    </div>
  </section>);
}

function Contact() {
  return (<section id="contact" className="contact">
    <h2>Let's work together. <span className="wave">👋</span></h2>
    <p className="sub">{PROFILE.location}. The fastest way to reach me is email.</p>
    <div className="btns">
      <a
        className="btn primary"
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Email me
      </a>
      <a className="btn ghost" href={PROFILE.github}>GitHub</a>
      <a className="btn ghost" href={PROFILE.linkedin}>LinkedIn</a>
    </div>
  </section>);
}

function App() {
  useEffect(() => {
    const els = document.querySelectorAll("section");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach(el => { el.classList.add("rv"); io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (<div className="wrap">
    <Nav />
    <main>
      <Hero />
      <Marquee />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </main>
    <footer><span>© {new Date().getFullYear()} {PROFILE.name}</span><span>Built with React</span></footer>
  </div>);
}


export default App;
