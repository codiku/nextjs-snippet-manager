import { readSnippet } from "@/api/snippets/[id]/service";
import { FormUpdateSnippet } from "@/components/FormUpdateSnippet";

export default async function UpdateSnippetPage(p: { params: { id: string } }) {
  const { data: snippet } = await readSnippet(Number(p.params.id));
  return <FormUpdateSnippet snippet={snippet!} />;
}
