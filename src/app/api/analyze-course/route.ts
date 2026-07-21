import { NextResponse } from "next/server";
import { z } from "zod";
import { createAiClient } from "@/lib/ai/client";
import { env } from "@/lib/env";

const schema=z.object({courseCode:z.string(),courseTitle:z.string(),documents:z.array(z.object({name:z.string(),text:z.string()})).min(1)});

export async function POST(request:Request){
  try{
    const input=schema.parse(await request.json());
    const source=input.documents.map(d=>`\n--- FILE: ${d.name} ---\n${d.text}`).join("").slice(0,120000);
    const response=await createAiClient().chat.completions.create({
      model:env.AI_MODEL||"qwen-plus",response_format:{type:"json_object"},
      messages:[{role:"system",content:`You analyse university past-question documents. Return JSON only: {"summary":"","totalQuestions":0,"topics":[{"name":"","kind":"theory|calculation|mixed","frequency":0,"years":["2024"],"patterns":[""],"questions":[{"year":"2024","question":""}]}]}. Extract every identifiable question, infer the year from headings or filenames, group questions under accurate syllabus topics, and identify repeated wording, concepts, formula routes, and examiner patterns. Sort topics by frequency. Do not invent questions.`},{role:"user",content:`Course: ${input.courseCode} - ${input.courseTitle}\n${source}`}]
    });
    const content=response.choices[0]?.message?.content;
    if(!content)throw new Error("Qwen returned no course analysis.");
    return NextResponse.json(JSON.parse(content));
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Course analysis failed."},{status:400})}
}
