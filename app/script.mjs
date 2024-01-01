// Assuming the data from @data.csv is available in a variable called snippetData
import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

async function insertData() {
  const data = JSON.parse(
    await readFile(new URL("../data.json", import.meta.url))
  );
  console.log(data);
  const resp = await prisma.snippet.createMany({ data });
  console.log(resp.count + " lines added");
}

insertData()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
