import { Snippet } from "@prisma/client";
import { db } from "@/app/lib/db";

export async function updateSnippet(
  id: number,
  body: Partial<Omit<Snippet, "id">>
) {
  try {
    const updatedSnippet = await db.snippet.update({
      data: body,
      where: { id },
    });
    return updatedSnippet;
  } catch (err) {
    return {
      error: true,
      status: 500,
      message:
        "Something went wrong updating the snippet " + (err as Error).message,
    };
  }
}

export async function deleteSnippet(id: number) {
  try {
    const deletedSnippet = await db.snippet.delete({
      where: { id },
    });
    return deletedSnippet;
  } catch (err) {
    return {
      error: true,
      status: 500,
      message:
        "Something went wrong deleting the snippet " + (err as Error).message,
    };
  }
}
