import { readAllSnippet } from "@/api/snippets/actions";

import { SnippetSearch } from "@/components/SnippetSearch";

export default async function IndexPage() {
  const { data: snippets } = await readAllSnippet();
  return <SnippetSearch snippets={snippets!} />;
}
