"use client";
import { SearchBar } from "@/components/SearchBar";
import SnippetList from "@/components/SnippetList";
import { Snippet } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ky from "ky";
import { usePathname } from "next/navigation";
import { ApiResponse } from "@/types/response";

function fetcher<T>(url: string) {
  return ky.get(url, { next: { tags: ["snippets-me"] } }).json<T>();
}
// let isFirstRender = true;
export function SnippetSearch(p: { snippets: Snippet[] }) {
  const [snippets, setSnippets] = useState<Snippet[]>(p.snippets);
  /*
  const fetchMySnippets = async () => {
    const snippetsResp = await ky
      .get("/api/snippets/me")
      .json<ApiResponse<Snippet[]>>();
    if (snippetsResp.data) setSnippets(snippetsResp.data);
  };
  */
  /*const {
    data: snippets,
    mutate,
    error,
  } = useSWR<Snippet[]>("/api/snippets/me", fetcher, {
    fallbackData: p.snippets,
    revalidateOnMount: !isFirstRender,
  });*/
  /* useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
    } else {
      fetchMySnippets();
    }
  }, []);
*/
  const [currSearchQuery, setCurrSearchQuery] = useState<string>("");
  const filteredSnippets = snippets!.filter((s) =>
    [s.language, s.title, s.content].some((field) =>
      field.toLowerCase().includes(currSearchQuery?.toLowerCase())
    )
  );

  return (
    <main className="flex flex-col h-[90vh] ">
      <SearchBar onChange={setCurrSearchQuery} />
      <div className="overflow-y-auto ">
        {filteredSnippets.length > 0 ? (
          <SnippetList snippets={filteredSnippets} />
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            {"You don't have any snippet !"}
            <Link
              href="/snippets/create"
              className="underline underline-offset-4 text-white"
            >
              Start by creating one
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
