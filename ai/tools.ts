import { openai } from "@ai-sdk/openai";
import { tool as createTool, generateObject, generateText } from "ai";
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

const rateAnswer = async (answer: string, keyTopics: string[]) => {
  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      score: z.number(),
      coveredTopics: z.array(
        z.object({ topic: z.string(), coverScore: z.number().lte(3) })
      ),
    }),
    prompt: `Based on the following topics: ${keyTopics}, return a score from 0-100 and the topics that were covered from 0-3 given the following explanation: ${answer} `,
  });

  return { object };
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
    const { object } = await rateAnswer(answer, keyTopics);
    console.log(object.score, object.coveredTopics);
    // console.log(
    //   keyTopics,
    //   "keyTopics",
    //   score,
    //   "score",
    //   matchedTopics,
    //   "matchedtopics"
    // );

    return {
      keyTopics,
      feedback: `Your answer covered ${object.score} percent `,
    };
  },
});

export const tools = {
  displayWeather: weatherTool,
  analyzeAnswerTool: analyzeAnswerTool,
};
