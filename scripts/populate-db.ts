import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const codeSnippets = {
  python: 'print("Hello, World!")',
  javascript: 'console.log("Hello, World!");',
  java: 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }',
  csharp: 'Console.WriteLine("Hello, World!");',
  php: '<?php echo "Hello, World!"; ?>',
  ruby: 'puts "Hello, World!"',
  swift: 'print("Hello, World!")',
  kotlin: 'fun main(args: Array<String>) { println("Hello, World!") }',
  cplusplus:
    '#include <iostream> \n int main() { std::cout << "Hello, World!"; return 0; }',
  bash: 'echo "Hello, World!"',
  css: "body { background-color: blue; }",
  nextjs: "export default function Home() { return <div>Hello, World!</div> }",
  nodejs: 'console.log("Hello, World!");',
  react: "function App() { return <div>Hello, World!</div> }",
  rust: 'fn main() { println!("Hello, World!"); }',
  typescript: 'console.log("Hello, World!");',
  html: "<!DOCTYPE html><html><body>Hello, World!</body></html>",
};

async function main() {
  const languages = [
    "python",
    "javascript",
    "java",
    "csharp",
    "php",
    "ruby",
    "swift",
    "kotlin",
    "cplusplus",
    "bash",
    "css",
    "nextjs",
    "nodejs",
    "react",
    "rust",
    "typescript",
    "html",
  ];

  const snippets = languages.map((language, i) => ({
    userId: 1,
    title: `Display hello in ${language}`,
    content: (codeSnippets as any)[language],
    language: language,
  }));

  const result = await prisma.snippet.createMany({
    data: snippets as any,
  });
  console.log("Generated ", result.count, " rows");
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {});
