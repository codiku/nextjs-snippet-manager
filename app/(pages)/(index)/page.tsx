import { fetchSnippetCurrUser } from "@/api/snippets/me/action";

import { SnippetSearch } from "@/components/SnippetSearch";

export default async function IndexPage() {
  const { data: snippets } = await fetchSnippetCurrUser();
  return <SnippetSearch snippets={snippets!} />;
}
