// import { TextCortexResponse } from "@/types/text-cortex-ai-type";

// export type CreateSnippetResponse = {
//   error?: boolean;
//   message?: string;
//   data?: {
//     title: string;
//     language: string;
//   };
// };

// export async function create(
//   prev_: CreateSnippetResponse,
//   formData: FormData
// ): Promise<CreateSnippetResponse> {
//   "use server";
//   const code = formData.get("code")?.toString();

//   try {
//     if (code) {
//       const url = "https://api.textcortex.com/v1/texts/completions";

//       const data = {
//         max_tokens: 512,
//         model: "chat-sophos-1",
//         n: 2,
//         source_lang: "en",
//         target_lang: "en",
//         temperature: 0.65,
//         text: `Find a title for a code snippet.The title should contain both the programming language used and a title that should be short and concise like :'typescript;Replace all values in a string ' or 'python;Find the minimum in an array or number ' or 'java;Scrap products prices on Amazon'. Find a title for : ${code}.`,
//       };
//       const response: TextCortexResponse = await (
//         await fetch(url, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${process.env.TEXT_CORTEX_AI_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         })
//       ).json();

//       const [language, title] = response.data.outputs[0].text.split(";");
//       return { data: { language, title } };
//     } else {
//       return { message: "No code provided", error: true };
//     }
//   } catch (err) {
//     return {
//       message: "An error occurred while creating the snippet",
//       error: true,
//     };
//   }
// }

// export async function create(
//   prev_: CreateSnippetResponse,
//   formData: FormData
// ): Promise<CreateSnippetResponse> {
//   "use server";
//   const code = formData.get("code")?.toString();

// }
