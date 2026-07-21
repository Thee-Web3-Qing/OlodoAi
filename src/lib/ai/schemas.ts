import { z } from "zod";

export const solutionRoadmapSchema = z.object({
  target: z.object({ symbol: z.string(), meaning: z.string(), unit: z.string().optional() }),
  knownValues: z.array(z.object({ symbol: z.string(), value: z.number(), unit: z.string().optional(), source: z.string() })),
  steps: z.array(z.object({ position: z.number().int().positive(), find: z.string(), formula: z.string(), reason: z.string() })),
  finalAnswer: z.string().optional(),
});

export type SolutionRoadmap = z.infer<typeof solutionRoadmapSchema>;
