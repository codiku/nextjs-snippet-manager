"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { CreateSnippetResponse, create } from "./action";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function NewSnippetPage(p: {}) {
  const [formResponse, formAction] = useFormState<
    CreateSnippetResponse,
    FormData
  >(create, { message: undefined });
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (formResponse.message) {
      toast({
        duration: 1000,
        description: formResponse.error
          ? "Error while trying to generate code metadata"
          : "Metadata found",
        variant: formResponse.error ? "destructive" : "default",
      });
    }
  }, [formResponse, toast]);

  const saveSnippet = async () => {
    await (await fetch("/api/snippets", { method: "POST" })).json();
  };

  return (
    <form
      ref={formRef}
      method="POST"
      action={formAction}
      className="space-y-6 w-[50rem] "
    >
      <h1>New snippet</h1>
      <div className="space-y-3">
        <Label>Content</Label>
        <Textarea
          name="code"
          className="h-96"
          onPaste={(e) => {
            setTimeout(() => {
              formRef.current?.requestSubmit();
            }, 300);
          }}
        />
      </div>
      <div className="space-y-3 w-72">
        <Label>Title</Label>
        <Input
          defaultValue={formResponse.data?.title}
          type="text"
          name="title"
        />
      </div>
      <div className="space-y-3 w-52">
        <Label>Programming language</Label>
        <Input
          defaultValue={formResponse.data?.language}
          type="text"
          name="language"
        />
      </div>
      <div className="flex justify-end ">
        <Button variant="secondary" onClick={saveSnippet}>
          Save
        </Button>
      </div>
    </form>
  );
}
