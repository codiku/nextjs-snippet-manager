import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
import { frFR, enUS } from "@clerk/localizations";
export const metadata: Metadata = {
  title: "Snipia",
  description: "The one place for all your code snippets",
};

const clerkI18n = {
  fr: frFR,
  en: enUS,
};
export default function RootLayout(p: {
  children: React.ReactNode;
  params: { locale: "en" | "fr" };
}) {
  return (
    <ClerkProvider
      localization={clerkI18n[p.params.locale]}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#d44700" },
        elements: { card: "bg-main-700 shadow-none" },
      }}
    >
      <html lang={p.params.locale}>
        <body className={inter.className}>
          <Toaster richColors />
          {p.children}
        </body>
      </html>
    </ClerkProvider>
  );
}
