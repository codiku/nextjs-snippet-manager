"use server";

import { Snippet } from "@prisma/client";
import { updateSnippet } from "../api/snippets/[id]/service";
import { ApiResponse } from "@/types/response";
import { SNIPPETS_METADATA } from "@/constant";
import { FormValuesUpdateSnippet } from "../components/FormUpdateSnippet/FormUpdateSnippet";

export async function updateSnippetServAction(
  id: number,
  formValues: FormValuesUpdateSnippet
): Promise<ApiResponse<Snippet>> {
  const language = SNIPPETS_METADATA[formValues.technology].language;
  return await updateSnippet(id, { ...formValues, language });
}
