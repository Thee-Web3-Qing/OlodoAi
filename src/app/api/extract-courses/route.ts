import { NextResponse } from "next/server";
import { z } from "zod";
import { createAiClient } from "@/lib/ai/client";
import { env } from "@/lib/env";
const schema=z.object({text:z.string().min(2).max(20000)});
export async function POST(request:Request){try{const{text}=schema.parse(await request.json());const client=createAiClient();const response=await client.chat.completions.create({model:env.AI_MODEL||"qwen-plus",response_format:{type:"json_object"},messages:[{role:"system",content:"Extract academic courses from the supplied timetable or pasted text. Return JSON only: {\"courses\":[{\"code\":\"MTH 201\",\"title\":\"Engineering Mathematics\",\"examDate\":\"ISO date when explicit, otherwise empty\"}]}. Remove duplicates. Never invent titles or dates; use 'Course title unavailable' when missing."},{role:"user",content:text}]});const content=response.choices[0]?.message?.content;if(!content)throw new Error("Qwen returned no courses.");return NextResponse.json(JSON.parse(content))}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Extraction failed."},{status:400})}}
