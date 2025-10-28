import { Agent } from "@mastra/core/agent";
import { z } from "zod";

// Define schema for input / output if needed
// e.g. validate that you get a string review text
const inputSchema = z.object({
  reviewText: z.string().min(1),
});
const outputSchema = z.object({
  summary: z.string(),
  sentiment: z.enum(["Positive", "Neutral", "Negative"]),
  tags: z.array(z.string()),
});

export const reviewAgent = new Agent({
  name: "ReviewAgent",
  model: "google/gemini-flash-lite-latest",
  instructions: `
    You are an expert book review analyzer.
    When given a review text, you should:
      1. Summarize the review in one or two sentences.
      2. Analyze whether the sentiment is positive / neutral / negative.
      3. Extract up to 2-3 relevant tags or themes from the review.
    Return your answer in JSON with fields summary, sentiment, tags.
  `,
  inputSchema,
  outputSchema,
});
