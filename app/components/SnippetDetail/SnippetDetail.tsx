import { SNIPPETS_METADATA } from "@/app/constant";
import { Snippet } from "@prisma/client";
import Image from "next/image";
import { Prism as SynthaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export function SnippetDetail(p: { snippet: Snippet }) {
  const snippetMetadata = SNIPPETS_METADATA[p.snippet.technology];

  const codeHighLighter = (
    <SynthaxHighlighter
      showLineNumbers
      style={theme}
      language={p.snippet.language}
    >
      {p.snippet.content}
    </SynthaxHighlighter>
  );
  const title = (
    <div className="flex space-x-4">
      <Image
        className="w-10"
        src={snippetMetadata.src}
        alt="Programming language image"
      />
      <h1>{p.snippet.title}</h1>
    </div>
  );
  return (
    <div>
      {title}
      <div className="mt-10">{codeHighLighter}</div>
    </div>
  );
}
