import { SnippetSearch } from "@/components/SnippetSearch";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  const snippets = await db.snippet.findMany({ where: { userId: userId! } });

  return <SnippetSearch snippets={snippets} />;
}
