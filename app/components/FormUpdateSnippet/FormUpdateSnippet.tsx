"use client";

import { SNIPPETS_METADATA } from "@/constant";

import { Snippet, Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateSnippetServAction } from "@/actions/snippets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "@/components/FieldError";

const formSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(1),
  content: z.string().min(1),
  technology: z.nativeEnum(Technology),
});
export type FormValuesUpdateSnippet = typeof formSchema._type;

export function FormUpdateSnippet(p: { snippet: Snippet }) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValuesUpdateSnippet>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      content: p.snippet.content,
      title: p.snippet.title,
      technology: p.snippet.technology,
      name: p.snippet.name,
    },
  });

  const submitServerAction = async (formData: FormValuesUpdateSnippet) => {
    const updatedSnippet = await updateSnippetServAction(
      p.snippet.id,
      formData
    );

    toast(
      <ul>
        {updatedSnippet.message?.split(",").map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    );
    if (!updatedSnippet.error) {
      router.push("/");
      router.refresh();
    }
  };

  const inputTitle = (
    <div className="space-y-3 w-72">
      <label htmlFor="title">Title</label>
      <input {...register("title")} id="title" />
      <FieldError errors={errors} name="title" />
    </div>
  );

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
      <FieldError errors={errors} name="technology" />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <label htmlFor="content">Content</label>
      <textarea {...register("content")} className="h-96" id="content" />
      <FieldError errors={errors} name="content" />
    </div>
  );

  const inputName = (
    <div className="space-y-3">
      <label htmlFor="name" className="flex items-center space-x-4">
        <div>name</div>
      </label>
      <input {...register("name")} id="name" />
      <FieldError errors={errors} name="name" />
    </div>
  );
  return (
    <form
      onSubmit={handleSubmit(submitServerAction)}
      className="space-y-8 w-[50rem] "
    >
      <div className="space-y-6">
        <h1>Update snippet</h1>
        {inputTitle}
        {inputName}
        {technoSelect}
        {textareaContent}
      </div>
      <div className="flex justify-end ">
        <button>Save</button>
      </div>
    </form>
  );
}
