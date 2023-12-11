"use server";

import { Snippet } from "@prisma/client";
import { updateSnippet } from "./service";
import { ApiResponse } from "@/types/response";
import { TECHNO_MAPPER } from "@/constant";
import { updateSnippetFormSchema } from "@/components/FormUpdateSnippet";
import { redirect } from "next/navigation";

export async function updateSnippetServAction(
  id: number,
  formData: FormData
): Promise<ApiResponse<Snippet>> {
  const formValues = Object.fromEntries(
    formData.entries()
  ) as typeof updateSnippetFormSchema._type;
  const language = TECHNO_MAPPER[formValues.technology].language;
  return await updateSnippet(id, { ...formValues, language });
}
