"use client";
import { SNIPPETS_METADATA } from "@/app/constant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Technology } from "@prisma/client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FieldError } from "@/app/components/FieldError/FieldError";
import { createSnippet } from "@/app/api/snippet/service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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

export default function CreateSnippetPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  async function submit(formData: Form) {
    const { error } = await createSnippet({
      ...formData,
      language: SNIPPETS_METADATA[formData.technology].language,
    });
    if (!error) {
      toast.success("Snippet created successfully");
      router.push("/");
      router.refresh();
    }
  }
  const technoSelect = (
    <div className="space-y-3 w-80">
      <label htmlFor="technology">Framework / Technology / Language</label>
      <select {...register("technology")} id="technology">
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
      <input {...register("title")} id="title" />
      <FieldError errors={errors} name={"title"} />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <label htmlFor="content">Content</label>
      <textarea {...register("content")} id="content" className="h-96 w-full" />
      <FieldError errors={errors} name={"content"} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8 w-[50rem]">
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
