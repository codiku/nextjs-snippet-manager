"use client";
import { SNIPPETS_METADATA } from "@/app/constant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Snippet, Technology } from "@prisma/client";
import { useForm } from "react-hook-form";
import { FieldError } from "@/app/components/FieldError/FieldError";
import { createSnippet } from "@/app/api/snippet/service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateSnippet } from "@/app/api/snippet/[id]/service";
const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "This field must be at least 5 characters" }),
  content: z
    .string()
    .min(10, { message: "This field must be at least 10 characters" }),
  technology: z.nativeEnum(Technology),
});

type Form = typeof formSchema._type;

export function FormUpdateSnippet(p: { snippet: Snippet }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  async function submit(formData: Form) {
    const { error } = await updateSnippet(p.snippet.id, formData);
    if (!error) {
      toast.success("Snippet updated successfully");
      router.push("/");
      router.refresh();
    }
  }
  const technoSelect = (
    <div className="space-y-3 w-80">
      <label htmlFor="technology">Framework / Technology / Language</label>
      <select
        {...register("technology")}
        id="technology"
        defaultValue={p.snippet.technology}
      >
        {Object.keys(SNIPPETS_METADATA).map((techno) => {
          const { technology: value, label } = SNIPPETS_METADATA[techno];
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <FieldError errors={errors} name={"technology"} />
    </div>
  );

  const inputTitle = (
    <div className="space-y-3 w-72">
      <label htmlFor="title">Title</label>
      <input {...register("title")} id="title" defaultValue={p.snippet.title} />
      <FieldError errors={errors} name={"title"} />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <label htmlFor="content">Content</label>
      <textarea
        {...register("content")}
        id="content"
        className="h-96 w-full"
        defaultValue={p.snippet.content}
      />
      <FieldError errors={errors} name={"content"} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8 w-[50rem]">
      <div className="space-y-6">
        <h1>Update snippet</h1>
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
