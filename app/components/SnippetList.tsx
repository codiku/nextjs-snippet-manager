import { SnippetCard } from "@/components/SnippetCard";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function SnippetList(p: {}) {
  const { userId } = auth();
  console.log("*** the user id ", userId);
  if (userId) {
    const snippets = await db.snippet.findMany({ where: { userId: userId } });
    return (
      <div className="p-20 flex flex-wrap gap-y-20 gap-x-6">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    );
  } else {
    return "No user found";
  }
}
