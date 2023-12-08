import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const snippets = await db.snippet.findMany();
  return NextResponse.json(snippets);
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  console.log("*** user ", userId);
  const body = await req.json();
  try {
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
