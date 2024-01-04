import { readSnippet } from "@/app/api/snippet/[id]/service";
import { FormUpdateSnippet } from "@/app/components/FormUpdateSnippet/FormUpdateSnippet";

export default async function UpdateSnippetPage(p: { params: { id: string } }) {
  const { data: snippet } = await readSnippet(Number(p.params.id));
  if (!snippet) {
    return <div className="text-white">No snippet found...</div>;
  }
  return <FormUpdateSnippet snippet={snippet} />;
}
