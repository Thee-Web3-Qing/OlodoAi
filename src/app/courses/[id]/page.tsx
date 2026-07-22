"use client";
import { ChangeEvent,useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft,BookOpen,Brain,Calculator,FileUp,NotebookText,Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useApp } from "@/components/app-provider";
import type { CourseAnalysis } from "@/lib/store";

export default function CourseLesson(){
  const{id}=useParams<{id:string}>(),{data,update}=useApp(),course=data.courses.find(c=>c.id===id);
  const[files,setFiles]=useState<File[]>([]),[busy,setBusy]=useState(false),[error,setError]=useState("");
  if(!course)return <AppShell title="Course not found"><Link href="/courses">Return to courses</Link></AppShell>;
  const analysis=course.analysis;
  async function analyse(){
    if(!files.length)return;setBusy(true);setError("");
    try{
      const form=new FormData();form.append("courseCode",course!.code);form.append("courseTitle",course!.title);files.forEach(file=>form.append("files",file));
      const response=await fetch("/api/analyze-course",{method:"POST",body:form});
      const value=await response.json();if(!response.ok)throw new Error(value.error||"Analysis failed.");
      update({courses:data.courses.map(c=>c.id===id?{...c,materials:[...new Set([...c.materials,...files.map(f=>f.name)])],analysis:value as CourseAnalysis}:c)});
    }catch(e){setError(e instanceof Error?e.message:"Analysis failed.")}finally{setBusy(false)}
  }
  function choose(e:ChangeEvent<HTMLInputElement>){setFiles(Array.from(e.target.files||[]))}
  const covered=analysis?.topics.filter(t=>t.frequency>0).length||0,total=analysis?.topics.length||0,progress=total?Math.round(covered/total*100):0;
  return <AppShell eyebrow={`${course.code} · COURSE MAP`} title={course.title} action={<Link className="back-link" href="/courses"><ArrowLeft/>Courses</Link>}>
    {!analysis?<section className="course-start"><div className="start-copy"><Sparkles/><p className="step-label">START THE COURSE</p><h2>First, let&apos;s map what your examiners repeat.</h2><p>Upload the course&apos;s past questions. Olodo groups every question by topic and year, detects repeated patterns, and builds the shortest pass path.</p><label className="past-upload"><input multiple type="file" accept=".pdf,.txt,.md,.doc,.docx" onChange={choose}/><FileUp/><span><b>{files.length?`${files.length} file${files.length>1?"s":""} selected`:"Choose past-question files"}</b><small>Upload several years together</small></span></label>{files.length>0&&<div className="selected-files">{files.map(f=><span key={f.name}>{f.name}</span>)}</div>}<button className="button" disabled={!files.length||busy} onClick={analyse}>{busy?"Reading every question...":"Analyse and start course"}<Brain/></button>{error&&<p className="form-error">{error}</p>}<small className="upload-caveat">Text-based files work now. Scanned PDFs need OCR support, which is the next ingestion step.</small></div><aside><BookOpen/><b>What you get</b><ol><li>Topics ranked by frequency</li><li>Questions grouped by year</li><li>Repeated examiner patterns</li><li>Theory and calculation paths</li></ol></aside></section>:
    <><section className="course-progress"><div><small>COURSE PASS-PATH</small><b>{progress}% mapped</b></div><div className="progress-track"><i style={{width:`${progress}%`}}/></div><span>{analysis.totalQuestions} questions · {analysis.topics.length} topics found</span></section><div className="analysis-intro"><Brain/><p>{analysis.summary}</p></div><section className="topic-grid">{analysis.topics.map((topic,index)=><article className="topic-card" key={topic.name}><header><span>0{index+1}</span><em className={topic.kind}>{topic.kind}</em></header><h2>{topic.name}</h2><p><b>{topic.frequency}</b> appearances · {topic.years.join(", ")||"year unknown"}</p><div className="pattern-list"><small>REPEATED PATTERNS</small>{topic.patterns.map(p=><span key={p}>{p}</span>)}</div><details><summary>See {topic.questions.length} grouped questions</summary>{topic.questions.map((q,i)=><blockquote key={i}><b>{q.year||"Unknown year"}</b>{q.question}</blockquote>)}</details><footer><Link href={`/courses/${id}/theory?topic=${encodeURIComponent(topic.name)}`}><NotebookText/>Learn theory</Link><Link href={`/courses/${id}/practice?topic=${encodeURIComponent(topic.name)}`}><Calculator/>Practise calculations</Link></footer></article>)}</section></>}
  </AppShell>
}
