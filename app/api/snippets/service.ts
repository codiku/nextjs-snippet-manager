import { db } from "@/lib/db";
import { ApiResponse } from "@/types/response";
import { auth } from "@clerk/nextjs";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from "zod";

export const readAllSnippet = async (): Promise<ApiResponse<Snippet[]>> => {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return {
    //     error: true,
    //     status: 401,
    //     message: "User not logged",
    //   };
    // }
    const snippet = await db.snippet.findMany();
    return {
      data: snippet,
    };
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Something went wrong when fetching snippets",
    };
  }
};

const createSnippetSchema = z.object({
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
      error: true,
      status: 500,
      message: "Something went wrong when creating the snippet",
    };
  }
};
