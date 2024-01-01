"use server";
import { ApiResponse } from "@/types/response";
import { TextCortexResponse } from "@/types/text-cortex-ai-type";
import { Technology } from "@prisma/client";

export async function genCodeMetadata(
  code: string
): Promise<
  ApiResponse<{ title: string; technology: Technology; name: string }>
> {
  const codeWithoutLineBreaks = code
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/ +/g, " ")
    .replace(/"/g, "'");
  console.log("codeWithoutLineBreaks", codeWithoutLineBreaks);
  const prompt = `An exemple of short good title can be Sort array by first letter or Simple http server or Modal component.Return also the technology(language or framework or library) of the code and a name in keba case.Your response should have the following format : title/technology/name  Example: Find max value in array/python/find-max-value or Generate random value/java/random-value  The technology should be in lowercase.Here is a list of all valid technologies :  python javascript java csharp php ruby swift kotlin c cpp bash css nextjs nodejs react rust typescript html. Return a response for this piece of code : ${codeWithoutLineBreaks}`;

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
        return await response.json();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("***", res.data.outputs);
    const [title, technology, name] = res.data.outputs[0].text.split("/");
    console.log({
      title,
      technology: technology.toLowerCase() as Technology,
      name,
      "token remaining": res.data.remaining_credits,
    });
    return {
      data: {
        name,
        title,
        technology: technology.toLowerCase() as Technology,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error: true,
    };
  }
}
