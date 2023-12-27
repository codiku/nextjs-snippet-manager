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
          language: "java",
          title: "Sort an array",
          technology: "java",
          userId: "userID132é",
        }}
      />
      <SnippetCard
        snippet={{
          id: 2,
          content: "blabla",
          language: "javascript",
          title: "Sort an array",
          technology: "javascript",
          userId: "userID132é",
        }}
      />
      <SnippetCard
        snippet={{
          id: 3,
          content: "blabla",
          language: "typescript",
          title: "Sort an array",
          technology: "typescript",
          userId: "userID132é",
        }}
      />
    </div>
  );
}
