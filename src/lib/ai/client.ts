import OpenAI from "openai";
import { env } from "@/lib/env";

export function createAiClient() {
  if (!env.AI_API_KEY) throw new Error("Qwen is not configured. Add AI_API_KEY to the server environment.");
  return new OpenAI({ apiKey: env.AI_API_KEY, baseURL: env.AI_BASE_URL || "https://dashscope-intl.aliyuncs.com/compatible-mode/v1" });
}
