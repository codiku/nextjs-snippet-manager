"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";
export function SearchBar(p: {
  onChange: (text: string) => void;
  placeholder: string;
}) {
  const t = useTranslations();
  const router = useRouter();
  const input = (
    <div className="relative w-full ">
      <input
        className="pl-10"
        placeholder={p.placeholder}
        onChange={(e) => p.onChange(e.currentTarget.value)}
      />
      <RiSearchLine className="h-5 w-5 absolute top-2 left-3 text-gray-400" />
    </div>
  );
  return (
    <div className="bg-main-900 p-6 rounded-lg flex space-x-4">
      {input}
      <button
        className="min-w-max"
        onClick={() => router.push("/snippets/create")}
      >
        {t("main.addButton")}
      </button>
    </div>
  );
}
