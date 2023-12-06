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

export const PROG_LNG: {
  [key: string]: {
    src: StaticImageData;
    name: string;
    color: string;
    label: string;
  };
} = {
  python: { src: python, name: "python", color: "#5E95FF", label: "python" },
  javascript: {
    src: javascript,
    name: "javascript",
    color: "#FFEC3E",
    label: "javascript",
  },
  java: { src: java, name: "java", color: "#FFFFFF", label: "java" },
  cplusplus: {
    src: cplusplus,
    name: "cplusplus",
    color: "#00589C",
    label: "c++",
  },
  csharp: { src: csharp, name: "csharp", color: "#3F049F", label: "c#" },
  php: { src: php, name: "php", color: "#777BB3", label: "php" },
  ruby: { src: ruby, name: "ruby", color: "#FFB4AE", label: "ruby" },
  swift: { src: swift, name: "swift", color: "#FFE9E2", label: "swift" },
  kotlin: { src: kotlin, name: "kotlin", color: "#C5C0EB", label: "kotlin" },
  bash: { src: bash, name: "bash", color: "#00FF85", label: "bash" },
  css: { src: css, name: "css", color: "#214CE5", label: "css" },
  nextjs: { src: nextjs, name: "nextjs", color: "#FFFFFF", label: "nextjs" },
  nodejs: { src: nodejs, name: "nodejs", color: "#8BCC00", label: "nodejs" },
  react: { src: react, name: "react", color: "#00B4CC", label: "react" },
  rust: { src: rust, name: "rust", color: "#F74C00", label: "rust" },
  typescript: {
    src: typescript,
    name: "typescript",
    color: "#4950FF",
    label: "typescript",
  },
  html: { src: html, name: "html", color: "#D3D3D3", label: "html" },
};
