import { openai } from "@ai-sdk/openai";
import { tool as createTool, generateText } from "ai";
import { z } from "zod";

export const weatherTool = createTool({
  description: "Display the weather for a location",
  parameters: z.object({
    location: z.string(),
  }),
  execute: async function ({ location }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { weather: "Sunny", temperature: 75, location };
  },
});

const extractKeyTopics = async (question: string) => {
  const response = await generateText({
    model: openai("gpt-4o"),
    prompt: `Identify the key topics for the following question: "${question}". Return a list of essential topics related to this question.`,
  });
  const keyTopics = response.text
    .trim()
    .split(",")
    .map((topic: any) => topic.trim());
  return keyTopics;
};

const rateAnswer = (answer: string, keyTopics: string[]) => {
  const matchedTopics = keyTopics.filter((topic) =>
    answer.toLowerCase().includes(topic.toLowerCase())
  );
  const score = Math.round((matchedTopics.length / keyTopics.length) * 100);
  return { score, matchedTopics };
};

export const analyzeAnswerTool = createTool({
  description:
    "Analyze an answer to a question and return key topics with a relevance score",
  parameters: z.object({
    question: z.string(),
    answer: z.string(),
  }),
  execute: async ({ question, answer }) => {
    const keyTopics = await extractKeyTopics(question);
    const { score, matchedTopics } = await rateAnswer(answer, keyTopics);
    console.log(
      keyTopics,
      "keyTopics",
      score,
      "score",
      matchedTopics,
      "matchedtopics"
    );

    return {
      keyTopics,
      score,
      matchedTopics,
      feedback: `Your answer covered ${matchedTopics.length} out of ${keyTopics.length} key topics.`,
    };
  },
});

export const tools = {
  displayWeather: weatherTool,
  analyzeAnswerTool: analyzeAnswerTool,
};
