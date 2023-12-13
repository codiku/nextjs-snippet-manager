"use client";
import { RiSearchLine } from "react-icons/ri";
import { ChangeEvent, ChangeEventHandler, KeyboardEvent } from "react";
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
        className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <RiSearchLine className="h-5 w-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
  return (
    <div className="bg-main-900 p-6 rounded-lg flex space-x-4">
      {input}
      <button
        type="button"
        className="w-20 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg 
         dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={() => router.push("/snippets/create")}
      >
        + ADD
      </button>
    </div>
  );
}
