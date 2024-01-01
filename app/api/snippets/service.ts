import { db } from "@/lib/db";
import { ApiResponse } from "@/types/response";
import { auth } from "@clerk/nextjs";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from "zod";

export const readAllSnippetsSchema = z.object({
  name: z.string().optional(),
  userId: z.string(),
});
export const readAllSnippet = async (
  queryParams: typeof readAllSnippetsSchema._type
): Promise<ApiResponse<Snippet[]>> => {
  try {
    readAllSnippetsSchema.parse(queryParams);

    const snippet = await db.snippet.findMany({ where: { ...queryParams } });

    return {
      data: snippet,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message:
        "Something went wrong when fetching snippets " +
        (error as Error).message,
    };
  }
};

const createSnippetSchema = z.object({
  name: z.string(),
  content: z.string(),
  title: z.string(),
  language: z.nativeEnum(Language),
  technology: z.nativeEnum(Technology),
});

export const createSnippet = async (
  body: typeof createSnippetSchema._type
): Promise<ApiResponse<Snippet>> => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        data: null,
        error: true,
        status: 401,
        message: "User not signed in",
      };
    }

    createSnippetSchema.parse(body);

    const snippetCreated = await db.snippet.create({
      data: {
        ...body,
        userId,
      },
    });
    return {
      data: snippetCreated,
      message: "Snippet created successfully",
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message: "Something went wrong when creating the snippet",
    };
  }
};
