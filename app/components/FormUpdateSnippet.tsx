"use client";

import { TECHNO_MAPPER } from "@/constant";

import { Snippet, Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateSnippetServAction } from "@/api/snippets/[id]/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ErrorMessage } from "@hookform/error-message";
import { FieldError } from "./FieldError";

const formSchema = z.object({
  title: z.string().min(1),
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
      <label>Title</label>
      <input {...register("title")} />
      <FieldError errors={errors} name="title" />
    </div>
  );

  const technoSelect = (
    <div className="space-y-3 w-80">
      <label>Framework / Technology / Language</label>
      <select {...register("technology")}>
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

  const textareaContent = (
    <div className="space-y-3">
      <label>Content</label>
      <textarea {...register("content")} className="h-96" />
      <FieldError errors={errors} name="content" />
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
        {technoSelect}
        {textareaContent}
      </div>
      <div className="flex justify-end ">
        <button>Save</button>
      </div>
    </form>
  );
}
