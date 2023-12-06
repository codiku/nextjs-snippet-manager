"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiSearchLine } from "react-icons/ri";
import { ChangeEvent, ChangeEventHandler, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export function SearchBar(p: { onChange: (query: string) => void }) {
  const router = useRouter();
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    p.onChange(e.currentTarget.value);
  }
  return (
    <div className="bg-main-900 p-6 rounded-lg flex space-x-4">
      <div className="relative w-full">
        <Input
          onChange={handleOnChange}
          className="pl-12"
          placeholder="Search a snippet..."
        />

        <RiSearchLine className="h-5 w-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      </div>
      <Button onClick={() => router.push("/snippets/new")}>+ ADD</Button>
    </div>
  );
}
