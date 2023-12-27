"use client";

import { SearchBar } from "../SearchBar/SearchBar";

export function SnippetSearch(p: {}) {
  return (
    <div>
      <SearchBar onChange={(query) => console.log(query)} />
    </div>
  );
}
