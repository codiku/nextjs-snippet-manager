import { SnippetSearch } from "@/components/SnippetSearch";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Language } from "@prisma/client";

export default async function SnippetByLngPage(p: {
  params: { lng: Language };
}) {
  const { userId } = auth();
  const snippets = await db.snippet.findMany({
    where: { userId: userId!, language: p.params.lng },
  });

  return <SnippetSearch snippets={snippets} />;
}
