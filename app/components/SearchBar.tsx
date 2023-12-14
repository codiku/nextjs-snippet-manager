"use client";
import { RiSearchLine } from "react-icons/ri";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export function SearchBar(p: { onChange: (query: string) => void }) {
  const router = useRouter();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    p.onChange(e.currentTarget.value);
  }
  const input = (
    <div className="relative w-full">
      <input
        placeholder="Search a snippet..."
        onChange={handleOnChange}
        className="pl-10"
      />
      <RiSearchLine className="h-5 w-5 absolute top-5 left-3 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
  return (
    <div className="bg-main-900 p-6 rounded-lg flex space-x-4">
      {input}
      <button className="w-24" onClick={() => router.push("/snippets/create")}>
        + ADD
      </button>
    </div>
  );
}
