import { readAllSnippet } from "@/app/api/snippet/service";
import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import { SnippetSearch } from "@/app/components/SnippetSearch/SnippetSearch";
export default async function MainPage(p: {}) {
  // const snippets = await readAllSnippet();
  return (
    <div>
      <SnippetSearch placeholder="Search your snippets" />;
    </div>
  );
}
