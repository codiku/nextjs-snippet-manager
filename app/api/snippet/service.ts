import { db } from "@/app/lib/db";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from "zod";

const readAllSnippetSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  language: z.nativeEnum(Language).optional(),
  technology: z.nativeEnum(Technology).optional(),
});
export async function readAllSnippet(filters: Partial<Snippet>) {
  try {
    readAllSnippetSchema.parse(filters);
    return await db.snippet.findMany({
      where: {
        ...filters,
      },
    });
  } catch (err) {
    return {
      error: true,
      status: 500,
      message:
        "Something went wrong fetching the snippets " + (err as Error).message,
    };
  }
}

const createSnippetSchema = z.object({
  title: z.string(),
  content: z.string(),
  language: z.nativeEnum(Language),
  technology: z.nativeEnum(Technology),
});
export async function createSnippet(body: Omit<Snippet, "id">) {
  try {
    createSnippetSchema.parse(body);
    const snippetCreated = await db.snippet.create({ data: body });
    return snippetCreated;
  } catch (err) {
    return {
      error: true,
      status: 500,
      message:
        "Something went wrong creating the snippet " + (err as Error).message,
    };
  }
}
