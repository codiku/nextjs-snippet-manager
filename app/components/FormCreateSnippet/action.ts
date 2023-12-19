import { TextCortexResponse } from "@/types/text-cortex-ai-type";
import { Language, Technology } from "@prisma/client";

async function genCodeMetadata(): Promise<{
  title: string;
  technology: Technology;
}> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer undefined",
    },
    body: '{"max_tokens":512,"model":"chat-sophos-1","n":1,"source_lang":"en","target_lang":"en","temperature":0.65,"text":"string"}',
  };

  const resp = await fetch(
    "https://api.textcortex.com/v1/texts/completions",
    options
  );
  const jsonResp: TextCortexResponse = await resp.json();

  return {
    title: "",
    technology: "bash",
  };
}
