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

import { useFormState } from "react-dom";
import { ApiResponse } from "@/types/response";
import { Snippet, Technology } from "@prisma/client";
import { FormEvent, FormEventHandler, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ky from "ky";
import { revalidateTag } from "next/cache";

type Form = { title: string; content: string; technology: Technology };
export default function CreateSnippetPage() {
  const router = useRouter();

  const createSnippet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries()) as Form;
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
    if (!createdSnippet.error) {
      toast({
        duration: 1000,
        description: "Snippet created successfully",
      });
      router.push("/");
      router.refresh();
    } else {
      toast({
        duration: 1000,
        description: createdSnippet.error,
        variant: "destructive",
      });
    }
  };

  const renderTechnoSelect = () => {
    return (
      <>
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
      </>
    );
  };
  return (
    <form onSubmit={createSnippet} className="space-y-8 w-[50rem] ">
      <div className="space-y-6">
        <h1>New snippet</h1>
        <div className="space-y-3 w-72">
          <Label>Title</Label>
          <Input type="text" name="title" />
        </div>
        <div className="space-y-3 w-60">{renderTechnoSelect()}</div>
        <div className="space-y-3">
          <Label>Content</Label>
          <Textarea name="content" className="h-96" />
        </div>
      </div>

      <div className="flex justify-end ">
        <Button variant="secondary">Save</Button>
      </div>
    </form>
  );
}
