import OpenAI from "openai";
import { env } from "@/lib/env";

export function createAiClient() {
  if (!env.AI_API_KEY || !env.AI_BASE_URL) throw new Error("AI provider is not configured.");
  return new OpenAI({ apiKey: env.AI_API_KEY, baseURL: env.AI_BASE_URL });
}
