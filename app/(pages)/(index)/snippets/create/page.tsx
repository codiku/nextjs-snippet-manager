"use client";
import { TECHNO_MAPPER } from "@/constant";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ApiResponse } from "@/types/response";
import { Snippet, Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import ky from "ky";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FieldError } from "@/components/FieldError";

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  technology: z.nativeEnum(Technology),
});

type Form = typeof formSchema._type;

export default function CreateSnippetPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const submit = async (formData: Form) => {
    // Retrieve associated language
    const language = TECHNO_MAPPER[formData.technology].language;
    // Create the snippet
    const createdSnippet: ApiResponse<Snippet> = await ky
      .post("/api/snippets", {
        json: {
          ...formData,
          language,
        },
      })
      .json();
    toast[createdSnippet.error ? "error" : "info"](
      createdSnippet.error
        ? "Snippet created successfully"
        : createdSnippet.message
    );

    if (!createdSnippet.error) {
      router.push("/");
      router.refresh();
    }
  };

  const technoSelect = (
    <div className="space-y-3 w-80">
      <label className="block mb-2 text-sm font-medium ">
        Framework / Technology / Language
      </label>
      <select
        {...register("technology")}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {Object.keys(TECHNO_MAPPER).map((techno) => {
          const { technology: value, label } = TECHNO_MAPPER[techno];
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <FieldError errors={errors} name="technology" />
    </div>
  );

  const inputTitle = (
    <div className="space-y-3 w-72">
      <label className="block mb-2 text-sm font-medium">Title</label>
      <input
        {...register("title")}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <div className="text-red-500">
        <FieldError errors={errors} name="title" />
      </div>
    </div>
  );

  const textareaContent = (
    <div className="space-y-3 ">
      <label className="block mb-2 text-sm font-medium ">Content</label>
      <textarea
        {...register("content")}
        className="block p-2.5 w-full h-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <div className="text-red-500">
        <FieldError errors={errors} name="content" />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8 w-[50rem] ">
      <div className="space-y-6">
        <h1>New snippet</h1>
        {inputTitle}
        {technoSelect}
        {textareaContent}
      </div>
      <div className="flex justify-end ">
        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
