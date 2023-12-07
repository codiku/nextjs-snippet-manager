import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export default async function SnippetDetailPage(p: { params: { id: string } }) {
  const { userId } = auth();
  const snippet = await db.snippet.findFirst({
    where: { userId: userId!, id: Number(p.params.id) },
  });

  if (!snippet) {
    return <div>No snippet found...</div>;
  }

  return (
    <div>
      <div className="p-8 mt-10 w-[80‰] border-2 border-main-500 rounded-xl space-y-8">
        <div className="text-xl font-bold">{snippet?.title}</div>
        <div></div>
        <SyntaxHighlighter
          showLineNumbers
          language={snippet.language}
          style={theme}
        >
          {snippet.content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
