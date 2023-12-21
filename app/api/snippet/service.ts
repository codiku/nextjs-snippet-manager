import { db } from "@/app/lib/db";

export async function readAllSnippet() {
  return await db.snippet.findMany();
}
