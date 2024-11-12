import { tools } from "@/ai/tools";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(request: Request) {
  const { messages, inputAnswer } = await request.json();
  console.log(request, "request");
  console.log(inputAnswer);

  const result = await streamText({
    model: openai("gpt-4o"),
    system:
      "You are a professional university teacher with many years of experience.",
    prompt: `Based on this question: ${messages} I want you to find the most important topics to cover regarding it, and then output them. Afterwards, i want you to review the explanation, with a score percentage from 0-100% given here: ${inputAnswer} You shall also output a color coding on the degree of explanation of each important topic. `,
    tools,
    toolChoice: "required",
  });

  console.log(result.fullStream);

  return result.toDataStreamResponse();
}
