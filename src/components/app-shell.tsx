"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, FolderOpen, GraduationCap, LayoutDashboard, LogOut, Menu, UserRound, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { useApp } from "@/components/app-provider";

const links=[
  {href:"/dashboard",label:"Dashboard",icon:LayoutDashboard},
  {href:"/courses",label:"Courses",icon:BookOpen},
  {href:"/plan",label:"Study plan",icon:CalendarDays},
  {href:"/materials",label:"Materials",icon:FolderOpen},
  {href:"/tutor",label:"Tutor",icon:GraduationCap},
];

export function AppShell({children,title,eyebrow,action}:{children:React.ReactNode;title:string;eyebrow?:string;action?:React.ReactNode}){
  const path=usePathname(),router=useRouter(),{data,ready,reset}=useApp();const[open,setOpen]=useState(false);
  useEffect(()=>{if(ready&&!data.authenticated)router.replace("/login")},[data.authenticated,ready,router]);
  if(!ready||!data.authenticated)return <main className="route-loading">Preparing your workspace...</main>;
  function logout(){reset();router.replace("/")}
  return <main className="product-shell"><header className="product-header"><Brand/><nav>{links.map(({href,label})=><Link className={path===href?"active":""} href={href} key={href}>{label}</Link>)}</nav><div className="header-user"><Link href="/profile" aria-label="Open profile"><span>{data.name?.[0]?.toUpperCase()||"O"}</span><b>{data.name||"Student"}</b></Link><button onClick={()=>setOpen(!open)} className="menu-button" aria-label="Open navigation">{open?<X/>:<Menu/>}</button></div></header>
  <aside className={open?"mobile-drawer open":"mobile-drawer"}><div>{links.map(({href,label,icon:Icon})=><Link className={path===href?"active":""} href={href} key={href}><Icon/>{label}</Link>)}<Link className={path==="/profile"?"active":""} href="/profile"><UserRound/>Profile</Link></div><button onClick={logout}><LogOut/>Log out</button></aside>{open&&<button className="drawer-backdrop" onClick={()=>setOpen(false)} aria-label="Close navigation"/>}
  <section className="product-main"><div className="page-heading"><div>{eyebrow&&<p className="step-label">{eyebrow}</p>}<h1>{title}</h1></div>{action}</div>{children}</section></main>
}
