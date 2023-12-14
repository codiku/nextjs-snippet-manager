import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const montserrat = Montserrat({ subsets: ["latin"] });
import { Toaster } from "sonner";

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
        elements: {
          header: "child:text-white",
          footerActionText: "text-white",
          card: "bg-main-700 shadow-none",
          formFieldLabel: "text-white",
          footerActionLink: { color: "#ff8f57" },
        },
      }}
    >
      <html lang="en">
        <body className={`${montserrat.className}`}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
