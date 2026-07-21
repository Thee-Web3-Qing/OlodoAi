"use client";
import { ChangeEvent,useState } from "react";
import { FileUp,ScanText,Sparkles } from "lucide-react";
import { useApp } from "@/components/app-provider";

export function CourseExtractor(){
  const{data,update}=useApp();const[file,setFile]=useState<File|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState("");
  async function extract(){if(!file)return;setBusy(true);setError("");try{const text=await file.text();const response=await fetch("/api/extract-courses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`Course form filename: ${file.name}\n${text}`})});const value=await response.json();if(!response.ok)throw new Error(value.error||"Extraction failed.");const existing=new Set(data.courses.map(c=>c.code.toLowerCase()));const added=(value.courses as Array<{code:string;title:string;examDate?:string}>).filter(c=>!existing.has(c.code.toLowerCase())).map(c=>({id:crypto.randomUUID(),code:c.code,title:c.title,examDate:c.examDate||"",estimatedHours:12,completedHours:0,materials:[],contentType:"mixed" as const}));update({courses:[...data.courses,...added]});setFile(null)}catch(e){setError(e instanceof Error?e.message:"Extraction failed.")}finally{setBusy(false)}}
  function choose(e:ChangeEvent<HTMLInputElement>){setFile(e.target.files?.[0]||null)}
  return <section className="extractor course-form-upload"><div className="extractor-copy"><ScanText/><span><b>Upload your course form</b><small>Olodo extracts the registered course codes and titles automatically.</small></span></div><label><input type="file" accept=".pdf,.txt,.csv,.md,.doc,.docx" onChange={choose}/><FileUp/>{file?file.name:"Choose course form"}</label><button type="button" disabled={!file||busy} onClick={extract}><Sparkles/>{busy?"Extracting...":"Extract courses"}</button>{error&&<small className="form-error">{error}</small>}</section>
}
