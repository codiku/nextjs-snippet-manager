import { SnippetDetail } from "@/components/SnippetDetail";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function SnippetDetailPage(p: { params: { id: string } }) {
  const { userId } = auth();

  const snippet = await db.snippet.findFirst({
    where: { userId: userId!, id: Number(p.params.id) },
  });

  if (!snippet) {
    return <div>No snippet found...</div>;
  }

  return <SnippetDetail snippet={snippet} />;
}
