"use client";
import Link from "next/link";
import { ArrowRight,BookOpen,FileText,Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useApp } from "@/components/app-provider";
import { CourseExtractor } from "@/components/course-extractor";
import { readiness } from "@/lib/store";
export default function Courses(){const{data}=useApp();return <AppShell eyebrow="SEMESTER OVERVIEW" title="Every course. One pass path." action={<Link className="button small" href="/onboarding"><Plus/>Add course</Link>}><CourseExtractor/>{data.courses.length?<div className="catalog-grid">{data.courses.map((c,index)=><article className="catalog-card" key={c.id}><div className="catalog-top"><span>0{index+1}</span><BookOpen/></div><p>{c.code}</p><h2>{c.title}</h2><div className="catalog-stats"><span><b>{c.materials.length}</b>materials</span><span><b>{Math.max(0,c.estimatedHours-c.completedHours)}</b>hours left</span></div><div className="mini-progress"><i style={{width:`${readiness(c)}%`}}/></div><footer><span>{readiness(c)}% pass-path progress</span><div><Link href="/materials"><FileText/>Files</Link><Link className="learn-link" href={`/courses/${c.id}`}>Learn course <ArrowRight/></Link></div></footer></article>)}</div>:<section className="product-empty"><BookOpen/><h2>No courses yet</h2><p>Paste your timetable above or add courses manually.</p><Link className="button" href="/onboarding">Add manually</Link></section>}</AppShell>}
