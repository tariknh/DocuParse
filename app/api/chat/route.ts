import { tools } from "@/ai/tools";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(request: Request) {
  const { messages } = await request.json();
  console.log(request, "request");
  const { inputAnswer } = await request.body();
  console.log(inputAnswer);

  const result = await streamText({
    model: openai("gpt-4o"),
    system: "You are a friendly assistant!",
    prompt: ` ${messages} ${inputAnswer}`,
    tools,
    toolChoice: "required",
  });

  console.log(result.fullStream);

  return result.toDataStreamResponse();
}
