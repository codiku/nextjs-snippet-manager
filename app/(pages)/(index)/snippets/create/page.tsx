"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { TECHNO_MAPPER } from "@/constant";
import { useForm } from "react-hook-form";

import { ApiResponse } from "@/types/response";
import { Snippet, Technology } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ky from "ky";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SelectField } from "@/components/SelectField";
import { InputField } from "@/components/InputField";

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  technology: z.nativeEnum(Technology),
});

type Form = typeof formSchema._type;

export default function CreateSnippetPage() {
  const router = useRouter();
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;

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
    toast({
      duration: 1000,
      description: createdSnippet.error
        ? "Snippet created successfully"
        : createdSnippet.message,
      variant: createdSnippet.error ? "destructive" : "default",
    });

    if (!createdSnippet.error) {
      router.push("/");
      router.refresh();
    }
  };

  const technoSelect = (
    <div className="space-y-3 w-60">
      <SelectField
        name="technology"
        label="Frame/Technology/Language"
        options={Object.keys(TECHNO_MAPPER).map((techno) => {
          const { technology: value, label } = TECHNO_MAPPER[techno];
          return {
            value,
            label,
            key: value,
          };
        })}
      />
    </div>
  );

  const titleInput = (
    <div className="space-y-3 w-72">
      <InputField label="Title" name="title" />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <InputField
        as={Textarea}
        label="Content"
        name="content"
        type="text"
        className="h-96"
      />
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="space-y-8 w-[50rem] ">
        <div className="space-y-6">
          <h1>New snippet</h1>
          {titleInput}
          {technoSelect}
          {textareaContent}
        </div>
        <div className="flex justify-end ">
          <Button variant="secondary">Save</Button>
        </div>
      </form>
    </Form>
  );
}
