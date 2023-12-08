import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { Language, Technology } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const snippets = await db.snippet.findMany();
  return NextResponse.json(snippets);
}

const createSnippetSchema = z.object({
  content: z.string(),
  title: z.string(),
  language: z.nativeEnum(Language),
  technology: z.nativeEnum(Technology),
});

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  const body = await req.json();

  try {
    //Will be catched if not successfull
    createSnippetSchema.parse(body);

    const snippetCreated = await db.snippet.create({
      data: {
        ...body,
        userId,
      },
    });
    return NextResponse.json({
      data: snippetCreated,
      message: "Snippet created successfully",
    });
  } catch (err) {
    console.log("***", err);
    return NextResponse.json(
      { error: "Could not create the snippet" },
      { status: 400 }
    );
  }
}
