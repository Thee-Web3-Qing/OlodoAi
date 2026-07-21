"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { initialStudentData, loadStudentData, saveStudentData, StudentData } from "@/lib/store";
import { syncStudentData } from "@/lib/supabase/sync";
type Value={data:StudentData;ready:boolean;update:(p:Partial<StudentData>)=>void;reset:()=>void};
const Context=createContext<Value|null>(null);
export function AppProvider({children}:{children:React.ReactNode}){const[data,setData]=useState(initialStudentData);const[ready,setReady]=useState(false);useEffect(()=>{const id=window.setTimeout(()=>{setData(loadStudentData());setReady(true)},0);return()=>window.clearTimeout(id)},[]);function update(p:Partial<StudentData>){setData(c=>{const n={...c,...p};saveStudentData(n);void syncStudentData(n);return n})}function reset(){localStorage.removeItem("olodo-ai-v1");setData(initialStudentData)}return <Context.Provider value={{data,ready,update,reset}}>{children}</Context.Provider>}
export function useApp(){const c=useContext(Context);if(!c)throw new Error("useApp requires AppProvider");return c}
