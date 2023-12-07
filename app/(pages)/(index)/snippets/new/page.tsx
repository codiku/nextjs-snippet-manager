import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSnippetPage(p: {}) {
  return (
    <form>
      <h1>New snippet</h1>
      <Label>Content</Label>
      <Textarea placeholder="main() { console.log('hello world') } " />
      <Label htmlFor="email">Title</Label>
      <Input type="text" placeholder="Title" name="Title" />
      <Label htmlFor="email">Programming language</Label>
      <Input
        type="text"
        name="programming language"
        placeholder="Programming language"
      />
    </form>
  );
}
