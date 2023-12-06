import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default async function SnippetDetailPage(p: { params: { id: string } }) {
  const { userId } = auth();
  const snippet = await db.snippet.findFirst({
    where: { userId: userId!, id: Number(p.params.id) },
  });

  return (
    <div>
      <h1>New snippet</h1>
      <div className="p-8 mt-20 w-[80‰] border-2 border-main-500 rounded-xl space-y-8">
        <div className="text-xl font-bold">{snippet?.title}</div>
        <div></div>
        <SyntaxHighlighter language="javascript" style={dark}>
          {snippet!.content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
