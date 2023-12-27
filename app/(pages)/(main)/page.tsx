import { SnippetCard } from "@/app/components/SnippetCard/SnippetCard";
import { SnippetSearch } from "@/app/components/SnippetSearch/SnippetSearch";
export default function MainPage(p: {}) {
  // const snippets = await readAllSnippet();
  return (
    <div>
      <SnippetSearch placeholder={`Search your snippets`} />

      <SnippetCard
        snippet={{
          id: 1,
          content: "blabla",
          language: "python",
          title: "Sort an array",
          technology: "python",
          userId: "userID132é",
        }}
      />
    </div>
  );
}
