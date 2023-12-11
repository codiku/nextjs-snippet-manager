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

import { Snippet, Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateSnippetServAction } from "@/api/snippets/[id]/actions";
import { toast } from "./ui/use-toast";

export const updateSnippetFormSchema = z
  .object({
    title: z.string(),
    content: z.string(),
    technology: z.nativeEnum(Technology),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one value must be provided",
  });

export function FormUpdateSnippet(p: { snippet: Snippet }) {
  const router = useRouter();
  const handleFormAction = async (formData: FormData) => {
    const updatedSnippet = await updateSnippetServAction.bind(
      null,
      p.snippet.id
    )(formData);

    toast({
      description: (
        <ul>
          {updatedSnippet.message?.split(",").map((msg) => (
            <li>{msg}</li>
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

  const renderTechnoSelect = () => {
    return (
      <>
        <Label>Language / Framework / Library</Label>
        <Select name="technology" defaultValue={p.snippet.technology}>
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
      </>
    );
  };
  return (
    <form action={handleFormAction} className="space-y-8 w-[50rem] ">
      <div className="space-y-6">
        <h1>Update snippet</h1>
        <div className="space-y-3 w-72">
          <Label>Title</Label>
          <Input type="text" name="title" defaultValue={p.snippet.title} />
        </div>
        <div className="space-y-3 w-60">{renderTechnoSelect()}</div>
        <div className="space-y-3">
          <Label>Content</Label>
          <Textarea
            defaultValue={p.snippet.content}
            name="content"
            className="h-96"
          />
        </div>
      </div>

      <div className="flex justify-end ">
        <Button variant="secondary">Save</Button>
      </div>
    </form>
  );
}
