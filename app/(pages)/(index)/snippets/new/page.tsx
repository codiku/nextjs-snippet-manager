"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ky from "ky";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TECHNO_MAPPER } from "@/constant";
import { ApiResponse } from "@/types/response";
import { toast } from "@/components/ui/use-toast";
import { Snippet } from "@prisma/client";

export default function NewSnippetPage() {
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get form data
    const form = new FormData(event.currentTarget);
    const formData = Object.fromEntries(form.entries()) as {
      technology: string;
      content: string;
      title: string;
    };
    // Retrieve associated language
    const language = TECHNO_MAPPER[formData.technology].language;
    // Create the snippet
    const resp: ApiResponse<Snippet> = await ky
      .post("/api/snippets", {
        json: {
          ...formData,
          language,
        },
      })
      .json();

    toast({
      duration: 1000,
      description: resp.message,
      variant: resp.error ? "destructive" : "default",
    });
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
    <form onSubmit={submit} className="space-y-8 w-[50rem] ">
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
        <Button variant="secondary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
