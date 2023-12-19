import { Header } from "@/app/components/Header/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      Auth Layout
      {children}
    </div>
  );
}
