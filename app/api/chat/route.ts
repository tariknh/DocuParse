import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { partialObjectStream } = await streamObject({
    model: openai("gpt-4-turbo"),
    system:
      "Clean the data to fit the object, if the row isnt complete dont include it.",
    prompt: messages,
    schema: z.object({
      Forsikringsnr: z.string().describe("Unique insurance number"),
      Dato: z
        .string()
        .describe(
          "Date of the incident or insurance record (e.g., 01/02/2021)"
        ),
      Lokasjon: z
        .string()
        .describe('Location description, such as "Tettsted" or "Landlig"'),
      Stat: z
        .string()
        .describe('State or region abbreviation (e.g., "NY", "WI")'),
      Region: z.string().describe('Geographical region, like "Øst" or "Vest"'),
      Forsikringssum: z
        .number()
        .describe("Insurance amount in currency (e.g., 1617630)"),
      Skadeverk: z
        .string()
        .describe(
          'Type of damage (e.g., "Bærekonstruksjon" or "Brannmotstand")'
        ),
      Virksomhet: z
        .string()
        .describe(
          'Type of business or property affected (e.g., "Varehandel", "Leilighet")'
        ),
      "Årsak vind?": z
        .enum(["Y", "N"])
        .describe('Was wind a cause? "Y" for Yes, "N" for No'),
      "Årsak flom?": z
        .enum(["Y", "N"])
        .describe('Was flood a cause? "Y" for Yes, "N" for No'),
    }),
  });

  for await (const partialObject of partialObjectStream) {
    console.clear();
    console.log(partialObject);
  }
  // const result = await streamText({
  //   model: openai("gpt-4o"),
  //   system:
  //     "Output the given data in a database do not respond on markdown or lists, keep your responses brief, you can ask the user to upload images or documents if it could help you understand the problem better",
  //   messages: convertToCoreMessages(messages),
  // });

  // return result.toDataStreamResponse();
  return partialObjectStream.toJsonResponse();
}
