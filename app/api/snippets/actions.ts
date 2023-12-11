import { db } from "@/lib/db";
import { ApiResponse } from "@/types/response";
import { auth } from "@clerk/nextjs";
import { Snippet } from "@prisma/client";

export const readAllSnippet = async (): Promise<ApiResponse<Snippet[]>> => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        error: true,
        status: 401,
        message: "User not logged",
      };
    }
    const snippet = await db.snippet.findMany({ where: { userId: userId } });
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
