import { useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, BookOpen, Building2, Compass, FileText, Github, GraduationCap, Mail, MapPin, Menu, Moon, Sun, X, Layers3, NotebookPen, Ruler, Search, ExternalLink } from 'lucide-react'

type Page = 'home' | 'about' | 'academics' | 'courses' | 'projects' | 'journal' | 'contact'
type Theme = 'dark' | 'light'
const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'academics', label: 'Academics' },
  { id: 'courses', label: 'Courses' }, { id: 'projects', label: 'Projects' }, { id: 'journal', label: 'Journal' }, { id: 'contact', label: 'Contact' }
]
const pageCopy: Record<Exclude<Page, 'home'>, { number: string; eyebrow: string; title: string; intro: string }> = {
  about: { number: '01', eyebrow: 'THE PERSON', title: 'Curiosity with a practical purpose.', intro: 'I’m Mashal Khan, an early-stage civil engineering student learning how mathematics, materials, and design become the structures and infrastructure around us.' },
  academics: { number: '02', eyebrow: 'UNIVERSITY', title: 'The academic foundation.', intro: 'A record of my university journey, academic direction, and the milestones I can verify as I progress.' },
  courses: { number: '03', eyebrow: 'CURRENT STUDIES', title: 'One subject at a time.', intro: 'A structured place for course outlines, concise notes, formulas, useful resources, and progress through the semester.' },
  projects: { number: '04', eyebrow: 'STUDENT WORK', title: 'Learning made tangible.', intro: 'A growing collection of coursework, drawing exercises, small experiments, and digital tools. Planned work is clearly distinguished from completed work.' },
  journal: { number: '05', eyebrow: 'LEARNING LOG', title: 'Keep a record of the questions.', intro: 'Short explanations, study reflections, field observations, and concepts worth revisiting.' },
  contact: { number: '06', eyebrow: 'CONTACT', title: 'Good work starts with a conversation.', intro: 'For student collaboration, learning resources, or a thoughtful exchange about engineering.' }
}
function getPage(): Page {
  const value = window.location.hash.replace(/^#\/?/, '').split('/')[0] as Page
  return pages.some(p => p.id === value) ? value : 'home'
}
function BridgeDrawing() {
  return <svg className="bridge-drawing" viewBox="0 0 620 390" role="img" aria-label="Technical line illustration of a cable-stayed bridge">
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M35 300H585 M60 282H560 M60 288H560" strokeDasharray="4 7" opacity=".4" />
      <path d="M245 282V74L226 282M245 74L264 282M418 282V104L401 282M418 104L435 282" strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => <path key={'a' + i} d={`M${245 + i * 10} 92L${275 + i * 29} 282`} opacity=".65" />)}
      {Array.from({ length: 7 }, (_, i) => <path key={'b' + i} d={`M${418 - i * 8} 120L${330 + i * 30} 282`} opacity=".65" />)}
      <path d="M245 62V43H275M418 92V73H448M85 315H535M110 325H510" opacity=".4" />
      <circle cx="245" cy="74" r="4" fill="currentColor" /><circle cx="418" cy="104" r="4" fill="currentColor" />
    </g>
    <g fill="currentColor" fontFamily="monospace" fontSize="10" opacity=".7"><text x="280" y="50">TOWER A</text><text x="452" y="81">TOWER B</text><text x="65" y="270">DECK LEVEL</text><text x="445" y="340">STRUCTURAL STUDY / 01</text><text x="65" y="340">KARACHI · PAKISTAN</text></g>
  </svg>
}
function SiteHeader({ current, theme, setTheme }: { current: Page; theme: Theme; setTheme: (t: Theme) => void }) {
  const [open, setOpen] = useState(false)
  return <header className="topbar">
    <a className="brand" href="#/home" aria-label="Mashal Khan home"><span className="brand-mark"><Building2 size={18} /></span><span className="brand-name">MK<span>.</span></span></a>
    <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">{pages.map(p => <a className={current === p.id ? 'active' : ''} key={p.id} href={`#/${p.id}`} onClick={() => setOpen(false)}>{p.label}</a>)}</nav>
    <div className="top-actions"><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><a className="availability" href="#/contact"><span /> STUDENT / LEARNING</a><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
  </header>
}
function HomePage() {
  return <>
    <section className="hero section-wrap" id="home"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> CIVIL ENGINEERING / STUDENT PORTFOLIO</p><h1>Building an eye<br />for <em>what holds.</em></h1><p className="hero-description">I’m Mashal Khan — a civil engineering student at the beginning of the journey, exploring the principles behind structures, spaces, and the built world.</p><div className="hero-buttons"><a className="button button-primary" href="#/projects">Explore student work <ArrowRight size={16} /></a><a className="text-link" href="#/about">A little about me <ArrowDownRight size={16} /></a></div><div className="hero-meta"><span><span className="meta-dot" /> LEARNING IN PUBLIC</span><span>KARACHI, PAKISTAN</span></div></div>
      <div className="hero-visual"><div className="visual-top"><span>FIG. 001</span><span>CONCEPT / STRUCTURE</span></div><div className="visual-grid" /><BridgeDrawing /><div className="visual-bottom"><span>LOAD · FORM · CONTEXT</span><span>NOT TO SCALE</span></div><div className="vertical-label">FIELD NOTES — 2026</div></div><div className="hero-index">01 <span>/</span> 07</div></section>
    <section className="intro-strip"><div className="section-wrap strip-inner"><span className="strip-label">CURRENT CHAPTER</span><p>Learning the fundamentals. Developing the eye. Documenting the process.</p><Compass size={21} /></div></section>
    <section className="content-section section-wrap"><div className="section-heading"><p className="eyebrow">START HERE</p><h2>A portfolio that grows<br /><em>with the student.</em></h2></div><div className="portal-grid">
      <a className="portal-card" href="#/courses"><span className="portal-icon"><BookOpen size={21} /></span><span className="portal-number">01 / STUDY</span><h3>Course hub</h3><p>Organize subjects, notes, formulas, and useful study links.</p><span className="portal-link">Open courses <ArrowRight size={15} /></span></a>
      <a className="portal-card" href="#/academics"><span className="portal-icon"><GraduationCap size={21} /></span><span className="portal-number">02 / UNIVERSITY</span><h3>Academic record</h3><p>Keep university information and verified milestones together.</p><span className="portal-link">View academics <ArrowRight size={15} /></span></a>
      <a className="portal-card" href="#/projects"><span className="portal-icon"><Layers3 size={21} /></span><span className="portal-number">03 / BUILD</span><h3>Projects & practice</h3><p>Document real student work, experiments, and digital tools.</p><span className="portal-link">Browse work <ArrowRight size={15} /></span></a>
      <a className="portal-card" href="#/journal"><span className="portal-icon"><NotebookPen size={21} /></span><span className="portal-number">04 / REFLECT</span><h3>Learning journal</h3><p>Capture concepts, questions, and lessons worth revisiting.</p><span className="portal-link">Read journal <ArrowRight size={15} /></span></a>
    </div></section>
  </>
}
function DetailPage({ page }: { page: Exclude<Page, 'home'> }) {
  const data = pageCopy[page]
  const [search, setSearch] = useState('')
  const studyTools = [
    { title: 'Course outlines', detail: 'Syllabus, weekly topics, assessment details, and lecturer-provided material.', icon: <FileText size={21} /> },
    { title: 'Study notes', detail: 'Concise summaries, worked examples, definitions, and revision points.', icon: <NotebookPen size={21} /> },
    { title: 'Formula & concept sheets', detail: 'A searchable reference for equations, symbols, units, and key concepts.', icon: <Ruler size={21} /> },
    { title: 'Learning resources', detail: 'Textbooks, simulations, videos, and other reliable resources for each subject.', icon: <Search size={21} /> }
  ]
  return <section className="page-section section-wrap">
    <div className="page-intro"><p className="eyebrow">{data.number} / {data.eyebrow}</p><h1>{data.title}</h1><p>{data.intro}</p></div>
    {page === 'about' && <div className="page-two-col"><article className="info-panel"><span className="panel-kicker">MY APPROACH</span><h2>Understand before memorizing.</h2><p>I want to build a clear foundation, learn to explain ideas precisely, and connect classroom concepts to the built environment.</p></article><article className="info-panel"><span className="panel-kicker">CURRENT PRIORITIES</span><ul><li>Build strong fundamentals in core coursework</li><li>Develop technical drawing and digital skills</li><li>Record progress honestly and consistently</li></ul></article></div>}
    {page === 'academics' && <article className="academic-card"><div className="academic-symbol"><GraduationCap size={28} /></div><div className="academic-details"><p className="project-type">UNDERGRADUATE / ENGINEERING</p><h2>Sir Syed University of Engineering & Technology</h2><p className="academic-location"><MapPin size={15} /> Karachi, Pakistan</p><div className="academic-meta"><span><strong>Degree</strong>BS Civil Engineering</span><span><strong>Stage</strong>First-year / starting</span><span><strong>Academic focus</strong>Structures · Infrastructure · Materials</span></div><p className="academic-note">Official course names and academic milestones will be added from your actual semester information, not guessed.</p></div><span className="academic-index">ACADEMICS / 01</span></article>}
    {page === 'courses' && <><div className="course-callout"><div className="portal-icon"><BookOpen size={23} /></div><div><span className="panel-kicker">SEMESTER COURSEWORK</span><h2>Make this your course dashboard.</h2><p>Each subject can have its own page with a syllabus, notes, formula sheet, assignments, study links, and progress tracker.</p></div></div><div className="section-heading compact-heading"><p className="eyebrow">COURSE WORKSPACE</p><h2>Built around your <em>actual subjects.</em></h2></div><div className="course-feature-grid">{studyTools.filter(x => (x.title + x.detail).toLowerCase().includes(search.toLowerCase())).map(item => <article className="focus-card course-feature" key={item.title}>{item.icon}<h3>{item.title}</h3><p>{item.detail}</p><span className="card-foot">COURSE WORKSPACE</span></article>)}</div><label className="course-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter course workspace features…" /></label><div className="course-pending"><strong>Course list needs your exact subjects.</strong><p>I have not filled this with guessed subjects. Send your first-semester course names or a photo of your timetable, and I’ll add a dedicated page/card for each course.</p></div></>}
    {page === 'projects' && <div className="project-list"><article className="project-row"><div className="project-number">01</div><div className="project-art blueprint-art"><span className="blueprint-label">STUDY / 001</span><svg viewBox="0 0 300 150" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M22 118H278M42 118V83H98V118M98 83L120 60H190L214 83V118M120 60V39H190V60M138 39V22H172V39M32 128H268" /></g></svg></div><div className="project-info"><p className="project-type">FOUNDATION / EXERCISE</p><h3>Structural form studies</h3><p>Planned exercise exploring geometry, support, and how simple forms carry loads.</p><span className="status-label">PLANNED — NOT COMPLETED</span></div></article><article className="project-row"><div className="project-number">02</div><div className="project-art grid-art"><span className="blueprint-label">NOTES / 002</span><div className="grid-cube"><span /><span /><span /><span /><span /><span /></div></div><div className="project-info"><p className="project-type">DIGITAL / DOCUMENTATION</p><h3>Engineering field notes</h3><p>A planned collection of concepts, diagrams, definitions, and questions from study.</p><span className="status-label">IN DEVELOPMENT</span></div></article><p className="honesty-note">These are planned portfolio ideas, not claims of completed engineering work. Real work can be added as you produce it.</p></div>}
    {page === 'journal' && <div className="journal-empty"><BookOpen size={28} /><h2>The journal is ready for its first entry.</h2><p>Entries can include a concept explained in your own words, a problem you solved, a question you still have, and the sources you used.</p><a className="button button-primary" href="#/contact">Suggest a topic <ArrowRight size={16} /></a></div>}
    {page === 'contact' && <div className="page-two-col"><article className="info-panel"><span className="panel-kicker">EMAIL</span><h2>Let’s connect.</h2><p>For student collaboration, learning resources, or a thoughtful exchange about engineering.</p><a className="button button-primary" href="mailto:imashalweb@gmail.com">imashalweb@gmail.com <ArrowRight size={16} /></a></article><article className="info-panel social-panel"><span className="panel-kicker">ELSEWHERE</span><a href="https://github.com/mashal-web" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ExternalLink size={14} /></a><a href="https://linkedin.com/in/mashalweb" target="_blank" rel="noreferrer"><ArrowRight size={17} /> LinkedIn <ExternalLink size={14} /></a><a href="https://x.com/mashalweb" target="_blank" rel="noreferrer"><ArrowRight size={17} /> X / Twitter <ExternalLink size={14} /></a></article></div>}
  </section>
}
export default function AdvancedApp() {
  const [current, setCurrent] = useState<Page>(getPage)
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('mk-theme')
    return saved === 'light' || saved === 'dark' ? saved : 'dark'
  })
  useEffect(() => {
    const update = () => { setCurrent(getPage()); window.scrollTo({ top: 0, behavior: 'smooth' }) }
    window.addEventListener('hashchange', update)
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101820' : '#f2f3f0')
    localStorage.setItem('mk-theme', theme)
    return () => window.removeEventListener('hashchange', update)
  }, [theme])
  const title = useMemo(() => current === 'home' ? 'Mashal Khan — Civil Engineering Student' : `${pageCopy[current as Exclude<Page, 'home'>].eyebrow} — Mashal Khan`, [current])
  useEffect(() => { document.title = title }, [title])
  return <div className="site-shell"><SiteHeader current={current} theme={theme} setTheme={setTheme} /><main>{current === 'home' ? <HomePage /> : <DetailPage page={current} />}</main><footer className="footer section-wrap"><a className="brand" href="#/home"><span className="brand-mark"><Building2 size={16} /></span><span className="brand-name">MK<span>.</span></span></a><p>Made to document the learning, not pretend to have finished it.</p><span>© {new Date().getFullYear()} MASHAL KHAN</span></footer></div>
}
