import { SnippetSearch } from "@/components/SnippetSearch";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Language, Technology } from "@prisma/client";

export default async function SnippetByLngPage(p: {
  params: { technology: Technology };
}) {
  const { userId } = auth();
  const snippets = await db.snippet.findMany({
    where: { userId: userId!, technology: p.params.technology },
  });

  return <SnippetSearch snippets={snippets} />;
}
