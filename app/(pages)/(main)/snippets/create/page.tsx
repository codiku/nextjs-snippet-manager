"use client";
import { SNIPPETS_METADATA } from "@/app/constant";
import { Technology } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "@/app/components/FieldError/FieldError";
const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "This field should be at least 5 characters long" }),
  content: z
    .string()
    .min(10, { message: "This field should be at least 10 characters long" }),
  technology: z.nativeEnum(Technology, {
    invalid_type_error: "This is not a valid technology",
  }),
});

type Form = typeof formSchema._type;

export default function CreateSnippetPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  function submit(formData: Form) {
    alert(JSON.stringify(formData));
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
