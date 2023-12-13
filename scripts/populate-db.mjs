import { PrismaClient } from "@prisma/client";

const SNIPPETS = [
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in python`,
    language: "python",
    technology: "python",
    content: `print("Hello, World!")`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in c`,
    language: "c",
    technology: "c",
    content: `printf("Hello, World!")`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in javascript`,
    language: "javascript",
    technology: "javascript",
    content: `console.log("Hello, World!");`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in java`,
    language: "java",
    technology: "java",
    content: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!"); 
  } 
}`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in cpp`,
    language: "cpp",
    technology: "cpp",
    content: `#include <iostream>
int main() {
  std::cout << "Hello, World!";
  return 0;
}`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in csharp`,
    language: "csharp",
    technology: "csharp",
    content: `Console.WriteLine("Hello, World!");`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in php`,
    language: "php",
    technology: "php",
    content: `<?php echo "Hello, World!"; ?>`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in ruby`,
    language: "ruby",
    technology: "ruby",
    content: `puts "Hello, World!"`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in swift`,
    language: "swift",
    technology: "swift",
    content: `print("Hello, World!")`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in kotlin`,
    language: "kotlin",
    technology: "kotlin",
    content: `fun main(args: Array<String>) {
  println("Hello, World!")
}`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in bash`,
    language: "bash",
    technology: "bash",
    content: `echo "Hello, World!"`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in css`,
    language: "css",
    technology: "css",
    content: `body {
  background-color: blue;
}`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in nextjs`,
    language: "jsx",
    technology: "nextjs",
    content: `export default function Home() {
  return (
    <div>
      Hello, World!
    </div>
  );
}`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in nodejs`,
    language: "typescript",
    technology: "nodejs",
    content: `console.log("Hello, World!");`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in react`,
    language: "jsx",
    technology: "react",
    content: `function App() {
  return (
    <div>
      Hello, World!
    </div>
  );
}`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in rust`,
    language: "rust",
    technology: "rust",
    content: `fn main() {
  println!("Hello, World!");
}`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in typescript`,
    language: "typescript",
    technology: "typescript",
    content: `console.log("Hello, World!");`,
  },
  {
    userId: "user_2Z1x35ia3xdSMPZ83v3NmMxD4RD",
    title: `Display hello in html`,
    technology: "html",
    language: "xmlDoc",
    content: `<!DOCTYPE html>
<html>
  <body>
    Hello, World!
  </body>
</html>`,
  },
];

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.snippet.createMany({
    data: SNIPPETS,
  });
  console.log("Generated ", result.count, " rows");
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {});
