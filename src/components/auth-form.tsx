"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Brand } from "@/components/brand";
import { useApp } from "@/components/app-provider";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const { data, ready, update } = useApp();
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const signup = mode === "signup";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) return;
    const destination = data.onboardingComplete ? "/dashboard" : "/onboarding";
    update({ authenticated: true, name: name.trim() || email.split("@")[0], email: email.trim() });
    router.replace(destination);
  }

  return <main className="auth-page"><section className="auth-aside"><Brand light/><div><span className="kicker">ZERO SHAME. CLEAR STEPS.</span><h1>Start where you are.<br/>Pass what&apos;s ahead.</h1><p>Your course materials become a private, past-question-first study plan built around the hours you actually have.</p></div><blockquote>&ldquo;Tell me what to learn, why I need it, and exactly what formula comes next.&rdquo;</blockquote></section><section className="auth-main"><div className="auth-card"><p className="step-label">{signup ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</p><h2>{signup ? "Let&apos;s build your pass plan." : "Continue your mission."}</h2><p className="muted">{signup ? "You&apos;ll tailor your courses and schedule next." : "Use the details you created on this device."}</p><form onSubmit={submit}>{signup&&<label>First name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="What should we call you?"/></label>}<label>Email address<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Password<div className="password-field"><input required minLength={6} type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/><button type="button" onClick={()=>setShow(!show)} aria-label="Toggle password">{show?<EyeOff/>:<Eye/>}</button></div></label><button className="button full" type="submit" disabled={!ready}>{ready?(signup?"Continue to setup":"Log in"):"Loading..."}<ArrowRight size={18}/></button></form><p className="auth-switch">{signup?"Already have an account?":"New to Olodo AI?"} <Link href={signup?"/login":"/signup"}>{signup?"Log in":"Create account"}</Link></p><small className="local-note">Early-access mode stores this account on this device. Cloud authentication connects when Supabase is configured.</small></div></section></main>;
}
