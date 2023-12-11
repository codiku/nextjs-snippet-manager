import { db } from "@/lib/db";
import { ApiResponse } from "@/types/response";
import { auth } from "@clerk/nextjs";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from "zod";

export const deleteSnippet = async (
  id: number
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
    const deletedSnippet = await db.snippet.delete({ where: { id, userId } });
    return {
      data: deletedSnippet,
      message: "Snippet deleted successfully",
    };
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Something went wrong when deleting the snippet",
    };
  }
};

const updateSnippetSchema = z
  .object({
    content: z.string().optional(),
    title: z.string().optional(),
    language: z.nativeEnum(Language).optional(),
    technology: z.nativeEnum(Technology).optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one value must be provided",
  });

export const updateSnippet = async (
  id: number,
  body: typeof updateSnippetSchema._type
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

    updateSnippetSchema.parse(body);

    const updatedSnippet = await db.snippet.update({
      where: { id, userId },
      data: body,
    });

    return {
      data: updatedSnippet,
      message: "Snippet updated successfully",
    };
  } catch (err) {
    return {
      error: true,
      status: 500,
      message: "Something went wrong when updating the snippet ",
    };
  }
};
