export const env = {
  AI_API_KEY: process.env.AI_API_KEY || process.env.QWEN_API_KEY,
  AI_BASE_URL: process.env.AI_BASE_URL || "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
  AI_MODEL: process.env.AI_MODEL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
