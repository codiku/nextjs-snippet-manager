import { Header } from "@/app/components/Header/Header";
import { Nav } from "@/app/components/Nav/Nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="flex p-8">
        <Nav />
        {children}
      </div>
    </div>
  );
}
