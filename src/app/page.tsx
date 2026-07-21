import Link from "next/link";
import { ArrowRight, BrainCircuit, CalendarRange, FileStack, Route, ShieldCheck, Sparkles } from "lucide-react";
import { Brand } from "@/components/brand";

export default function Landing() {
  return <main className="marketing">
    <nav className="topnav"><Brand/><div className="nav-actions"><Link href="/login">Log in</Link><Link className="button small" href="/signup">Build my pass plan</Link></div></nav>
    <section className="landing-hero">
      <div className="hero-copy"><div className="pill"><Sparkles size={14}/> Built for students starting from scratch</div><h1>You don’t need the whole course. You need a <em>clear route to the marks.</em></h1><p>Upload your materials and exam timetable. Olodo AI turns repeated past-question patterns into a focused plan, then walks you through every formula without skipping steps.</p><div className="hero-actions"><Link className="button" href="/signup">Create my study plan <ArrowRight size={18}/></Link><Link className="plain-link" href="/login">I already have an account</Link></div><div className="trust-row"><span><ShieldCheck size={16}/> Private materials</span><span><BrainCircuit size={16}/> Beginner-first explanations</span></div></div>
      <div className="hero-visual"><div className="mission-preview"><div className="preview-head"><span>YOUR FIRST MISSION</span><span className="status-dot">Ready</span></div><p>What are we finding?</p><h3>Power consumed, P</h3><div className="route-line"><b>A</b><i/><b>R</b><i/><b>I</b><i/><b>P</b></div><div className="formula-box"><small>STEP 1 OF 4 · FIND AREA</small><strong>A = πd² / 4</strong><span>We need area before resistance.</span></div><button>Show me the values</button></div><div className="float-card one"><CalendarRange/><span><b>2 days</b> to finish this pass path</span></div><div className="float-card two"><FileStack/><span><b>9 patterns</b> repeat in your past questions</span></div></div>
    </section>
    <section className="how-grid"><article><FileStack/><span>01</span><h2>Bring the evidence</h2><p>Add notes, past questions, course folders, or connect Drive.</p></article><article><Route/><span>02</span><h2>See the shortest route</h2><p>Olodo prioritises recurring patterns most likely to earn marks.</p></article><article><BrainCircuit/><span>03</span><h2>Learn without pretending</h2><p>Every symbol, value, formula, and dependency is explained from zero.</p></article></section>
  </main>;
}
