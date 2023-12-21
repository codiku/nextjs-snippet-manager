"use server";
import { TextCortexResponse } from "@/types/text-cortex-ai-type";
import { Language, Technology } from "@prisma/client";

type Resp =
  | { title: string; language: Language; error?: false }
  | {
      title?: string;
      language?: Language;
      error: true;
    };
export async function genCodeMetadata(code: string): Promise<Resp> {
  const codeWithoutLineBreaks = code.replace(/(\r\n|\n|\r)/gm, "");

  const prompt = `An exemple of short good title can be Sort array by first letter or Simple http server or Modal component.Return also the language of the code.Your response should have the following format : title,language. No dot at the end. Example: Find max value in array,python or Generate random value,java The language should be in lowercase. No dot at the end. Return a response for this piece of code : ${codeWithoutLineBreaks}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TEXT_CORTEX_AI_API_KEY}`,
    },
    body: `{"max_tokens":128,"model":"chat-sophos-1","n":1,"source_lang":"en","target_lang":"en","temperature":0.65,"text":"${prompt}"}`,
  };

  try {
    const res: TextCortexResponse = await fetch(
      "https://api.textcortex.com/v1/texts/completions",
      options
    ).then((response) => response.json());

    const [title, language] = res.data.outputs[0].text.split(",");
    console.log("response", res.data.outputs[0]);
    return {
      title,
      language: language as Language,
    };
  } catch (err) {
    return {
      error: true,
    };
  }
}
