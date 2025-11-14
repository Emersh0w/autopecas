import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { AUTO_PARTS_SYSTEM_PROMPT } from "./systemPrompt";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-5-nano"),
    system: AUTO_PARTS_SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
