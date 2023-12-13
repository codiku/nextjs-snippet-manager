"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { TECHNO_MAPPER } from "@/constant";

import { Snippet, Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateSnippetServAction } from "@/api/snippets/[id]/actions";
import { toast } from "./ui/use-toast";
import { InputField } from "./InputField";
import { Form } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { SelectField } from "./SelectField";

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  technology: z.nativeEnum(Technology),
});
type Form = typeof formSchema._type;

export function FormUpdateSnippet(p: { snippet: Snippet }) {
  const router = useRouter();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      content: p.snippet.content,
      title: p.snippet.title,
      technology: p.snippet.technology,
    },
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;

  const submitServerAction = async (formData: FieldValues) => {
    const updatedSnippet = await updateSnippetServAction.bind(
      null,
      p.snippet.id
    )(formData as FormData);

    toast({
      description: (
        <ul>
          {updatedSnippet.message?.split(",").map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      ),
      variant: updatedSnippet.error ? "destructive" : "default",
    });
    if (!updatedSnippet.error) {
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

  const inputTitle = (
    <div className="space-y-3 w-72">
      <InputField label="Title" name="title" />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <InputField
        label="Content"
        as={Textarea}
        name="content"
        className="h-96"
      />
    </div>
  );
  return (
    <Form {...form}>
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
          <Button type="submit" variant="secondary">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
