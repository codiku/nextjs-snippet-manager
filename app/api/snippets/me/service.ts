import { db } from "@/lib/db";

export const fetchSnippetsByUser = async (userId: string) => {
  return await db.snippet.findMany({ where: { userId: userId! } });
};
