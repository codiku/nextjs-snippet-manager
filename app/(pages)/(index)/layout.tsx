import { Header } from "@/components/Header";
import { Nav } from "@/components/Nav";

export default function SnippetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="flex p-8">
        <Nav />
        <div className="ml-8 w-full">{children}</div>
      </div>
    </div>
  );
}
