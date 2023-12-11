import { db } from "@/lib/db";
import { ApiResponse } from "@/types/response";
import { auth } from "@clerk/nextjs";
import { Snippet } from "@prisma/client";

export const deleteMySnippet = async (
  id: number
): Promise<ApiResponse<Snippet>> => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        error: true,
        status: 401,
        message: "User not logged",
      };
    }
    const deletedSnippet = await db.snippet.delete({ where: { id, userId } });
    return {
      data: deletedSnippet,
    };
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Something went wrong when deleting the snippet",
    };
  }
};
