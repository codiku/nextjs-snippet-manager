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
import { StaticImageData } from "next/image";
import { Language, Technology } from "@prisma/client";

export const TECHNO_LNG_MAP: {
  [key: string]: {
    src: StaticImageData;
    color: string;
    label: string;
    language: Language;
    technology: Technology;
  };
} = {
  python: {
    src: python,
    color: "#5E95FF",
    label: "python",
    language: "python",
    technology: "python",
  },
  javascript: {
    src: javascript,
    color: "#FFEC3E",
    label: "javascript",
    language: "javascript",
    technology: "javascript",
  },
  java: {
    src: java,
    color: "#FFFFFF",
    label: "java",
    language: "java",
    technology: "java",
  },
  cpp: {
    src: cplusplus,
    color: "#00589C",
    label: "c++",
    language: "cpp",
    technology: "cpp",
  },
  csharp: {
    src: csharp,
    color: "#3F049F",
    label: "c#",
    language: "csharp",
    technology: "csharp",
  },
  php: {
    src: php,
    color: "#777BB3",
    label: "php",
    language: "php",
    technology: "php",
  },
  ruby: {
    src: ruby,
    color: "#FFB4AE",
    label: "ruby",
    language: "ruby",
    technology: "ruby",
  },
  swift: {
    src: swift,
    color: "#FFE9E2",
    label: "swift",
    language: "swift",
    technology: "swift",
  },
  kotlin: {
    src: kotlin,
    color: "#C5C0EB",
    label: "kotlin",
    language: "kotlin",
    technology: "kotlin",
  },
  bash: {
    src: bash,
    color: "#00FF85",
    label: "bash",
    language: "bash",
    technology: "bash",
  },
  css: {
    src: css,
    color: "#214CE5",
    label: "css",
    language: "css",
    technology: "css",
  },
  nextjs: {
    src: nextjs,
    color: "#FFFFFF",
    label: "nextjs",
    language: "jsx",
    technology: "nextjs",
  },
  nodejs: {
    src: nodejs,
    color: "#8BCC00",
    label: "nodejs",
    language: "typescript",
    technology: "nodejs",
  },
  react: {
    src: react,
    color: "#00B4CC",
    label: "react",
    language: "jsx",
    technology: "react",
  },
  rust: {
    src: rust,
    color: "#F74C00",
    label: "rust",
    language: "rust",
    technology: "rust",
  },
  typescript: {
    src: typescript,
    color: "#4950FF",
    label: "typescript",
    language: "typescript",
    technology: "typescript",
  },
  html: {
    src: html,
    color: "#D3D3D3",
    label: "html",
    technology: "html",
    language: "jsx",
  },
};
