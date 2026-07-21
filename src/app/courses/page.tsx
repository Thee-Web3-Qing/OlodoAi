"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, FileText, NotebookText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useApp } from "@/components/app-provider";
import { CourseExtractor } from "@/components/course-extractor";
import { CourseForm } from "@/components/course-form";
import { readiness } from "@/lib/store";

export default function Courses() {
  const { data } = useApp();
  return <AppShell eyebrow="SEMESTER OVERVIEW" title="Every course. One pass path." action={<CourseForm />}>
    <CourseExtractor />
    {data.courses.length ? <div className="catalog-grid">{data.courses.map((course, index) => <article className="catalog-card" key={course.id}>
      <div className="catalog-top"><span>0{index + 1}</span><BookOpen /></div>
      <p>{course.code}</p><h2>{course.title}</h2>
      <div className="catalog-stats"><span><b>{course.materials.length}</b>materials</span><span><b>{Math.max(0, course.estimatedHours - course.completedHours)}</b>hours left</span></div>
      <div className="mini-progress"><i style={{ width: `${readiness(course)}%` }} /></div>
      <footer><span>{readiness(course)}% pass-path progress</span><div>
        <Link href="/materials"><FileText />Files</Link>
        <Link className="theory-link" href={`/courses/${course.id}/theory`}><NotebookText />Theory</Link>
        <Link className="learn-link" href={`/courses/${course.id}`}><Calculator />Calculations <ArrowRight /></Link>
      </div></footer>
    </article>)}</div> : <section className="product-empty"><BookOpen /><h2>No courses yet</h2><p>Paste your timetable above or add a course manually.</p><CourseForm /></section>}
  </AppShell>;
}
