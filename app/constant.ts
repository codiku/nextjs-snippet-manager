import python from "/public/programming-lang/python.png";
import javascript from "/public/programming-lang/javascript.png";
import java from "/public/programming-lang/java.png";
import csharp from "/public/programming-lang/csharp.png";
import php from "/public/programming-lang/php.png";
import ruby from "/public/programming-lang/ruby.png";
import swift from "/public/programming-lang/swift.png";
import kotlin from "/public/programming-lang/kotlin.png";
import cplusplus from "/public/programming-lang/cplusplus.png";
import bash from "/public/programming-lang/bash.png";
import css from "/public/programming-lang/css.png";
import nextjs from "/public/programming-lang/nextjs.png";
import nodejs from "/public/programming-lang/nodejs.png";
import react from "/public/programming-lang/react.png";
import rust from "/public/programming-lang/rust.png";
import typescript from "/public/programming-lang/typescript.png";
import html from "/public/programming-lang/html.png";
import c from "/public/programming-lang/c.png";
import { StaticImageData } from "next/image";
import { Language, Technology } from "@prisma/client";

export type SnippetMetada = {
  src: StaticImageData;
  color: string;
  label: string;
  language: Language;
  technology: Technology;
};

export const SNIPPETS_METADATA: { [key: string]: SnippetMetada } = {
  bash: {
    src: bash,
    color: "#00FF85",
    label: "Bash",
    language: "bash",
    technology: "bash",
  },
  c: {
    src: c,
    color: "#00599C",
    label: "C",
    language: "c",
    technology: "c",
  },
  csharp: {
    src: csharp,
    color: "#3F049F",
    label: "C#",
    language: "csharp",
    technology: "csharp",
  },
  cpp: {
    src: cplusplus,
    color: "#00589C",
    label: "C++",
    language: "cpp",
    technology: "cpp",
  },
  css: {
    src: css,
    color: "#214CE5",
    label: "CSS",
    language: "css",
    technology: "css",
  },
  html: {
    src: html,
    color: "#D3D3D3",
    label: "HTML",
    technology: "html",
    language: "jsx",
  },
  java: {
    src: java,
    color: "#FFFFFF",
    label: "Java",
    language: "java",
    technology: "java",
  },
  javascript: {
    src: javascript,
    color: "#FFEC3E",
    label: "JavaScript",
    language: "javascript",
    technology: "javascript",
  },
  kotlin: {
    src: kotlin,
    color: "#C5C0EB",
    label: "Kotlin",
    language: "kotlin",
    technology: "kotlin",
  },
  nextjs: {
    src: nextjs,
    color: "#FFFFFF",
    label: "NextJS",
    language: "jsx",
    technology: "nextjs",
  },
  nodejs: {
    src: nodejs,
    color: "#8BCC00",
    label: "NodeJS",
    language: "typescript",
    technology: "nodejs",
  },
  php: {
    src: php,
    color: "#777BB3",
    label: "PHP",
    language: "php",
    technology: "php",
  },
  python: {
    src: python,
    color: "#5E95FF",
    label: "Python",
    language: "python",
    technology: "python",
  },
  react: {
    src: react,
    color: "#00B4CC",
    label: "React",
    language: "jsx",
    technology: "react",
  },
  ruby: {
    src: ruby,
    color: "#FFB4AE",
    label: "Ruby",
    language: "ruby",
    technology: "ruby",
  },
  rust: {
    src: rust,
    color: "#F74C00",
    label: "Rust",
    language: "rust",
    technology: "rust",
  },
  swift: {
    src: swift,
    color: "#FFE9E2",
    label: "Swift",
    language: "swift",
    technology: "swift",
  },
  typescript: {
    src: typescript,
    color: "#4950FF",
    label: "TypeScript",
    language: "typescript",
    technology: "typescript",
  },
};
