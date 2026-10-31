(() => {
'use strict';
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const page=document.body.dataset.page||'index';
const iconPaths={
home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
graduation:'<path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c4 3 8 3 12 0v-5"/><path d="M22 10v6"/>',
book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
layers:'<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
notebook:'<path d="M4 4h16v16H4z"/><path d="M8 2v4M16 2v4M8 10h8M8 14h5"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
moon:'<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
close:'<path d="m18 6-12 12M6 6l12 12"/>',
arrow:'<path d="M7 17 17 7M7 7h10v10"/>',
bridge:'<path d="M3 19h18M5 19V8m14 11V8M5 8l7-4 7 4M5 11h14"/><path d="m7 11 2 8m8-8-2 8m-3-8v8"/>',
compass:'<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.8 6.4-6.4 2.8 2.8-6.4 6.4-2.8Z"/>',
github:'<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',

ruler:'<path d="m21.3 8.7-6-6a2.4 2.4 0 0 0-3.4 0L2.7 12a2.4 2.4 0 0 0 0 3.4l5.9 5.9a2.4 2.4 0 0 0 3.4 0l9.3-9.3a2.4 2.4 0 0 0 0-3.3Z"/><path d="m7.5 10.5 2 2m1-5 2 2m1-5 2 2m-1 8 2 2"/>',
calculator:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
printer:'<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
external:'<path d="M14 3h7v7M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>',
check:'<path d="m5 12 4 4L19 6"/>',
cube:'<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 7 9 5 9-5M3 7v10l9 5 9-5V7M12 12v10"/>',
network:'<circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="m10.5 7.5-4 9m7-9 4 9M8 19h8"/>',
layers3:'<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',

};
function ico(name,cls='ui-icon'){return '<svg class="'+cls+'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(iconPaths[name]||iconPaths.compass)+'</svg>';}

const get=k=>{try{return localStorage.getItem(k)}catch(e){return null}},set=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const nav=[['index.html','Home','index','home'],['about.html','About','about','user'],['academics.html','Academics','academics','graduation'],['courses.html','Courses','courses','book'],['projects.html','Projects','projects','layers'],['journal.html','Journal','journal','notebook'],['contact.html','Contact','contact','mail']];
const courses=[['01','AP & EM','SCIENCE / ENGINEERING','Lectures, worked problems, and revision material.','ap-em'],['02','Engineering Materials','ENGINEERING','Material properties, lecture summaries, class examples, and revision notes.','engineering-materials'],['03','IslSt','GENERAL EDUCATION','Lecture notes, key topics, readings, and exam preparation.','islst'],['04','Func Eng','LANGUAGE / COMMUNICATION','Grammar notes, writing tasks, vocabulary, and presentations.','func-eng'],['05','Quantitative Reasoning','QUANTITATIVE SKILLS','Reasoning methods, solved questions, practice sets, and revision.','quantitative-reasoning'],['06','Eng Drawing','TECHNICAL DRAWING','Drawing sheets, projections, dimensioning rules, and exercises.','eng-drawing'],['07','Foundation Mathematics','MATHEMATICS','Foundational concepts, worked examples, formulas, and practice.','foundation-mathematics']];
const head='<header class="topbar"><a class="brand" href="index.html"><span class="brand-mark">MK</span><span class="brand-name">MASHAL KHAN<span>.</span></span></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">'+ico('menu')+'</button><nav class="nav-links">'+nav.map(n=>'<a href="'+n[0]+'" '+(page===n[2]?'class="active" aria-current="page"':'')+'>'+ico(n[3],'nav-icon')+'<span>'+n[1]+'</span></a>').join('')+'</nav><div class="top-actions"><span class="availability">● STUDENT / LEARNING</span><button class="theme-toggle" aria-label="Switch theme">'+ico('sun')+'</button></div></header>';
const foot='<footer class="footer wrap"><a class="brand" href="index.html"><span class="brand-mark">MK</span><span class="brand-name">MASHAL KHAN<span>.</span></span></a><p>Documenting the learning, not pretending to have finished it.</p><span>© <b class="year"></b> MASHAL KHAN</span></footer>';
const courseCards=courses.map(c=>'<article class="course-card" id="'+c[4]+'" data-search="'+(c[1]+' '+c[2]+' '+c[3]).toLowerCase()+'"><button class="course-card-button" aria-expanded="false"><span class="course-card-top"><i>'+c[0]+'</i><small>COURSE / '+c[0]+'</small></span><span class="course-category">'+c[2]+'</span><strong class="course-name">'+c[1]+'</strong><span class="course-description">'+c[3]+'</span><span class="course-open">Open workspace →</span></button><div class="course-workspace" hidden><p class="panel-kicker">STUDY CHECKLIST</p><label><input type="checkbox" data-course-task="'+c[4]+'-notes"> Organize lecture notes</label><label><input type="checkbox" data-course-task="'+c[4]+'-practice"> Complete practice questions</label><label><input type="checkbox" data-course-task="'+c[4]+'-revision"> Prepare a revision sheet</label><p class="small-note">Add actual course notes and lecturer-provided resources here; no official syllabus has been invented.</p></div></article>').join('');
const roadmap=[['math','Mathematics & physics','Units, vectors, equations, mechanics, and problem-solving.'],['drawing','Technical drawing','Orthographic views, dimensions, sections, and neat sheets.'],['materials','Materials & structures','Material properties, load paths, supports, and structural forms.'],['digital','Digital tools','Build practical confidence with CAD and simple programming.'],['portfolio','Document real work','Publish examples with process, sources, and honest limitations.']];
function extras(){return '<section class="section alt"><div class="wrap"><p class="eyebrow">PERSONAL DASHBOARD</p><h2>Small steps, <em>visible progress.</em></h2><p class="muted">Checklist progress is saved in this browser on this device.</p><div class="dashboard-card"><p class="panel-kicker">WEEKLY CHECKLIST</p>'+[['review','Review lecture notes'],['practice','Practice one problem'],['drawing','Work on a drawing'],['journal','Write a journal note']].map(t=>'<label class="task"><input type="checkbox" data-task="'+t[0]+'"><span>'+t[1]+'</span></label>').join('')+'<div class="progress"><span id="task-progress"></span></div><p id="task-label" class="small-note">0% complete</p><button id="reset-tasks" class="text-button">Reset checklist</button></div><p class="eyebrow gap-top">LEARNING ROADMAP</p><h2>Build the foundation <em>before the skyline.</em></h2><div class="roadmap">'+roadmap.map((r,i)=>'<label class="task"><input type="checkbox" data-roadmap="'+r[0]+'"><span><b>0'+(i+1)+' · '+r[1]+'</b><small>'+r[2]+'</small></span></label>').join('')+'</div><p id="road-label" class="small-note">0 of 5 milestones checked</p><div class="progress"><span id="road-progress"></span></div></div></section><section class="section wrap export"><div><p class="eyebrow">PORTABLE PROFILE</p><h2>Keep your work <em>ready to share.</em></h2><p class="muted">Download a basic text profile or print/save this website as a PDF.</p></div><div class="dashboard-card"><p class="panel-kicker">MASHAL KHAN / STUDENT PROFILE</p><h3>Civil Engineering Student</h3><p class="muted">Sir Syed University of Engineering & Technology · Karachi, Pakistan</p><button class="button primary" id="download-cv">Download profile .txt ↓</button> <button class="button" id="print-cv">Print / Save PDF ↗</button></div></section>'}
const data={
index:'<section class="hero wrap"><div><p class="eyebrow">CIVIL ENGINEERING / STUDENT PORTFOLIO</p><h1>Building an eye<br>for <em>what holds.</em></h1><p class="lede">I’m Mashal Khan — a civil engineering student at the beginning of the journey, exploring the principles behind structures, spaces, and the built world.</p><a class="button primary" href="projects.html">Explore student work ↗</a> <a class="text-link" href="about.html">A little about me ↘</a><p class="meta">LEARNING IN PUBLIC · KARACHI, PAKISTAN</p></div><div class="hero-art"><span>FIG. 001 / CONCEPT STRUCTURE</span><svg viewBox="0 0 620 360" role="img" aria-label="Cable-stayed bridge technical drawing"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M35 285H585M70 270H550M220 270V55L202 270M220 55L240 270M420 270V90L400 270M420 90L440 270"/><path d="M220 60L70 270M220 85L110 270M220 110L150 270M220 135L190 270M220 160L230 270M220 185L270 270M220 210L310 270M420 100L300 270M420 130L340 270M420 160L380 270M420 190L420 270M420 220L500 270" opacity=".75"/><path d="M80 305H540M100 320H520" stroke-dasharray="3 7"/></g><g fill="currentColor" font-family="monospace" font-size="12"><text x="250" y="48">TOWER A</text><text x="450" y="80">TOWER B</text><text x="65" y="260">DECK LEVEL</text><text x="70" y="345">KARACHI / STRUCTURAL STUDY 01</text></g></svg><small>LOAD · FORM · CONTEXT — NOT TO SCALE</small></div></section><section class="section wrap"><p class="eyebrow">START HERE</p><h2>A portfolio that grows<br><em>with the student.</em></h2><div class="cards four"><a class="card" href="courses.html"><b>01 / STUDY</b><h3>Course hub</h3><p>Seven subjects, notes, formulas, and useful links.</p>Open courses ↗</a><a class="card" href="academics.html"><b>02 / UNIVERSITY</b><h3>Academic record</h3><p>University information and verified milestones.</p>View academics ↗</a><a class="card" href="projects.html"><b>03 / BUILD</b><h3>Projects & practice</h3><p>Student work and exercises, described honestly.</p>Browse work ↗</a><a class="card" href="journal.html"><b>04 / REFLECT</b><h3>Learning journal</h3><p>Concepts, questions, and lessons worth revisiting.</p>Read journal ↗</a></div></section>'+extras(),
about:'<section class="page-hero wrap"><p class="eyebrow">01 / THE PERSON</p><h1>Curiosity with a <em>practical purpose.</em></h1><p class="lede">I’m Mashal Khan, an early-stage civil engineering student learning how mathematics, materials, and design become the structures and infrastructure around us.</p></section><section class="section wrap cards two"><article class="card"><p class="eyebrow">MY APPROACH</p><h2>Understand before memorizing.</h2><p>I want to build a clear foundation, explain ideas precisely, and connect classroom concepts to the built environment. This portfolio records coursework, questions, practice, and work that can be shown honestly.</p></article><article class="card"><p class="eyebrow">CURRENT PRIORITIES</p><ul><li>Build strong fundamentals in core coursework.</li><li>Develop technical drawing and digital skills.</li><li>Record progress honestly and consistently.</li><li>Learn to explain engineering ideas clearly.</li></ul></article></section>',
academics:'<section class="page-hero wrap"><p class="eyebrow">02 / UNIVERSITY</p><h1>The academic <em>foundation.</em></h1><p class="lede">A record of my university journey, academic direction, and milestones as I progress through civil engineering.</p></section><section class="section wrap"><article class="card academic"><p class="eyebrow">UNDERGRADUATE / ENGINEERING</p><h2>Sir Syed University of Engineering & Technology</h2><p>Karachi, Sindh, Pakistan</p><div class="facts"><div><b>DEGREE</b>BS Civil Engineering</div><div><b>ACADEMIC STAGE</b>First-year / starting</div><div><b>FOCUS</b>Structures · Infrastructure · Materials</div></div><p class="small-note">GPA, semester dates, grades, and achievements are omitted until verified.</p></article><section class="section"><p class="eyebrow">CURRENT SEMESTER</p><h2>Seven courses. One foundation.</h2><div class="cards three">'+courses.map(c=>'<a class="card" href="courses.html#'+c[4]+'"><b>'+c[0]+'</b><h3>'+c[1]+'</h3><p>'+c[2]+'</p></a>').join('')+'</div></section></section>',
courses:'<section class="page-hero wrap"><p class="eyebrow">03 / CURRENT STUDIES</p><h1>One subject <em>at a time.</em></h1><p class="lede">Seven course workspaces for lecture notes, formulas, assignments, and revision. Add actual class material as you receive it.</p></section><section class="section wrap"><div class="course-callout"><p class="eyebrow">YOUR 7 CURRENT COURSES</p><h2>One dashboard. Seven subjects.</h2><p class="muted">Search by name or topic. Open a subject to access its study checklist; progress is saved in this browser.</p></div><input id="course-search" class="search" type="search" placeholder="Search your seven courses…" aria-label="Search courses"><div class="cards two" id="course-list">'+courseCards+'</div><p class="small-note">These workspaces contain no invented official syllabi, grades, or lecture content.</p></section>',
projects:`<section class="page-hero wrap project-hero"><div><p class="eyebrow">04 / ENGINEERING STUDIO</p><h1>Model the idea.<br><em>Test the thinking.</em></h1><p class="lede">An evolving collection of civil-engineering experiments, visual studies, and tools built while learning the fundamentals.</p><div class="project-hero-meta"><span><i class="pulse-dot"></i> STUDENT WORKSPACE</span><span>SSUET / KARACHI</span><span>EDUCATIONAL MODELS</span></div></div><div class="project-hero-mark" aria-hidden="true"><div class="hero-ring ring-one"></div><div class="hero-ring ring-two"></div><svg viewBox="0 0 280 230"><g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M15 180H265M32 171V70M248 171V70M32 70L140 22 248 70M32 70L140 171 248 70M140 22V171M32 70L78 171M248 70L202 171M32 70L202 171M248 70L78 171" opacity=".8"/><path d="M20 194H260M34 201H246" stroke-dasharray="3 5" opacity=".45"/><path d="M20 40H260M20 36V44M260 36V44M140 12V214" stroke-dasharray="2 6" opacity=".35"/></g><g fill="currentColor" font-family="monospace" font-size="8"><text x="38" y="61">TOWER A</text><text x="204" y="61">TOWER B</text><text x="148" y="17">Z</text><text x="25" y="216">FIG. 04 / FORM STUDY</text></g></svg></div></section><section class="section wrap engineering-workbench"><div class="section-heading"><div><p class="eyebrow">LIVE EXPERIMENT / 001</p><h2>Beam reaction <em>workbench.</em></h2><p class="muted">Change the span, load, and load position. The diagram and equilibrium results update immediately.</p></div><span class="lab-live"><i class="pulse-dot"></i> LIVE MODEL</span></div><div class="workbench-grid"><div class="beam-visual-panel"><div class="panel-topline"><span>SIMPLY SUPPORTED BEAM</span><span>SCHEMATIC / NOT TO SCALE</span></div><div class="beam-scene" id="beam-scene"><svg id="beam-diagram" viewBox="0 0 760 300" role="img" aria-label="Beam diagram showing a point load and support reactions"><defs><linearGradient id="beamGlow" x1="0" x2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".35"/><stop offset=".5" stop-color="currentColor"/><stop offset="1" stop-color="currentColor" stop-opacity=".35"/></linearGradient><marker id="loadArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#ff8d65"/></marker><marker id="reactionArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 8L4 0L8 8Z" fill="#64e0bb"/></marker></defs><g stroke="currentColor" stroke-width="1" opacity=".13"><path d="M40 50H720M40 100H720M40 150H720M40 200H720M40 250H720"/><path d="M80 25V270M160 25V270M240 25V270M320 25V270M400 25V270M480 25V270M560 25V270M640 25V270"/></g><g id="beam-supports"><path d="M95 148L78 177H112Z M665 148L648 177H682Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M68 182H122M638 182H692" stroke="currentColor" stroke-width="2"/></g><path id="beam-member" d="M95 148H665" stroke="url(#beamGlow)" stroke-width="8" stroke-linecap="round"/><path id="beam-load-arrow" d="M380 48V126" stroke="#ff8d65" stroke-width="3" marker-end="url(#loadArrow)"/><text id="beam-load-label" x="380" y="35" fill="#ff8d65" text-anchor="middle" font-size="14" font-family="monospace">12.0 kN</text><path id="beam-left-reaction" d="M95 225V190" stroke="#64e0bb" stroke-width="3" marker-end="url(#reactionArrow)"/><path id="beam-right-reaction" d="M665 225V190" stroke="#64e0bb" stroke-width="3" marker-end="url(#reactionArrow)"/><text id="beam-left-label" x="95" y="244" fill="#64e0bb" text-anchor="middle" font-size="12" font-family="monospace">RA 6.0</text><text id="beam-right-label" x="665" y="244" fill="#64e0bb" text-anchor="middle" font-size="12" font-family="monospace">RB 6.0</text><path d="M95 270V280M665 270V280M95 275H665" stroke="currentColor" stroke-width="1" opacity=".65"/><text id="beam-span-label" x="380" y="294" fill="currentColor" text-anchor="middle" font-size="12" font-family="monospace">SPAN = 6.0 m</text><text id="beam-position-label" x="380" y="126" fill="currentColor" text-anchor="middle" font-size="10" font-family="monospace" opacity=".7">a = 3.0 m</text></svg></div><div class="diagram-legend"><span><i class="legend-load"></i> Applied load</span><span><i class="legend-reaction"></i> Support reactions</span><span>Static equilibrium / 2D</span></div><div class="equation-strip"><div><small>VERTICAL EQUILIBRIUM</small><b>Rₐ + Rᵦ = P</b></div><div><small>MOMENT ABOUT A</small><b>Rᵦ × L = P × a</b></div></div></div><aside class="beam-controls"><div class="control-header"><span class="control-index">01</span><div><b>Model parameters</b><small>Use positive values</small></div></div><label class="range-control"><span>Beam span <b id="studio-span-value">6.0 m</b></span><input id="studio-span" type="range" min="2" max="20" step=".5" value="6"><span class="range-limits"><small>2 m</small><small>20 m</small></span></label><label class="range-control"><span>Point load <b id="studio-load-value">12.0 kN</b></span><input id="studio-load" type="range" min="0" max="100" step="1" value="12"><span class="range-limits"><small>0 kN</small><small>100 kN</small></span></label><label class="range-control"><span>Load position <b id="studio-position-value">50%</b></span><input id="studio-position" type="range" min="0" max="100" step="1" value="50"><span class="range-limits"><small>At A</small><small>At B</small></span></label><div class="reaction-results"><div><small>LEFT REACTION / Rₐ</small><b id="studio-ra">6.00 <small>kN</small></b></div><div><small>RIGHT REACTION / Rᵦ</small><b id="studio-rb">6.00 <small>kN</small></b></div><div class="result-wide"><small>EQUILIBRIUM CHECK</small><b id="studio-check">Rₐ + Rᵦ = 12.00 kN</b><span id="studio-check-state">Balanced for the stated idealized model.</span></div></div><button type="button" class="button primary studio-reset" id="studio-reset">Reset model ↺</button></aside></div><p class="engineering-caveat">Model assumptions: ideal simply supported beam, one vertical point load, static equilibrium, negligible self-weight. This calculates reactions only; it does not calculate shear-force diagrams, bending stress, deflection, or safe capacity.</p></section><section class="section wrap project-library"><div class="section-heading"><div><p class="eyebrow">PROJECT ARCHIVE / 002—006</p><h2>Work in <em>progress.</em></h2><p class="muted">Filter by discipline. Prototype labels distinguish working tools from study concepts still being developed.</p></div><div class="project-count"><b id="project-visible-count">5</b><span>PROJECTS</span></div></div><div class="project-filters" role="group" aria-label="Filter projects"><button class="project-filter active" data-filter="all" aria-pressed="true">All work <span>05</span></button><button class="project-filter" data-filter="structures" aria-pressed="false">Structures</button><button class="project-filter" data-filter="tools" aria-pressed="false">Digital tools</button><button class="project-filter" data-filter="drawing" aria-pressed="false">Drawing</button><button class="project-filter" data-filter="research" aria-pressed="false">Research notes</button></div><div class="project-grid project-grid-advanced"><article class="card project-card project-feature" data-category="structures"><div class="project-illustration" aria-hidden="true"><svg viewBox="0 0 240 100"><path d="M18 76H222M32 70V34M208 70V34M32 34L120 12 208 34M32 34L75 70M32 34L120 70M120 12L165 70M208 34L165 70M208 34L120 70" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M24 82H216M35 87H205" stroke="currentColor" stroke-dasharray="3 5" opacity=".45"/></svg></div><p class="eyebrow">STRUCTURES / STUDY</p><h3>Structural Form Studies</h3><p>Explore geometry, support conditions, and qualitative load paths through structural sketches.</p><span class="status">STUDY CONCEPT</span><button class="text-button project-detail" data-project="structure">Open study brief ↗</button></article><article class="card project-card" data-category="research"><div class="project-illustration" aria-hidden="true"><svg viewBox="0 0 240 100"><rect x="65" y="10" width="110" height="80" rx="2" fill="none" stroke="currentColor"/><path d="M85 28H155M85 40H155M85 52H145M85 64H155M85 76H130M75 10V90" stroke="currentColor" opacity=".65"/></svg></div><p class="eyebrow">DOCUMENTATION / SYSTEM</p><h3>Engineering Field Notes</h3><p>A structured record for concepts, worked examples, sources, and questions to revisit.</p><span class="status">IN DEVELOPMENT</span><button class="text-button project-detail" data-project="notes">Open workflow ↗</button></article><article class="card project-card" data-category="tools"><div class="project-illustration" aria-hidden="true"><svg viewBox="0 0 240 100"><rect x="85" y="7" width="70" height="86" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="96" y="18" width="48" height="20" fill="none" stroke="currentColor"/><path d="M98 49H110M118 49H130M138 49H148M98 60H110M118 60H130M138 60H148M98 71H110M118 71H130M138 71H148M98 82H110M118 82H130M138 82H148" stroke="currentColor" stroke-width="3"/></svg></div><p class="eyebrow">SOFTWARE / INTERFACE</p><h3>APEX Scientific Calculator</h3><p>A calculator-interface project focused on mathematical workflows and responsive controls.</p><span class="status">DEMO / IN PROGRESS</span><a class="text-button project-link" href="https://github.com/mashal-web/calc" target="_blank" rel="noreferrer">Open repository ↗</a></article><article class="card project-card" data-category="drawing"><div class="project-illustration" aria-hidden="true"><svg viewBox="0 0 240 100"><path d="M28 20H212V78H28ZM28 20L120 5 212 20M28 78L120 63 212 78M120 5V63M28 20L120 63M212 20L120 63" fill="none" stroke="currentColor"/><path d="M18 90H222M18 86V94M222 86V94" stroke="currentColor" stroke-dasharray="3 4"/></svg></div><p class="eyebrow">TECHNICAL DRAWING / PRACTICE</p><h3>Orthographic Drawing Explorer</h3><p>Study front, top, and side views and keep corresponding dimensions consistent.</p><span class="status">PRACTICE CONCEPT</span><button class="text-button project-detail" data-project="drawing">Open drawing brief ↗</button></article><article class="card project-card" data-category="tools"><div class="project-illustration" aria-hidden="true"><svg viewBox="0 0 240 100"><path d="M32 20H208V78H32ZM32 20L208 78M208 20L32 78" fill="none" stroke="currentColor" opacity=".6"/><path d="M32 88H208M32 84V92M208 84V92M218 20V78M214 20H222M214 78H222" stroke="currentColor"/></svg></div><p class="eyebrow">QUANTITY / ESTIMATION</p><h3>Concrete Volume Estimator</h3><p>Estimate rectangular element volume with clear units and a simple input workflow.</p><form class="mini-calculator" id="concrete-form"><div class="dimension-fields"><label>Length (m)<input id="concrete-length" type="number" min="0" step="any" value="4" required></label><label>Width (m)<input id="concrete-width" type="number" min="0" step="any" value="2" required></label><label>Depth (m)<input id="concrete-depth" type="number" min="0" step="any" value="0.15" required></label></div><button class="button primary" type="submit">Calculate volume</button><output id="concrete-result" class="calculator-result" aria-live="polite">Volume result appears here.</output></form><span class="status">WORKING PROTOTYPE</span></article></div><p class="small-note">Project maturity is stated openly: a study concept is not a completed design. Tools are intended for learning and should be independently checked before use in any real project.</p></section><div class="modal-backdrop" id="project-modal" hidden><article class="modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><button class="modal-close" aria-label="Close case study">×</button><p class="eyebrow" id="project-kicker">CASE STUDY</p><h2 id="project-title"></h2><div id="project-body"></div></article></div>`,
journal:'<section class="page-hero wrap"><p class="eyebrow">05 / LEARNING LOG</p><h1>Keep a record of <em>the questions.</em></h1><p class="lede">Short explanations and concepts worth revisiting. Open an entry to read the full beginner-level note.</p></section><section class="section wrap cards three"><button class="card journal-open" data-entry="bridge"><b>NOTE / 001 · STRUCTURES</b><h2>How a cable-stayed bridge carries loads</h2><p>A first look at the deck, stays, towers, and foundations.</p><span>Read entry ↗</span></button><button class="card journal-open" data-entry="drawing"><b>NOTE / 002 · DRAWING</b><h2>Why drawings need clear dimensions</h2><p>Dimensions communicate size more reliably than visual estimation.</p><span>Read entry ↗</span></button><button class="card journal-open" data-entry="study"><b>NOTE / 003 · STUDY</b><h2>A useful way to study technical subjects</h2><p>Connect definitions, worked examples, independent practice, and review.</p><span>Read entry ↗</span></button><p class="small-note">Introductory learning notes, not engineering design guidance. Verify details against course material and reliable references.</p></section><div class="modal-backdrop" id="journal-modal" hidden><article class="modal" role="dialog" aria-modal="true"><button class="modal-close">×</button><p class="eyebrow" id="journal-kicker"></p><h2 id="journal-title"></h2><div id="journal-body"></div><p class="small-note">Conceptual study note only; not a design calculation.</p></article></div>',
contact:'<section class="page-hero wrap"><p class="eyebrow">06 / CONTACT</p><h1>Good work starts with <em>a conversation.</em></h1><p class="lede">For student collaboration, learning resources, or a thoughtful exchange about engineering and education.</p></section><section class="section wrap cards two"><article class="card"><p class="eyebrow">EMAIL</p><h2>Let’s connect.</h2><p>Include context so it is clear what you want to discuss.</p><a class="button primary" href="mailto:imashalweb@gmail.com">imashalweb@gmail.com ↗</a></article><article class="card"><p class="eyebrow">ELSEWHERE</p><p><a href="https://github.com/mashal-web" target="_blank" rel="noreferrer">GitHub ↗</a></p><p><a href="https://linkedin.com/in/mashalweb" target="_blank" rel="noreferrer">LinkedIn ↗</a></p><p><a href="https://x.com/mashalweb" target="_blank" rel="noreferrer">X / Twitter ↗</a></p><p class="small-note">I am a student building my foundation, not offering professional engineering services.</p></article></section>'
};
$('#site').innerHTML='<div class="site-shell">'+head+'<main>'+data[page]+'</main>'+foot+'</div>';
document.title=({index:'Mashal Khan — Civil Engineering Student',about:'About — Mashal Khan',academics:'Academics — Mashal Khan',courses:'Courses — Mashal Khan',projects:'Projects — Mashal Khan',journal:'Journal — Mashal Khan',contact:'Contact — Mashal Khan'})[page]||'Mashal Khan';
document.documentElement.dataset.theme=get('mk-theme')==='light'?'light':'dark';
$$('.year').forEach(x=>x.textContent=new Date().getFullYear());
$$('.theme-toggle').forEach(b=>{const draw=()=>{b.innerHTML=ico(document.documentElement.dataset.theme==='dark'?'sun':'moon');b.setAttribute('aria-label',document.documentElement.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme')};draw();b.addEventListener('click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';set('mk-theme',document.documentElement.dataset.theme);$$('.theme-toggle').forEach(draw)})});
const menu=$('.menu-toggle'),navEl=$('.nav-links');if(menu)menu.addEventListener('click',()=>{const open=navEl.classList.toggle('is-open');menu.innerHTML=ico(open?'close':'menu');menu.setAttribute('aria-expanded',String(open))});
function checks(sel,key,callback){const boxes=$$(sel);boxes.forEach(b=>{const id=b.dataset.task||b.dataset.roadmap||b.dataset.courseTask;b.checked=get(key+':'+id)==='1';b.addEventListener('change',()=>{set(key+':'+id,b.checked?'1':'0');if(callback)callback()})});return boxes}
const tasks=checks('[data-task]','mk-task',updateTasks);function updateTasks(){const n=tasks.filter(b=>b.checked).length,p=Math.round(n/Math.max(1,tasks.length)*100),f=$('#task-progress'),l=$('#task-label');if(f)f.style.width=p+'%';if(l)l.textContent=p+'% complete'}updateTasks();$('#reset-tasks')?.addEventListener('click',()=>{tasks.forEach(b=>{b.checked=false;set('mk-task:'+b.dataset.task,'0')});updateTasks()});
const road=checks('[data-roadmap]','mk-roadmap',updateRoad);function updateRoad(){const n=road.filter(b=>b.checked).length,f=$('#road-progress'),l=$('#road-label');if(f)f.style.width=(n/Math.max(1,road.length)*100)+'%';if(l)l.textContent=n+' of '+road.length+' milestones checked'}updateRoad();checks('[data-course-task]','mk-course');
$('#course-search')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();$$('.course-card').forEach(c=>c.hidden=!(c.dataset.search+' '+c.textContent).toLowerCase().includes(q))});
$$('.course-card-button').forEach(b=>b.addEventListener('click',()=>{const p=$('.course-workspace',b.closest('.course-card')),open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));p.hidden=!open;$('.course-open',b).textContent=open?'Close workspace ↑':'Open workspace →'}));
const j={bridge:['STRUCTURES / BEGINNER','How a cable-stayed bridge carries loads',['Inclined cables connect the deck directly to towers. They transfer forces from the deck to the towers, which transmit loads toward the foundations.','Actual behaviour also depends on deck stiffness, cable geometry, foundations, wind, temperature, and traffic. This is conceptual, not a design calculation.','Questions: how does tower height matter? How do dead and live loads differ? Why consider wind and vibration?']],drawing:['TECHNICAL DRAWING','Why engineering drawings need clear dimensions',['Drawings use views, symbols, scales, and dimensions to communicate a component consistently.','Dimensions should be readable, unambiguous, and consistent with the required drawing standard. A neat drawing that omits key dimensions is incomplete.','Practice: draw the front, top, and side views of a simple object and check that the necessary dimensions are present.']],study:['STUDY METHODS','A useful way to study technical subjects',['Start with the definition and units, review one worked example, then solve a similar problem independently.','Keep an error log: note whether a mistake came from the concept, setup, arithmetic, units, or reading the question.','A practical cycle is understand, observe an example, attempt a problem, check the reasoning, and explain the method in your own words.']]};
const pj={structure:['STRUCTURES / FOUNDATION','Structural form studies',['Explore how geometry, support conditions, and qualitative load paths affect a simple structural form.','A practice sketch can mark supports, show likely load directions, and explain how forces travel through a beam or frame.','Status: planned exercise. No verified dimensions, material properties, or engineering design are claimed.']],notes:['DOCUMENTATION / WORKFLOW','Engineering field notes',['Create a consistent record for definitions, diagrams, questions, and references collected during study.','A useful note format includes the concept, explanation, example, source, confidence level, and a question to revisit.','Status: in development; entries should be based on actual course material.']],calculator:['SOFTWARE / INTERFACE','APEX Scientific Calculator',['A student software project exploring calculator-style interactions and a responsive interface.','Important testing areas include keyboard and touch input, order of operations, angle modes, error handling, accessibility, and known test cases.','Status: demo / in progress. Do not treat it as a verified replacement for a scientific calculator until its functions are tested.']],drawing:['TECHNICAL DRAWING / PRACTICE','Orthographic drawing explorer',['Study the front, top, and side views of a simple object and compare the shared edges and dimensions.','Practice with a small block-shaped object first. Keep corresponding dimensions aligned between views and clearly label units.','Status: planned exercise; add real drawing sheets and screenshots as they are completed.']]};
function modal(id,entry,kicker,title,body){const m=$(id);if(!m||!entry)return;$(kicker).textContent=entry[0];$(title).textContent=entry[1];$(body).replaceChildren(...entry[2].map(t=>{const p=document.createElement('p');p.textContent=t;return p}));m.hidden=false}
$$('.journal-open').forEach(b=>b.addEventListener('click',()=>modal('#journal-modal',j[b.dataset.entry],'#journal-kicker','#journal-title','#journal-body')));
$$('.project-detail').forEach(b=>b.addEventListener('click',()=>modal('#project-modal',pj[b.dataset.project],'#project-kicker','#project-title','#project-body')));
function updateBeamStudio(){
 const span=Number($('#studio-span')?.value||6),load=Number($('#studio-load')?.value||12),position=Number($('#studio-position')?.value||50)/100;
 const a=span*position,ra=load*(1-position),rb=load*position;
 const x0=95,x1=665,x=x0+(x1-x0)*position,fmt=n=>Number(n).toFixed(2);
 const set=(id,value)=>{const el=$('#'+id);if(el)el.textContent=value};
 set('studio-span-value',fmt(span)+' m');set('studio-load-value',fmt(load)+' kN');set('studio-position-value',Math.round(position*100)+'%');
 set('studio-ra',fmt(ra)+' kN');set('studio-rb',fmt(rb)+' kN');set('studio-check','Rₐ + Rᵦ = '+fmt(ra+rb)+' kN');
 set('studio-check-state',Math.abs(ra+rb-load)<1e-8?'Balanced for the stated idealized model.':'Check equilibrium.');
 const attrs={
 'beam-load-arrow':{d:'M '+x+' 48 V 126'},
 'beam-load-label':{x:x,y:35},
 'beam-left-reaction':{d:'M 95 225 V '+(225-Math.min(ra,100)*.35)},
 'beam-right-reaction':{d:'M 665 225 V '+(225-Math.min(rb,100)*.35)},
 'beam-left-label':{x:95,y:244},
 'beam-right-label':{x:665,y:244},
 'beam-span-label':{x:380},
 'beam-position-label':{x:x,y:126}
 };
 Object.entries(attrs).forEach(([id,values])=>{const el=$('#'+id);if(el)Object.entries(values).forEach(([k,v])=>el.setAttribute(k,String(v)))});
 set('beam-load-label',fmt(load)+' kN');set('beam-left-label','Rₐ '+fmt(ra));set('beam-right-label','Rᵦ '+fmt(rb));set('beam-span-label','SPAN = '+fmt(span)+' m');set('beam-position-label','a = '+fmt(a)+' m');
}
['studio-span','studio-load','studio-position'].forEach(id=>$('#'+id)?.addEventListener('input',updateBeamStudio));
$('#studio-reset')?.addEventListener('click',()=>{const defaults={'studio-span':6,'studio-load':12,'studio-position':50};Object.entries(defaults).forEach(([id,v])=>{if($('#'+id))$('#'+id).value=v});updateBeamStudio()});
updateBeamStudio();
$$('.project-filter').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;
 $$('.project-filter').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 let visible=0;
 $$('.project-card[data-category]').forEach(card=>{const show=filter==='all'||card.dataset.category===filter;card.hidden=!show;if(show)visible++});
 const count=$('#project-visible-count');if(count)count.textContent=String(visible).padStart(2,'0');
}));
$('#concrete-form')?.addEventListener('submit',e=>{e.preventDefault();const l=Number($('#concrete-length').value),w=Number($('#concrete-width').value),d=Number($('#concrete-depth').value),out=$('#concrete-result');if(l<=0||w<=0||d<=0){out.textContent='Enter dimensions greater than zero.';return}const v=l*w*d;out.textContent='Geometric volume: '+v.toFixed(4)+' m³ ('+(v*1000).toFixed(1)+' litres). Excludes waste, reinforcement, and site allowances.'});
$$('.modal-backdrop').forEach(m=>{$('.modal-close',m).addEventListener('click',()=>m.hidden=true);m.addEventListener('click',e=>{if(e.target===m)m.hidden=true})});document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal-backdrop').forEach(m=>m.hidden=true)});
$('#download-cv')?.addEventListener('click',()=>{const txt=['MASHAL KHAN','Civil Engineering Student','Sir Syed University of Engineering & Technology','Karachi, Pakistan','Email: imashalweb@gmail.com','GitHub: https://github.com/mashal-web','','Academic stage: First-year / starting','','Current courses',...courses.map((c,i)=>(i+1)+'. '+c[1]),'','Early-stage student building fundamentals in mathematics, materials, technical drawing, and structural concepts.','Add verified grades, projects, and experience before using as a formal CV.'].join('\n');const u=URL.createObjectURL(new Blob([txt],{type:'text/plain'})),a=document.createElement('a');a.href=u;a.download='Mashal-Khan-Student-Profile.txt';document.body.append(a);a.click();a.remove();URL.revokeObjectURL(u)});
$('#print-cv')?.addEventListener('click',()=>window.print());

/* Immersive engineering lab enhancement */
const labMarkup='<section class="section wrap immersive-lab" id="playground"><div class="lab-heading"><p class="eyebrow">INTERACTIVE MODEL / 001</p><h2>Change the variables.<br><em>Study the form.</em></h2><p class="muted">A conceptual bridge visualization for exploration. It is not a validated structural solver and does not calculate real stress, capacity, or safety.</p></div><div class="lab-layout"><div class="lab-viewport"><div class="lab-bar"><span><i class="live-dot"></i>STRUCTURAL MODEL</span><span id="lab-mode-label">RENDER / ACTIVE</span></div><canvas id="lab-canvas" role="img" aria-label="Interactive conceptual bridge model; drag to rotate"></canvas><div class="lab-bar"><span>DRAG TO ROTATE · WHEEL TO ZOOM</span><span id="lab-angle">ROT 000°</span></div><div class="lab-tools"><button class="lab-mode active" data-lab-mode="render">RENDER</button><button class="lab-mode" data-lab-mode="blueprint">BLUEPRINT</button><button class="lab-mode" data-lab-mode="wire">WIRE / FORM</button><button class="lab-mode" id="lab-reset">RESET ↺</button></div></div><aside class="lab-controls"><p class="eyebrow">MODEL CONTROLS</p><label class="range-label" for="lab-load">Illustrative deck load <output id="lab-load-value">50%</output></label><input id="lab-load" type="range" min="0" max="100" value="50"><label class="range-label" for="lab-span">Visual span scale <output id="lab-span-value">100%</output></label><input id="lab-span" type="range" min="65" max="125" value="100"><div class="readouts"><div><small>LOAD INPUT</small><b id="lab-load-readout">50%</b></div><div><small>SPAN SCALE</small><b id="lab-span-readout">1.00×</b></div><div><small>VIEW MODE</small><b id="lab-view-readout">3D</b></div></div><p class="small-note">The sliders exaggerate the drawing to help visual learning. They are not physical calculations. Never use this demo to design or assess a real structure.</p></aside></div></section>';
if(page==='index'){const art=$('.hero-art');if(art)art.innerHTML='<div class="model-bar"><span><i class="live-dot"></i>FIG. 001 / CABLE-STAYED BRIDGE</span><span>LIVE MODEL</span></div><canvas id="hero-bridge" role="img" aria-label="Interactive cable-stayed bridge model; drag to rotate"></canvas><div class="model-bar"><span>DRAG TO ROTATE · WHEEL TO ZOOM</span><span id="hero-angle">ROT 000°</span></div><div class="model-tools"><button class="model-mode active" data-hero-mode="render">RENDER</button><button class="model-mode" data-hero-mode="blueprint">BLUEPRINT</button><button class="model-mode" data-hero-mode="wire">WIRE / FORM</button><button class="model-mode" id="hero-reset">RESET ↺</button></div>'}
if(page==='projects'){const main=$('main');if(main&&!$('#playground')){const section=document.createElement('div');section.innerHTML=labMarkup;const existing=main.querySelector('.section.wrap');if(existing)existing.after(section.firstElementChild);else main.append(section.firstElementChild)}}
function createBridge(canvas,opts){if(!canvas)return null;const ctx=canvas.getContext('2d');if(!ctx)return null;let yaw=-.48,pitch=.18,zoom=1,dragging=false,lastX=0,lastY=0,mode='render',load=50,span=1,raf=0;const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;const accent=()=>getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#8be4ed';const pageBg=()=>getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#090e13';
function project(p,w,h){const cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(pitch),sx=Math.sin(pitch),x=p[0]*span,z=p[2],y=p[1],xx=x*cy-z*sy,zz=x*sy+z*cy,yy=y*cx-zz*sx,depth=y*sx+zz*cx,k=Math.min(w,h)*.46*zoom/(3.6+depth*.17);return [w/2+xx*k,h*.54-yy*k,depth]}
function line(a,b,wid,alpha,dash){const A=project(a,canvas.width,canvas.height),B=project(b,canvas.width,canvas.height);ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.strokeStyle=accent();ctx.lineWidth=wid||1;ctx.globalAlpha=alpha===undefined ? .8 : alpha;ctx.setLineDash(dash||[]);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1}
function draw(){const r=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.6),w=Math.max(1,Math.round(r.width*dpr)),h=Math.max(1,Math.round(r.height*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}ctx.clearRect(0,0,w,h);ctx.fillStyle=pageBg();ctx.fillRect(0,0,w,h);const c=accent();ctx.strokeStyle=c;ctx.lineWidth=1;ctx.globalAlpha=.07;for(let x=0;x<w;x+=w/22){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=h/15){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}ctx.globalAlpha=1;const half=1.45,dy=-.34,deflection=load/100*.15;
for(const z of [-.2,.2]){line([-half,dy-deflection,z],[half,dy-deflection,z],2,.95);line([-half,dy+.025,z],[half,dy+.025,z],.7,.4,[3,5])}
for(const x of [-half,half])line([x,dy-.08,-.23],[x,dy-.08,.23],1.4,.8);
const towers=[[-.5,1.1,0],[.5,1.1,0]];towers.forEach((t,idx)=>{line([t[0],dy-.05,-.2],[t[0],t[1],-.2],2.8,.95);line([t[0],dy-.05,.2],[t[0],t[1],.2],2.8,.95);line([t[0],t[1],-.2],[t[0],t[1],.2],1.8,.8);for(let n=1;n<=7;n++){const x=idx===0?-half+n*.17:half-n*.17;line([t[0],t[1]-.04,-.19],[x,dy-deflection,.19],1,.65);line([t[0],t[1]-.04,.19],[x,dy-deflection,-.19],1,.65)}line([t[0]-.09,dy-.13,0],[t[0]+.09,dy-.13,0],2,.9)});
for(let x=-1.4;x<=1.41;x+=.14)line([x,dy-deflection+Math.abs(x)*.03,-.2],[x,dy-deflection+Math.abs(x)*.03,.2],.7,.28);
if(mode==='blueprint'){ctx.strokeStyle=c;ctx.lineWidth=1;ctx.globalAlpha=.65;ctx.strokeRect(12,12,w-24,h-24);ctx.globalAlpha=1;ctx.font=Math.max(8,w*.017)+'px monospace';ctx.fillStyle=c;ctx.fillText('FIG 01 / CABLE-STAYED BRIDGE · NOT TO SCALE',20,29);ctx.fillText('DECK / TOWER / STAYS',20,h-15)}else if(mode==='wire'){ctx.font=Math.max(8,w*.017)+'px monospace';ctx.fillStyle=c;ctx.fillText('GEOMETRY VIEW / NO MATERIAL DATA',14,22)}
if(load>0){const p=project([0,dy-deflection-.15,0],w,h);ctx.beginPath();ctx.arc(p[0],p[1],Math.max(3,w*.008),0,Math.PI*2);ctx.fillStyle='#e4bb82';ctx.fill()}
if(opts.angle)opts.angle('ROT '+String(Math.round(((yaw*180/Math.PI)%360+360)%360).toString().padStart(3,'0'))+'°');if(opts.update)opts.update({load,span,mode})}
function frame(){if(!canvas.isConnected){cancelAnimationFrame(raf);return}if(!dragging&&!reduced)yaw+=.0014;draw();if(!reduced)raf=requestAnimationFrame(frame)}
canvas.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!dragging)return;yaw+=(e.clientX-lastX)*.008;pitch=Math.max(-.65,Math.min(.65,pitch+(e.clientY-lastY)*.006));lastX=e.clientX;lastY=e.clientY;draw()});['pointerup','pointercancel','lostpointercapture'].forEach(ev=>canvas.addEventListener(ev,()=>dragging=false));canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.65,Math.min(1.7,zoom-e.deltaY*.001));draw()},{passive:false});window.addEventListener('resize',draw);
const buttons=opts.buttons||[];buttons.forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.heroMode||b.dataset.labMode||b.dataset.dockMode;buttons.forEach(x=>x.classList.toggle('active',x===b));if(opts.modeLabel)opts.modeLabel.textContent=mode.toUpperCase()+' / ACTIVE';draw()}));if(opts.reset)opts.reset.addEventListener('click',()=>{yaw=-.48;pitch=.18;zoom=1;draw()});if(opts.load)opts.load.addEventListener('input',()=>{load=Number(opts.load.value);if(opts.loadValue)opts.loadValue.textContent=load+'%';draw()});if(opts.span)opts.span.addEventListener('input',()=>{span=Number(opts.span.value)/100;if(opts.spanValue)opts.spanValue.textContent=opts.span.value+'%';draw()});if(!reduced)raf=requestAnimationFrame(frame);else draw();return {draw,stop:()=>cancelAnimationFrame(raf)}}
createBridge($('#hero-bridge'),{buttons:$$('[data-hero-mode]'),reset:$('#hero-reset'),angle:v=>{if($('#hero-angle'))$('#hero-angle').textContent=v}});
createBridge($('#lab-canvas'),{buttons:$$('[data-lab-mode]'),reset:$('#lab-reset'),load:$('#lab-load'),span:$('#lab-span'),loadValue:$('#lab-load-value'),spanValue:$('#lab-span-value'),modeLabel:$('#lab-mode-label'),angle:v=>{if($('#lab-angle'))$('#lab-angle').textContent=v},update:s=>{if($('#lab-load-readout'))$('#lab-load-readout').textContent=s.load+'%';if($('#lab-span-readout'))$('#lab-span-readout').textContent=s.span.toFixed(2)+'×';if($('#lab-view-readout'))$('#lab-view-readout').textContent=s.mode==='render'?'3D':s.mode==='blueprint'?'2D':'FORM'}});



/* 3D portfolio scene and consistent iconography on every page */
const depthScene=document.createElement('div');
depthScene.className='depth-scene';
depthScene.setAttribute('aria-hidden','true');
depthScene.innerHTML='<div class="depth-grid"></div><div class="depth-object depth-object-a"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="depth-object depth-object-b"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="depth-orbit orbit-a"></div><div class="depth-orbit orbit-b"></div>';
document.body.prepend(depthScene);
function iconForText(value){
 const s=(value||'').toLowerCase();
 if(/course|subject|lecture|study|notes|journal|read entry/.test(s))return 'book';
 if(/bridge|structure|load|material|building|project|case study/.test(s))return 'bridge';
 if(/academic|university|degree|semester|education/.test(s))return 'graduation';
 if(/drawing|dimension|technical/.test(s))return 'ruler';
 if(/calculator|math|quantitative|formula|number/.test(s))return 'calculator';
 if(/github/.test(s))return 'github';
 if(/linkedin|contact|email|connect|mail/.test(s))return 'mail';
 if(/download|export/.test(s))return 'download';
 if(/print|pdf/.test(s))return 'printer';
 if(/about|person|profile/.test(s))return 'user';
 if(/roadmap|foundation|layers|digital/.test(s))return 'layers3';
 if(/progress|checklist|complete/.test(s))return 'check';
 if(/journal|entry|field notes/.test(s))return 'file';
 return 'cube';
}
function addIcon(el,name,cls='card-icon'){
 if(!el||el.querySelector(':scope > .'+cls))return;
 const holder=document.createElement('span');holder.className=cls;holder.innerHTML=ico(name);holder.setAttribute('aria-hidden','true');el.prepend(holder);
}
$$('.course-card').forEach(card=>addIcon(card.querySelector('.course-card-button')||card,iconForText(card.textContent),'course-icon'));
$$('.card').forEach(card=>addIcon(card,iconForText((card.textContent||'')+' '+(card.getAttribute('href')||'')),'card-icon'));
$$('.journal-open').forEach(card=>addIcon(card,iconForText(card.textContent),'card-icon'));
$$('.project-detail').forEach(btn=>{if(!btn.querySelector('.ui-icon'))btn.insertAdjacentHTML('beforeend',ico('arrow'))});
$$('.text-link,.course-open,.project-arrow,.journal-read').forEach(el=>{if(!el.querySelector('.ui-icon'))el.insertAdjacentHTML('beforeend',ico('arrow'))});
$$('a[href^="https://github.com"]').forEach(el=>{if(!el.querySelector('.ui-icon'))el.insertAdjacentHTML('afterbegin',ico('github'))});
$$('a[href^="https://linkedin.com"]').forEach(el=>{if(!el.querySelector('.ui-icon'))el.insertAdjacentHTML('afterbegin',ico('network'))});
$$('a[href^="mailto:"]').forEach(el=>{if(!el.querySelector('.ui-icon'))el.insertAdjacentHTML('afterbegin',ico('mail'))});
$('#download-cv')?.insertAdjacentHTML('afterbegin',ico('download'));
$('#print-cv')?.insertAdjacentHTML('afterbegin',ico('printer'));

/* Site-wide engineering command dock: launch the same interactive model from every page. */
const dock=document.createElement('button');
dock.className='engineering-dock';
dock.type='button';
dock.innerHTML='<span class="dock-mark">'+ico('bridge')+'</span><span><b>ENGINEERING LAB</b><small>OPEN INTERACTIVE MODEL</small></span><span class="dock-arrow">'+ico('arrow')+'</span>';
dock.setAttribute('aria-haspopup','dialog');
document.body.append(dock);
const dockModal=document.createElement('div');
dockModal.className='dock-backdrop';
dockModal.hidden=true;
dockModal.innerHTML='<section class="dock-window" role="dialog" aria-modal="true" aria-labelledby="dock-title"><div class="dock-window-head"><div><p class="eyebrow">LIVE MODEL / ANY PAGE</p><h2 id="dock-title">Explore the <em>structure.</em></h2></div><button type="button" class="dock-close" aria-label="Close interactive model">×</button></div><p class="dock-description">Drag to rotate, scroll to zoom, and switch between render, blueprint, and wire views. This is a conceptual geometry model, not a structural solver.</p><div class="dock-viewport"><canvas id="dock-canvas" role="img" aria-label="Interactive cable-stayed bridge model"></canvas></div><div class="dock-toolbar"><button class="dock-mode active" data-dock-mode="render">RENDER</button><button class="dock-mode" data-dock-mode="blueprint">BLUEPRINT</button><button class="dock-mode" data-dock-mode="wire">WIRE / FORM</button><button class="dock-reset" id="dock-reset">RESET VIEW ↺</button></div><p class="small-note">Illustrative only. No verified dimensions, material properties, load calculations, or safety checks.</p></section>';
document.body.append(dockModal);
let dockModel=null;
dock.addEventListener('click',()=>{dockModal.hidden=false;document.body.classList.add('dock-open');if(!dockModel)dockModel=createBridge($('#dock-canvas'),{buttons:$$('[data-dock-mode]'),reset:$('#dock-reset'),angle:v=>{const a=$('.dock-window-head .eyebrow');if(a)a.textContent='LIVE MODEL / '+v}});else dockModel.draw();$('.dock-close',dockModal).focus()});
function closeDock(){dockModal.hidden=true;document.body.classList.remove('dock-open');dock.focus()}
$('.dock-close',dockModal).innerHTML=ico('close');$('.dock-close',dockModal).addEventListener('click',closeDock);
dockModal.addEventListener('click',e=>{if(e.target===dockModal)closeDock()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dockModal.hidden)closeDock()});


/* REAL-TIME WEBGL ENGINE: 3D structural models + a site-wide engineering world.
   If WebGL or the CDN is unavailable, the existing canvas renderer remains usable. */
function loadThreeEngine(){
 if(window.THREE){bootThreeWorld();return}
 const script=document.createElement('script');
 script.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js';
 script.async=true;
 script.onload=()=>{if(window.THREE)bootThreeWorld();else loadFallbackThree()};
 script.onerror=loadFallbackThree;
 function loadFallbackThree(){
  if(script.dataset.fallbackTried){document.documentElement.classList.add('webgl-fallback');return}
  script.dataset.fallbackTried='1';
  script.src='https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
  script.onerror=()=>document.documentElement.classList.add('webgl-fallback');
  document.head.append(script);
 }
 document.head.append(script);
}
function bootThreeWorld(){
 if(window.__mashalThreeBooted||!window.THREE)return;
 window.__mashalThreeBooted=true;
 const T=window.THREE;
 const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const cssVar=(name,fallback)=>getComputedStyle(document.documentElement).getPropertyValue(name).trim()||fallback;
 const accent=()=>cssVar('--accent','#72e5f2');
 const bg=()=>cssVar('--bg','#08121b');
 function material(color,emissive,intensity,roughness=0.42,metalness=0.45){
  return new T.MeshStandardMaterial({color,emissive:emissive||color,emissiveIntensity:intensity===undefined?.18:intensity,roughness,metalness});
 }
 function box(parent,name,size,pos,mat,part=name){
  const m=new T.Mesh(new T.BoxGeometry(size[0],size[1],size[2]),mat);
  m.position.set(pos[0],pos[1],pos[2]);m.name=name;m.userData.part=part;parent.add(m);return m;
 }
 function cable(parent,a,b,mat,radius=.012,name='Stay cable'){
  const A=new T.Vector3(...a),B=new T.Vector3(...b),delta=new T.Vector3().subVectors(B,A);
  const mesh=new T.Mesh(new T.CylinderGeometry(radius,radius,delta.length(),6),mat);
  mesh.position.copy(A).add(B).multiplyScalar(.5);
  mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());
  mesh.name=name;mesh.userData.part=name;parent.add(mesh);return mesh;
 }
 function makeBridge(canvas,opts){
  if(!canvas||!canvas.isConnected)return null;
  const replacement=canvas.cloneNode(false);
  replacement.classList.add('three-bridge-canvas');
  let renderer;
  try{renderer=new T.WebGLRenderer({canvas:replacement,alpha:true,antialias:true,powerPreference:'low-power'});}
  catch(e){return null}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.setClearColor(0x000000,0);
  const scene=new T.Scene();
  scene.fog=new T.FogExp2(0x07121b,.035);
  const camera=new T.PerspectiveCamera(38,1,.1,100);
  camera.position.set(5.5,3.6,7.2);
  const target=new T.Vector3(0,.65,0);
  const ambient=new T.HemisphereLight(0xbfefff,0x0b1724,2.05);scene.add(ambient);
  const key=new T.DirectionalLight(0xd8f8ff,3.1);key.position.set(-4,7,5);scene.add(key);
  const rim=new T.PointLight(0x27d9ff,22,12);rim.position.set(0,2.8,-2.5);scene.add(rim);
  const warm=new T.PointLight(0xffb86a,8,8);warm.position.set(2,1.8,3);scene.add(warm);
  const model=new T.Group();scene.add(model);
  const steel=material(0x244351,0x0d5668,.42,.28,.82);
  const edge=material(0x55dff2,0x20b8e6,1.45,.25,.6);
  const cableMat=material(0x8deeff,0x39c9e8,.72,.32,.52);
  const deckMat=material(0x344b59,0x123441,.32,.34,.8);
  const supportMat=material(0x627784,0x142d38,.22,.5,.65);
  const loadMat=new T.MeshStandardMaterial({color:0xffbd72,emissive:0xff6e34,emissiveIntensity:2.5,metalness:.3,roughness:.25});
  const materials=[steel,edge,cableMat,deckMat,supportMat,loadMat];
  const L=6.5, deckY=.34, towerY=2.28;
  // Main deck, edge girders and cross-members.
  box(model,'Composite deck',[L,.16,.88],[0,deckY,0],deckMat,'Deck');
  for(const z of [-.47,.47]){
   box(model,'Edge girder',[L,.12,.08],[0,deckY-.13,z],steel,'Edge girder');
   box(model,'Safety rail',[L,.035,.035],[0,deckY+.22,z],edge,'Deck rail');
   for(let x=-3.05;x<=3.06;x+=.3)box(model,'Cross beam',[.035,.09,.86],[x,deckY-.16,0],supportMat,'Cross beam');
  }
  // Two twin-leg pylons and their cross-bracing.
  const towers=[-1.15,1.15];
  towers.forEach((x,idx)=>{
   for(const z of [-.31,.31]){
    box(model,'Pylon leg',[.13,towerY,.13],[x,deckY+towerY/2,z],steel,'Pylon');
    box(model,'Pylon crown',[.2,.08,.82],[x,deckY+towerY,z],edge,'Pylon crosshead');
   }
   box(model,'Pylon cross brace',[.055,.48,.045],[x,deckY+1.22,0],edge,'Pylon bracing');
   // Fan stays radiate from each pylon toward its outer and inner deck panels.
   const direction=idx===0?-1:1;
   for(let i=1;i<=8;i++){
    const dx=i*.265;
    const anchorX=x+direction*dx;
    const anchorY=deckY+.05;
    for(const z of [-.31,.31]){
     cable(model,[x,deckY+towerY-.05,z],[anchorX,anchorY,z],cableMat,.009,'Stay cable');
    }
   }
   for(const z of [-.31,.31])box(model,'Pier cap',[.3,.12,.24],[x,.12,z],supportMat,'Pier cap');
  });
  // Under-deck diagonals and bearing blocks.
  for(let x=-2.9;x<2.9;x+=.42){
   cable(model,[x,deckY-.22,-.38],[x+.21,deckY-.22,.38],supportMat,.012,'Under-deck cross brace');
   cable(model,[x,deckY-.22,.38],[x+.21,deckY-.22,-.38],supportMat,.012,'Under-deck cross brace');
  }
  for(const x of [-3.05,3.05])for(const z of [-.35,.35]){
   box(model,'Bearing',[.18,.12,.16],[x,.13,z],edge,'Bearing');
   box(model,'Foundation block',[.55,.1,.6],[x,.035,z],supportMat,'Foundation');
  }
  // Discrete load markers and tiny status beacons.
  const markers=new T.Group();model.add(markers);
  for(let i=0;i<11;i++){
   const m=new T.Mesh(new T.SphereGeometry(.045,10,8),loadMat);
   m.position.set(-2.8+i*.56,deckY+.17,.02);m.name='Illustrative load marker';m.userData.part='Load marker';markers.add(m);
  }
  const nodes=new T.Group();model.add(nodes);
  for(let i=0;i<22;i++){
   const angle=i/22*Math.PI*2;
   const m=new T.Mesh(new T.SphereGeometry(.022,8,6),edge);
   m.position.set(Math.cos(angle)*3.25,deckY+.06,Math.sin(angle)*.49);
   nodes.add(m);
  }
  // Construction-grid floor.
  const grid=new T.GridHelper(18,36,0x1e8aa2,0x16404f);
  grid.position.y=-.045;grid.material.transparent=true;grid.material.opacity=.3;scene.add(grid);
  const floor=new T.Mesh(new T.PlaneGeometry(30,30),new T.MeshStandardMaterial({color:0x07111a,roughness:1,metalness:0,transparent:true,opacity:.22}));
  floor.rotation.x=-Math.PI/2;floor.position.y=-.055;scene.add(floor);
  const view={yaw:-.22,pitch:.06,zoom:1,drag:false,x:0,y:0,mode:'render',load:opts.load?Number(opts.load.value):50,span:opts.span?Number(opts.span.value)/100:1};
  const raycaster=new T.Raycaster(),pointer=new T.Vector2();
  let selected=null,raf=0,disposed=false,resizeObserver=null;
  function setMode(mode){
   view.mode=mode;
   materials.forEach((m,i)=>{
    m.wireframe=mode==='wire';
    if(mode==='blueprint'){m.color.set(accent());m.emissive.set(accent());m.emissiveIntensity=i===5?2.2:.75;m.transparent=true;m.opacity=.68}
    else {m.transparent=false;m.opacity=1}
   });
   if(opts.modeLabel)opts.modeLabel.textContent=mode.toUpperCase()+' / WEBGL';
   if(opts.buttons)opts.buttons.forEach(b=>{const val=b.dataset.heroMode||b.dataset.labMode||b.dataset.dockMode;b.classList.toggle('active',val===mode)});
  }
  function resize(){
   if(!canvas.isConnected)return;
   const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);
   renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
  }
  function updateInputs(){
   model.scale.x=view.span;
   markers.children.forEach((m,i)=>{const active=i<Math.max(1,Math.round(view.load/9));m.visible=active;m.scale.setScalar(.65+view.load/160)});
   cableMat.emissiveIntensity=.35+view.load/85;
   if(opts.loadValue)opts.loadValue.textContent=view.load+'%';
   if(opts.spanValue)opts.spanValue.textContent=Math.round(view.span*100)+'%';
   if(opts.update)opts.update({load:view.load,span:view.span,mode:view.mode});
  }
  function render(){
   if(disposed||!canvas.isConnected){disposed=true;cancelAnimationFrame(raf);renderer.dispose();return}
   if(!view.drag&&!reduced)model.rotation.y+=.001;
   model.rotation.y+=0;
   model.rotation.x=view.pitch;
   model.rotation.y+=view.yaw*.0;
   camera.position.set(Math.sin(view.yaw)*7.2/view.zoom,3.4/view.zoom,Math.cos(view.yaw)*7.2/view.zoom);
   camera.lookAt(target);
   if(view.mode==='blueprint'){scene.background=null;grid.material.opacity=.62}
   else if(view.mode==='wire'){grid.material.opacity=.42}
   else grid.material.opacity=.3;
   renderer.render(scene,camera);
   if(opts.angle)opts.angle('ROT '+String(Math.round(((view.yaw*180/Math.PI)%360+360)%360)).padStart(3,'0')+'°');
   if(!reduced)raf=requestAnimationFrame(render);
  }
  function pointerDown(e){view.drag=true;view.x=e.clientX;view.y=e.clientY;canvas.setPointerCapture?.(e.pointerId)}
  function pointerMove(e){
   if(view.drag){view.yaw+=(e.clientX-view.x)*.008;view.pitch=Math.max(-.55,Math.min(.55,view.pitch+(e.clientY-view.y)*.006));view.x=e.clientX;view.y=e.clientY;return}
   const r=canvas.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;
   raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(model.children,true);
   canvas.style.cursor=hits.length?'crosshair':'grab';
  }
  function pointerUp(e){
   if(!view.drag)return;view.drag=false;
   if(e.type==='pointerup'){
    const r=canvas.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;
    raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(model.children,true);
    if(hits.length){selected=hits[0].object;if(opts.select)opts.select(selected.userData.part||selected.name||'Structural component')}
   }
  }
  canvas.addEventListener('pointerdown',pointerDown);
  canvas.addEventListener('pointermove',pointerMove);
  ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>canvas.addEventListener(ev,pointerUp));
  canvas.addEventListener('wheel',e=>{e.preventDefault();view.zoom=Math.max(.62,Math.min(1.65,view.zoom-e.deltaY*.001));},{passive:false});
  if(opts.buttons)opts.buttons.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.heroMode||b.dataset.labMode||b.dataset.dockMode||'render')));
  if(opts.reset)opts.reset.addEventListener('click',()=>{view.yaw=-.22;view.pitch=.06;view.zoom=1;model.rotation.set(0,0,0);setMode('render');updateInputs()});
  if(opts.load)opts.load.addEventListener('input',()=>{view.load=Number(opts.load.value);updateInputs()});
  if(opts.span)opts.span.addEventListener('input',()=>{view.span=Number(opts.span.value)/100;updateInputs()});
  canvas.parentElement.replaceChild(replacement,canvas);
  canvas=replacement;
  resize();updateInputs();setMode('render');
  window.addEventListener('resize',resize,{passive:true});
  if('ResizeObserver' in window){resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas.parentElement)}
  if(!reduced)raf=requestAnimationFrame(render);else render();
  return {render,dispose(){disposed=true;cancelAnimationFrame(raf);resizeObserver?.disconnect();renderer.dispose()}};
 }
 function initWorld(){
  const host=$('.depth-scene');if(!host||host.querySelector('.world-webgl-canvas'))return;
  const canvas=document.createElement('canvas');canvas.className='world-webgl-canvas';canvas.setAttribute('aria-hidden','true');host.prepend(canvas);
  let renderer;try{renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});}catch(e){canvas.remove();return}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1));renderer.setClearColor(0x000000,0);
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(46,1,.1,120);camera.position.set(0,2.5,12);
  scene.add(new T.AmbientLight(0x74e7f6,1.2));
  const group=new T.Group();scene.add(group);
  const wireMat=new T.LineBasicMaterial({color:0x39d9f3,transparent:true,opacity:.28});
  const glowMat=new T.MeshBasicMaterial({color:0x56dff4,transparent:true,opacity:.2,wireframe:true});
  // Large structural truss floating behind the page content.
  const pts=[];
  const left=-5.6,right=5.6,base=-1.2,top=1.45,steps=22;
  for(let i=0;i<=steps;i++){
   const x=left+(right-left)*i/steps;pts.push(new T.Vector3(x,base,-1.2),new T.Vector3(x,base,1.2));
   if(i<steps){const nx=left+(right-left)*(i+1)/steps;pts.push(new T.Vector3(x,base,-1.2),new T.Vector3(nx,base,-1.2),new T.Vector3(x,base,1.2),new T.Vector3(nx,base,1.2));}
   const peak=top-Math.abs((i/steps)-.5)*1.05;
   pts.push(new T.Vector3(x,base,-1.2),new T.Vector3(x,peak,-1.2),new T.Vector3(x,base,1.2),new T.Vector3(x,peak,1.2));
   if(i<steps){const nx=left+(right-left)*(i+1)/steps,npeak=top-Math.abs(((i+1)/steps)-.5)*1.05;pts.push(new T.Vector3(x,peak,-1.2),new T.Vector3(nx,base,-1.2),new T.Vector3(x,base,1.2),new T.Vector3(nx,npeak,1.2));}
  }
  const geometry=new T.BufferGeometry().setFromPoints(pts);group.add(new T.LineSegments(geometry,wireMat));
  for(let i=0;i<46;i++){
   const angle=i*.37,r=2.6+(i%9)*.43;
   const node=new T.Mesh(new T.IcosahedronGeometry(.025+(i%3)*.008,0),glowMat);
   node.position.set(Math.cos(angle)*r,Math.sin(angle*1.6)*1.8,Math.sin(angle)*2.8-1.5);group.add(node);
  }
  const grid=new T.GridHelper(36,60,0x1d8ea7,0x17404f);grid.position.y=-2.35;grid.material.transparent=true;grid.material.opacity=.13;group.add(grid);
  let raf=0,last=0,disposed=false;
  function resize(){const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
  function draw(t){if(disposed||!canvas.isConnected){disposed=true;cancelAnimationFrame(raf);renderer.dispose();return}const time=t*.00012;if(!reduced){group.rotation.y=Math.sin(time)*.09;group.rotation.x=Math.sin(time*.7)*.025}renderer.render(scene,camera);if(!reduced)raf=requestAnimationFrame(draw)}
  window.addEventListener('resize',resize,{passive:true});resize();draw(0);
 }
 initWorld();
 const selectLabel=canvas=>{const parent=canvas?.parentElement;if(!parent)return null;let label=parent.querySelector('.three-selection-readout');if(!label){label=document.createElement('div');label.className='three-selection-readout';label.textContent='SELECT A STRUCTURAL ELEMENT';parent.append(label)}return label};
 function upgradeBridgeCanvas(canvas){
  if(!canvas||canvas.classList.contains('three-bridge-canvas'))return;
  const id=canvas.id,lab=id==='lab-canvas',hero=id==='hero-bridge';
  const angleId=hero?'hero-angle':lab?'lab-angle':null;
  const buttons=hero?$$('[data-hero-mode]'):lab?$$('[data-lab-mode]'):$$('[data-dock-mode]');
  const select=selectLabel(canvas);
  makeBridge(canvas,{
   buttons,reset:$(hero?'#hero-reset':lab?'#lab-reset':'#dock-reset'),
   load:lab?$('#lab-load'):null,span:lab?$('#lab-span'):null,
   loadValue:lab?$('#lab-load-value'):null,spanValue:lab?$('#lab-span-value'):null,
   modeLabel:lab?$('#lab-mode-label'):null,
   angle:v=>{const a=angleId?$('#'+angleId):null;if(a)a.textContent=v},
   update:s=>{if(lab){if($('#lab-load-readout'))$('#lab-load-readout').textContent=s.load+'%';if($('#lab-span-readout'))$('#lab-span-readout').textContent=s.span.toFixed(2)+'×';if($('#lab-view-readout'))$('#lab-view-readout').textContent=s.mode==='render'?'3D':s.mode==='blueprint'?'2D':'FORM'}},
   select:part=>{if(select)select.textContent='SELECTED COMPONENT / '+part.toUpperCase()}
  });
}
[$('#hero-bridge'),$('#lab-canvas')].filter(Boolean).forEach(upgradeBridgeCanvas);
let dockThreeBuilt=false;
dock.addEventListener('click',()=>{
 const c=$('#dock-canvas');
 if(!dockThreeBuilt&&c){upgradeBridgeCanvas(c);dockThreeBuilt=!!c.classList.contains('three-bridge-canvas')}
});
if(!dockModal.hidden)upgradeBridgeCanvas($('#dock-canvas'));
}
loadThreeEngine();

})();