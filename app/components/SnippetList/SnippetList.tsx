import { Snippet } from "@prisma/client";
import { SnippetCard } from "../SnippetCard/SnippetCard";

export function SnippetList(p: { snippets: Snippet[] }) {
  return (
    <div className="p-20 flex flex-wrap gap-y-20 gap-x-6">
      {p.snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
