-- CreateEnum
CREATE TYPE "Language" AS ENUM ('python', 'javascript', 'java', 'csharp', 'php', 'ruby', 'swift', 'kotlin', 'cplusplus', 'bash', 'css', 'nextjs', 'nodejs', 'react', 'rust', 'typescript', 'html');

-- CreateTable
CREATE TABLE "Snippet" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);
