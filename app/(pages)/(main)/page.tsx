import { SnippetSearch } from "@/app/components/SnippetSearch/SnippetSearch";
export default function MainPage(p: {}) {
  // const snippets = await readAllSnippet();
  return (
    <div>
      <SnippetSearch placeholder={`Search your snippets`} />
    </div>
  );
}
