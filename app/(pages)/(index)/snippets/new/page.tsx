"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { create } from "./action";

export type NewSnippetForm = {
  message: string | null;
};

export default function NewSnippetPage(p: {}) {
  const [state, formAction] = useFormState<NewSnippetForm, FormData>(create, {
    message: null,
  });

  return (
    <form method="POST" action={formAction} className="space-y-6 w-[50rem]">
      <h1>New snippet</h1>
      <div className="space-y-3">
        <Label>Content</Label>
        <Textarea name="code" className="h-96" />
      </div>
      <div className="space-y-3 w-72">
        <Label>Title</Label>
        <Input disabled type="text" name="title" />
      </div>
      <div className="space-y-3 w-52">
        <Label>Programming language</Label>
        <Input disabled type="text" name="language" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
