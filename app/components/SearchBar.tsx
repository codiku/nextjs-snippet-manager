import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar(p: {}) {
  return (
    <div className="bg-main-900 p-6 rounded-lg w-full flex space-x-4">
      <Input placeholder="Search a snippet..." />
      <Button>+ ADD</Button>
    </div>
  );
}
