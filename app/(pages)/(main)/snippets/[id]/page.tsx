import { readSnippet } from "@/app/api/snippet/[id]/service";

export default async function SnippetDetailPage(p: { params: { id: string } }) {
  const { data: snippet } = await readSnippet(Number(p.params.id));
  if (snippet === null) {
    return <div>Snippet not found...</div>;
  }
  return <>{JSON.stringify(snippet)}</>;
}
