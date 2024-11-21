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
    prompt: `Identify the key topics for the following question: "${question}". Return a list of essential topics related to this question. Limit the topics to strongly relate to the question.`,
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
    prompt: `Based on the provided key topics: ${keyTopics}, evaluate the quality of the given academic explanation: ${answer}. Provide the following:

An overall score (0-100) reflecting how well the explanation aligns with the key topics and its overall academic quality. The topics that are not so related to the question, will not affect the score too much. 
A topic-by-topic evaluation, assigning a coverage score (0-3) for each topic from ${keyTopics}, where:
0 = Not addressed at all,
1 = Poorly addressed,
2 = Adequately addressed, and
3 = Thoroughly and clearly addressed.`,
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
      object
    };
  },
});

export const tools = {
  displayWeather: weatherTool,
  analyzeAnswerTool: analyzeAnswerTool,
};
