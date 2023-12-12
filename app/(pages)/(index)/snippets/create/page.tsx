"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TECHNO_MAPPER } from "@/constant";

import { ApiResponse } from "@/types/response";
import { Snippet, Technology } from "@prisma/client";
import { FormEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ky from "ky";
import { z } from "zod";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  technology: z.nativeEnum(Technology),
});

export default function CreateSnippetPage() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(
      formData.entries()
    ) as typeof formSchema._type;

    if (formSchema.safeParse(formValues).success) {
      // Retrieve associated language
      const language = TECHNO_MAPPER[formValues.technology].language;
      // Create the snippet
      const createdSnippet: ApiResponse<Snippet> = await ky
        .post("/api/snippets", {
          json: {
            ...formValues,
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
    } else {
      toast({
        duration: 1000,
        description: "Please fill all fields",
        variant: "destructive",
      });
    }
  };

  const technoSelect = (
    <div className="space-y-3 w-60">
      <Label>Language / Framework / Library</Label>
      <Select name="technology">
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(TECHNO_MAPPER).map((techno) => {
            return (
              <SelectItem key={techno} value={techno} className="flex">
                <div>{TECHNO_MAPPER[techno].label}</div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );

  const titleInput = (
    <div className="space-y-3 w-72">
      <Label>Title</Label>
      <Input type="text" name="title" />
    </div>
  );

  const textareaContent = (
    <div className="space-y-3">
      <Label>Content</Label>
      <Textarea name="content" className="h-96" />
    </div>
  );
  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-[50rem] ">
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
  );
}
