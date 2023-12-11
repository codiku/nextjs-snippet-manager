import { readAllMySnippet } from "@/api/snippets/me/actions";

import { SnippetSearch } from "@/components/SnippetSearch";

export default async function IndexPage() {
  const { data: snippets } = await readAllMySnippet();
  return <SnippetSearch snippets={snippets!} />;
}
