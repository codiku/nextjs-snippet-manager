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
      <label htmlFor="technology">Framework / Technology / Language</label>
      <select {...register("technology")} id="technology">
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
      <label htmlFor="title">Title</label>
      <input {...register("title")} id="title" />
      <FieldError errors={errors} name="title" />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <label htmlFor="content">Content</label>
      <textarea {...register("content")} id="content" className="h-96 w-full" />
      <FieldError errors={errors} name="content" />
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
      <div className="flex justify-end">
        <button>Save</button>
      </div>
    </form>
  );
}
