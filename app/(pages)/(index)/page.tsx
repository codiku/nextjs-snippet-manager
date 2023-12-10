import { fetchSnippetsByUser } from "@/api/snippets/me/service";
import { SnippetSearch } from "@/components/SnippetSearch";
import { auth } from "@clerk/nextjs";

export default async function IndexPage() {
  const { userId } = auth();
  const snippets = await fetchSnippetsByUser(userId!);

  return <SnippetSearch snippets={snippets} />;
}
