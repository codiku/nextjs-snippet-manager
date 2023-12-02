import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        variables: { colorPrimary: "#FF6C1E" },
        elements: {
          header: "child:text-white",
          footerActionText: "text-white",
          card: "bg-main-700 shadow-none",
          formFieldLabel: "text-white",
        },
      }}
    >
      <html lang="en">
        <body className={`${montserrat.className} bg-main-800 text-white dark`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
