"use server";
import { TextCortexResponse } from "@/types/text-cortex-ai-type";
import { Technology } from "@prisma/client";

type Resp =
  | { title: string; technology: Technology; error?: false }
  | {
      title?: string;
      technology?: Technology;
      error: true;
    };
export async function genCodeMetadata(code: string): Promise<Resp> {
  const codeWithoutLineBreaks = code.replace(/(\r\n|\n|\r)/gm, "");
  const prompt = `An exemple of short good title can be Sort array by first letter or Simple http server or Modal component.Return also the technology(language or framework or library) of the code.Your response should have the following format : title/technology  Example: Find max value in array/python or Generate random value/java  The technology should be in lowercase.Here is a list of all valid technologies :  python javascript java csharp php ruby swift kotlin c cpp bash css nextjs nodejs react rust typescript html. Return a response for this piece of code : ${codeWithoutLineBreaks}`;

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
    )
      .then(async (response) => {
        const r = await response.json();
        console.log("json", r);
        return r;
      })
      .catch((err) => {
        console.log(err);
      });

    const [title, technology] = res.data.outputs[0].text.split("/");
    console.log({
      title,
      technology: technology.toLowerCase() as Technology,
      "token remaining": res.data.remaining_credits,
    });
    return {
      title,
      technology: technology.toLowerCase() as Technology,
    };
  } catch (err) {
    return {
      error: true,
    };
  }
}
