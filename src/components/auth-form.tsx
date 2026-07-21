"use client";
import { FormEvent,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight,Eye,EyeOff } from "lucide-react";
import { Brand } from "@/components/brand";
import { useApp } from "@/components/app-provider";
import { createBrowserSupabaseClient,isSupabaseConfigured } from "@/lib/supabase/client";

export function AuthForm({signup=false,mode}:{signup?:boolean;mode?:"login"|"signup"}){
  signup=signup||mode==="signup";
  const router=useRouter(),{data,ready,update}=useApp();const[name,setName]=useState(data.name),[email,setEmail]=useState(data.email),[password,setPassword]=useState(""),[show,setShow]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState("");
  async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");try{if(isSupabaseConfigured()){const supabase=createBrowserSupabaseClient();if(signup){const{error}=await supabase.auth.signUp({email,password,options:{data:{name}}});if(error)throw error}else{const{error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error}}update({name,email});router.push(signup?"/onboarding":"/dashboard")}catch(e){setError(e instanceof Error?e.message:"Authentication failed.")}finally{setBusy(false)}}
  return <main className="auth-page"><section className="auth-aside"><Brand light/><div><span className="kicker">ZERO SHAME. CLEAR STEPS.</span><h1>Start where you are.<br/>Pass what&apos;s ahead.</h1><p>Your course materials become a private, past-question-first study plan built around the hours you actually have.</p></div><blockquote>&ldquo;Tell me what to learn, why I need it, and exactly what formula comes next.&rdquo;</blockquote></section><section className="auth-main"><div className="auth-card"><p className="step-label">{signup?"CREATE YOUR ACCOUNT":"WELCOME BACK"}</p><h2>{signup?"Let's build your pass plan.":"Continue your mission."}</h2><p className="muted">{signup?"Your cloud account keeps your plan across devices.":"Log in to continue your saved pass plan."}</p><form onSubmit={submit}>{signup&&<label>First name<input required value={name} onChange={e=>setName(e.target.value)}/></label>}<label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<div className="password-field"><input required minLength={6} type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div></label>{error&&<p className="form-error">{error}</p>}<button className="button full" disabled={!ready||busy}>{busy?"Please wait...":signup?"Continue to setup":"Log in"}<ArrowRight/></button></form><p className="auth-switch">{signup?"Already have an account?":"New to Olodo AI?"} <Link href={signup?"/login":"/signup"}>{signup?"Log in":"Create account"}</Link></p></div></section></main>
}
