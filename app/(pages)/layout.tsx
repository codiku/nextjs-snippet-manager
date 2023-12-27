import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snipia",
  description: "The one place for all your code snippets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#d44700" },
        elements: { card: "bg-main-700 shadow-none" },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Toaster richColors />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
