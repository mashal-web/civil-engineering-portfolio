import { useState } from 'react'
import { BookOpen, CheckCircle2, ChevronDown, Download, FileText, GraduationCap, Printer, Ruler, Wrench, X } from 'lucide-react'
import './portfolio-extras.css'

type JournalEntry = { title: string; category: string; summary: string; body: string[] }
const journalEntries: JournalEntry[] = [
  { title: 'How a cable-stayed bridge carries loads', category: 'STRUCTURES / BEGINNER', summary: 'A first look at the relationship between deck, stays, towers, and foundations.', body: ['A cable-stayed bridge supports its deck using inclined cables connected directly to one or more towers. The cables transfer forces from the deck to the towers, while the towers transmit loads toward the foundations.', 'The actual load path is more complex: deck stiffness, cable geometry, tower behaviour, foundation conditions, wind, temperature, and traffic all affect structural response. This overview is conceptual, not a design calculation.', 'Study questions: What changes when the tower height changes? How do dead loads differ from live loads? Why must engineers consider wind and vibration?'] },
  { title: 'Why engineering drawings need clear dimensions', category: 'TECHNICAL DRAWING', summary: 'Dimensions communicate size and position more reliably than visual estimation.', body: ['An engineering drawing is a communication tool. Lines, symbols, views, scales, and dimensions help different people interpret the same component consistently.', 'Dimensions should be readable, unambiguous, and consistent with the drawing standard required by the course or project. A drawing that looks neat but omits critical dimensions is incomplete.', 'Practice: choose a simple object, draw its front, top, and side views, then check that the dimensions needed to make it are present without unnecessary repetition.'] },
  { title: 'A useful way to study technical subjects', category: 'STUDY METHODS', summary: 'Connect definitions, worked examples, independent practice, and error review.', body: ['Start with the definition and units, then work through one explained example. Close the notes and solve a similar problem independently before checking the result.', 'Keep an error log: write what went wrong, why it happened, and what check would catch it next time. This is more useful than simply copying a correct solution.', 'For engineering calculations, check units, signs, assumptions, and whether the answer is physically plausible. These checks complement—not replace—the full solution.'] }
]
const skills = [
  { name: 'Engineering mathematics', stage: 'CURRENT FOUNDATION', note: 'Strengthen algebra, trigonometry, functions, and problem-solving.' },
  { name: 'Engineering drawing', stage: 'CURRENT COURSEWORK', note: 'Practise projection, dimensioning, line conventions, and neat technical sheets.' },
  { name: 'AutoCAD fundamentals', stage: 'NEXT TO LEARN', note: 'Begin with layers, coordinates, precise geometry, dimensions, and plotting.' },
  { name: 'Surveying fundamentals', stage: 'FUTURE LEARNING', note: 'Learn measurement principles, levelling, bearings, and field-book practice.' },
  { name: 'Structural analysis', stage: 'FUTURE LEARNING', note: 'Build prerequisite knowledge before studying loads, reactions, and internal forces.' },
  { name: 'Programming for civil engineering', stage: 'OPTIONAL EXTENSION', note: 'Use Python later for calculations, data handling, and repetitive workflows.' }
]
const initialTasks = [
  { id: 'notes', label: 'Organize lecture notes for the seven current courses' },
  { id: 'drawing', label: 'Upload a first engineering drawing exercise' },
  { id: 'project', label: 'Document one real practice project with process and result' },
  { id: 'journal', label: 'Write and reference a technical journal entry' },
  { id: 'cad', label: 'Complete an introductory CAD exercise' }
]
export default function PortfolioExtras() {
  const [tasks, setTasks] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('mk-portfolio-tasks') || '[]') as string[] } catch { return [] } })
  const [openProject, setOpenProject] = useState<number | null>(null)
  const [article, setArticle] = useState<JournalEntry | null>(null)
  const [completedSkills, setCompletedSkills] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('mk-portfolio-skills') || '[]') as string[] } catch { return [] } })
  const toggleTask = (id: string) => setTasks(old => { const next = old.includes(id) ? old.filter(x => x !== id) : [...old, id]; localStorage.setItem('mk-portfolio-tasks', JSON.stringify(next)); return next })
  const toggleSkill = (name: string) => setCompletedSkills(old => { const next = old.includes(name) ? old.filter(x => x !== name) : [...old, name]; localStorage.setItem('mk-portfolio-skills', JSON.stringify(next)); return next })
  const downloadCV = () => {
    const cv = `Mashal Khan | Civil Engineering Student\nSir Syed University of Engineering & Technology (SSUET), Karachi, Pakistan\n\nPROFILE\nFirst-year civil engineering student documenting coursework, technical drawing practice, and foundational engineering learning.\n\nCURRENT COURSEWORK\nAP & EM; Eng Mat; IslSt; Func Eng; Q Res; Eng Drawing; Foundation Mathematics.\n\nINTERESTS\nStructural systems, infrastructure, technical drawing, and digital tools for engineering.\n\nPORTFOLIO\nhttps://mashal-web.github.io/civil-engineering-portfolio/\nGitHub: https://github.com/mashal-web\n\nNote: Add verified dates, contact details, and completed work before using this draft for applications.`
    const blob = new Blob([cv], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = 'Mashal-Khan-CV-draft.txt'; link.click()
    URL.revokeObjectURL(url)
  }
  return <div className="portfolio-extras">
    <section className="extra-section" id="student-dashboard">
      <div className="extra-heading"><div><p className="eyebrow">05 / PERSONAL PROGRESS</p><h2>Student <em>dashboard.</em></h2><p className="extra-intro">A private-to-this-browser checklist for the next steps in your learning. Progress is stored locally on this device.</p></div><GraduationCap size={27} /></div>
      <div className="dashboard-layout">
        <div className="dashboard-card"><div className="dashboard-card-top"><span className="panel-kicker">PORTFOLIO CHECKLIST</span><strong>{tasks.length}/{initialTasks.length}</strong></div><div className="progress-track"><span className={`progress-fill progress-${tasks.length}`} /></div><p className="dashboard-caption">Complete a task when you have actually done it.</p>{initialTasks.map(task => <label className="dashboard-task" key={task.id}><input type="checkbox" checked={tasks.includes(task.id)} onChange={() => toggleTask(task.id)} /><span>{task.label}</span></label>)}</div>
        <div className="dashboard-card dashboard-facts"><span className="panel-kicker">CURRENT ACADEMIC PROFILE</span><div><small>UNIVERSITY</small><strong>SSUET · Karachi</strong></div><div><small>PROGRAM</small><strong>BS Civil Engineering</strong></div><div><small>STAGE</small><strong>First-year / starting</strong></div><div><small>COURSES LISTED</small><strong>7 subjects</strong></div><p>Grades, semester dates, and official milestones are intentionally omitted until verified details are available.</p></div>
      </div>
    </section>
    <section className="extra-section" id="skills-roadmap">
      <div className="extra-heading"><div><p className="eyebrow">06 / DEVELOPMENT PLAN</p><h2>Skills & learning <em>roadmap.</em></h2><p className="extra-intro">Mark an item only after you have practised it. Planned skills are not presented as existing expertise.</p></div><Ruler size={27} /></div>
      <div className="roadmap-list">{skills.map((skill, i) => <article className="roadmap-item" key={skill.name}><span className="roadmap-number">0{i + 1}</span><div className="roadmap-content"><span className="panel-kicker">{skill.stage}</span><h3>{skill.name}</h3><p>{skill.note}</p></div><button className={completedSkills.includes(skill.name) ? 'roadmap-check is-done' : 'roadmap-check'} onClick={() => toggleSkill(skill.name)} aria-label={completedSkills.includes(skill.name) ? `Mark ${skill.name} not complete` : `Mark ${skill.name} complete'}>{completedSkills.includes(skill.name) ? <CheckCircle2 size={20} /> : <span />}</button></article>)}</div>
    </section>
    <section className="extra-section" id="project-case-studies">
      <div className="extra-heading"><div><p className="eyebrow">07 / WORK IN CONTEXT</p><h2>Project <em>case studies.</em></h2><p className="extra-intro">Starter case-study templates. Replace these with real work and original evidence as you complete it.</p></div><Wrench size={27} /></div>
      <div className="case-grid">{[
        { title: 'Structural form study', type: 'PRACTICE TEMPLATE', summary: 'Explore a simple structural form and describe its load path.', steps: ['Objective: identify supports and the path loads follow.', 'Evidence to add: your own labelled sketch or model.', 'Analysis to add: assumptions, forces considered, and limitations.', 'Reflection: what changed after feedback or checking?'] },
        { title: 'Engineering drawing exercise', type: 'COURSEWORK TEMPLATE', summary: 'Record the process behind a technical drawing sheet.', steps: ['Objective: communicate an object through suitable orthographic views.', 'Evidence to add: original drawing sheet and dimensions.', 'Checks: projection alignment, line types, scale, and dimension clarity.', 'Reflection: note corrections made after reviewing the drawing.'] },
        { title: 'Digital engineering tool', type: 'PERSONAL PROJECT TEMPLATE', summary: 'Document a small tool or workflow that helps with a study task.', steps: ['Objective: state the problem the tool is intended to solve.', 'Method: describe inputs, assumptions, and calculation steps.', 'Verification: test against a hand-worked example.', 'Limitations: explain what the tool does not yet support.'] }
      ].map((p, i) => <article className="case-card" key={p.title}><span className="case-index">CASE / 0{i + 1}</span><span className="panel-kicker">{p.type}</span><h3>{p.title}</h3><p>{p.summary}</p><button className="case-expand" onClick={() => setOpenProject(openProject === i ? null : i)} aria-expanded={openProject === i}>{openProject === i ? 'Hide case-study structure' : 'Open case-study structure'} <ChevronDown size={16} /></button>{openProject === i && <div className="case-details"><ol>{p.steps.map(step => <li key={step}>{step}</li>)}</ol><p className="dashboard-caption">Template only — no completed project or results are claimed.</p></div>}</article>)}</div>
    </section>
    <section className="extra-section" id="engineering-journal">
      <div className="extra-heading"><div><p className="eyebrow">08 / NOTES & EXPLANATIONS</p><h2>Engineering <em>journal.</em></h2><p className="extra-intro">Open an entry to read it in full. These are introductory notes, not engineering design advice.</p></div><BookOpen size={27} /></div>
      <div className="journal-card-grid">{journalEntries.map(entry => <button className="journal-entry-card" key={entry.title} onClick={() => setArticle(entry)}><span className="panel-kicker">{entry.category}</span><h3>{entry.title}</h3><p>{entry.summary}</p><span className="journal-read">Read article <span>↗</span></span></button>)}</div>
    </section>
    <section className="extra-section export-section" id="portfolio-export">
      <div><p className="eyebrow">09 / APPLICATION READY</p><h2>Take your work <em>with you.</em></h2><p className="extra-intro">Export a starter CV draft or print/save the current portfolio as PDF from your browser. Review every detail before sending it to an employer or university.</p></div>
      <div className="export-actions"><button className="button button-primary" onClick={downloadCV}><Download size={16} /> Download CV draft (.txt)</button><button className="button export-secondary" onClick={() => window.print()}><Printer size={16} /> Print / save portfolio PDF</button><a className="button export-secondary" href="https://github.com/mashal-web/civil-engineering-portfolio" target="_blank" rel="noreferrer"><FileText size={16} /> View source repository</a></div>
    </section>
    {article && <div className="journal-modal-backdrop" role="presentation" onClick={() => setArticle(null)}><article className="journal-modal" role="dialog" aria-modal="true" aria-label={article.title} onClick={e => e.stopPropagation()}><button className="journal-modal-close" onClick={() => setArticle(null)} aria-label="Close article"><X size={20} /></button><span className="panel-kicker">{article.category}</span><h2>{article.title}</h2><p className="journal-modal-summary">{article.summary}</p>{article.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}<p className="journal-source-note">Learning note for personal study. Verify course requirements and consult authoritative references before applying engineering concepts to real structures.</p><button className="button button-primary" onClick={() => setArticle(null)}>Close article</button></article></div>}
  </div>
}
