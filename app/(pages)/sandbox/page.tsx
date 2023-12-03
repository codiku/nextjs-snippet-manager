import { SnippetCard } from "@/components/SnippetCard";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export default async function Sandbox(p: {}) {
  const snippets = await db.snippet.findMany();
  return (
    <div className="p-20 grid grid-cols-5 gap-y-20 gap-x-6">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
