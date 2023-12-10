import { cache } from "react";
import { db } from "./db";

export const fetchSnippets = cache(async (userId: string) => {
  return await db.snippet.findMany({ where: { userId: userId! } });
});
