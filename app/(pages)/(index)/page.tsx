import { SearchBar } from "@/components/SearchBar";
import { SnippetCard } from "@/components/SnippetCard";
import SnippetList from "@/components/SnippetList";

export default function Home() {
  return (
    <main>
      <SearchBar />
      <SnippetList />
    </main>
  );
}
