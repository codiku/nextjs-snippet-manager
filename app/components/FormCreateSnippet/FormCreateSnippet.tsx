"use client";
import { RxMagicWand } from "react-icons/rx";
import { SNIPPETS_METADATA } from "@/constant";
import { useForm } from "react-hook-form";
import { ApiResponse } from "@/types/response";
import { Snippet, Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import ky from "ky";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FieldError } from "@/components/FieldError";
import { ClipboardEvent } from "react";
import { genCodeMetadata } from "@/actions/text-cortex";

const MAX_LENGTH_CONTENT = 500;
const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1).max(MAX_LENGTH_CONTENT),
  technology: z.nativeEnum(Technology),
});

type Form = typeof formSchema._type;

export function FormCreateSnippet() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {},
  });
  const content = watch("content");
  const submit = async (formData: Form) => {
    // Retrieve associated language
    const language = SNIPPETS_METADATA[formData.technology].language;
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

  const handleContentPaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("Text");
    if (pastedText.trim().length < MAX_LENGTH_CONTENT) {
      const { title, technology, error } = await genCodeMetadata(pastedText);
      if (!error) {
        setValue("title", title);

        if (SNIPPETS_METADATA[technology]) {
          setValue("technology", technology);
        }
      }
    } else {
      e.preventDefault();
      toast(
        "Can't paste more than " +
          MAX_LENGTH_CONTENT +
          " characters ( AI ain't cheap )"
      );
    }
  };

  const technoSelect = (
    <div className="space-y-3 w-80">
      <label htmlFor="technology" className="flex space-x-4">
        <div>Framework / Technology / Language</div> <RxMagicWand />
      </label>
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
    <div className="space-y-3">
      <label htmlFor="title" className="flex items-center space-x-4">
        <div>Title</div> <RxMagicWand />
      </label>
      <input {...register("title")} id="title" />
      <FieldError errors={errors} name="title" />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <label htmlFor="content">Content</label>
      <textarea
        {...register("content")}
        id="content"
        className="h-96 w-full"
        onPaste={handleContentPaste}
      />
      <FieldError errors={errors} name="content" />
    </div>
  );
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8 w-[50rem] ">
      <div className="space-y-6">
        <h1>New snippet</h1>
        {textareaContent}
        {content && inputTitle}
        {content && technoSelect}
      </div>
      <div className="flex justify-end">
        <button>Save</button>
      </div>
    </form>
  );
}
