/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Snippet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Snippet" ALTER COLUMN "name" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Snippet_name_key" ON "Snippet"("name");
